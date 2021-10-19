// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
    ActionTypes,
    BotFrameworkAdapter,
    CardAction,
    CardFactory,
    ChannelAccount,
    ConversationReference,
    MessageFactory,
    TeamInfo,
    TeamsActivityHandler,
    TeamsChannelAccount,
    TeamsInfo,
    TeamsPagedMembersResult,
    TurnContext
} from 'botbuilder';
import * as cardHelper from './cardHelper';
import { TextEncoder } from "util";
export const ConversationRef = new Map();
export const ConversationDataRef = new Map();

export class GivingBot extends TeamsActivityHandler {
    constructor() {
        super()

        this.onMessage(async ( context: TurnContext, next ): Promise<void> => {
            TurnContext.removeRecipientMention( context.activity );
            const text = context.activity.text.trim().toLocaleLowerCase();
            if ( text.includes( 'mention' ) ) {
                await this.mentionActivityAsync( context );
            } else if ( text.includes( 'update' ) ) {
                await this.cardActivityAsync( context, true );
            } else if ( text.includes( 'delete' ) ) {
                await this.deleteCardActivityAsync( context );
            } else if ( text.includes( 'message' ) ) {
                await this.messageAllMembersAsync( context );
            } else if ( text.includes( 'who' ) ) {
                await this.getSingleMember( context );
            } else if ( text.includes( 'org' ) ) {
                await this.messageOrgDetailsAsync( context );
            } else if ( text.includes( 'events' ) ) {
                await this.messageAboutActivityAsync( context );
            } else if ( text.includes( 'highlight' ) ) {
                await this.messageHighlightAsync( context );
            } else {
                await this.cardActivityAsync( context, false );
            }
            await next();
        })

        this.onInstallationUpdate(async (context, next) => {
            this.addConversationReference(context);
            await next();
        })

        this.onConversationUpdate(async (context, next) => {
            this.addConversationReference(context);
            await next();
        })

        this.onTeamsMembersAddedEvent(async (membersAdded: ChannelAccount[],
            teamInfo: TeamInfo,
            context: TurnContext,
            next: () => Promise<void>): Promise<void> => {
            // Calling method to set conversation reference.
            this.addConversationReference(context);

            await this.cardActivityAsync(context, false);
            await next();
        } );
    }

    // Method to set conversation reference.
    async addConversationReference(context: TurnContext) {
        const conversationReference: Partial<ConversationReference> = TurnContext.getConversationReference(context.activity);
        if (conversationReference.conversation?.id === undefined) return
        const user: TeamsChannelAccount = await TeamsInfo.getMember(context, context.activity.from.id)
        ConversationRef.set(user.userPrincipalName, conversationReference)

        // Calling method to set conversation data reference that has roster information.
        this.addConversationDataReference(context);
    }

    // Method to set conversation data reference that has roster information.
    async addConversationDataReference(context: TurnContext) {
        const members: TeamsChannelAccount[] = await TeamsInfo.getMembers(context);
        ConversationDataRef.set("members", members);
    }

    public async cardActivityAsync( context: TurnContext, isUpdate: boolean ): Promise<void> {
        const cardActions = [
            {
                text: 'MessageAllMembers',
                title: 'Message all members',
                type: ActionTypes.MessageBack,
                value: null
            },
            {
                text: 'whoAmI',
                title: 'Who am I?',
                type: ActionTypes.MessageBack,
                value: null
            },
            {
                text: 'Delete',
                title: 'Delete card',
                type: ActionTypes.MessageBack,
                value: null
            }
        ];

        if ( isUpdate ) {
            await this.sendUpdateCard( context, cardActions );
        } else {
            await this.sendWelcomeCard( context, cardActions );
        }
    }

    public async sendUpdateCard( context: TurnContext, cardActions: CardAction[] ): Promise<void> {
        const data = context.activity.value;
        data.count += 1;
        cardActions.push( {
            text: 'UpdateCardAction',
            title: 'Update Card',
            type: ActionTypes.MessageBack,
            value: data
        } );
        const card = CardFactory.heroCard(
            'Updated card',
            `Update count: ${ data.count }`,
            undefined,
            cardActions
        );
        // card.id = context.activity.replyToId;
        const message = MessageFactory.attachment( card );
        message.id = context.activity.replyToId;
        await context.updateActivity( message );
    }

    public async messageOrgDetailsAsync( context: TurnContext): Promise<void> {
        const oscard = CardFactory.adaptiveCard(cardHelper.orgSummaryCard());
        const message = MessageFactory.attachment(oscard);
        await context.sendActivity(message);
    }

    public async messageAboutActivityAsync( context: TurnContext): Promise<void> {
        const acard = CardFactory.adaptiveCard(cardHelper.activityCard());
        await context.sendActivity( MessageFactory.attachment(acard) );
    }

    public async messageHighlightAsync( context: TurnContext): Promise<void> {
        const nwcard = CardFactory.adaptiveCard(cardHelper.newsLetterCard());
        await context.sendActivity( MessageFactory.attachment(nwcard) );
    }

    public async sendWelcomeCard( context: TurnContext, cardActions: CardAction[] ): Promise<void> {
        const initialValue = {
            count: 0
        };
        cardActions.push( {
            text: 'UpdateCardAction',
            title: 'Update Card',
            type: ActionTypes.MessageBack,
            value: initialValue
        } );
        const card = CardFactory.heroCard(
            'Welcome card',
            '',
            undefined,
            cardActions
        );

        const message = MessageFactory.attachment(card);
        await context.sendActivity(message);
    }

    public async getSingleMember( context: TurnContext ): Promise<void> {
        let member;
        try {
            member = await TeamsInfo.getMember( context, context.activity.from.id );
        } catch ( e: any ) {
            if ( e.code === 'MemberNotFoundInConversation' ) {
                context.sendActivity( MessageFactory.text( 'Member not found.' ) );
                return;
            } else {
                console.log( e );
                throw e;
            }
        }
        const message = MessageFactory.text( `You are: ${ member.name } ${member.userPrincipalName}` );
        await context.sendActivity( message );
    }

    public async mentionActivityAsync( context: TurnContext ): Promise<void> {
        const mention = {
            mentioned: context.activity.from,
            text: `<at>${ new TextEncoder().encode( context.activity.from.name ) }</at>`,
            type: 'mention'
        };

        const replyActivity = MessageFactory.text( `Hi ${ mention.text }` );
        replyActivity.entities = [ mention ];
        await context.sendActivity( replyActivity );
    }

    public async deleteCardActivityAsync( context: TurnContext ): Promise<void> {
        if (context.activity.replyToId === undefined) return
        await context.deleteActivity( context.activity.replyToId );
    }

    public async messageAllMembersAsync( context: TurnContext ): Promise<void> {
        const members = await this.getPagedMembers( context );

        members.forEach( async ( teamMember: ChannelAccount ) => {
            console.log( 'a ', teamMember );
            const message = MessageFactory.text( `Hello ${ teamMember.name } ${ teamMember.role }. I'm a Teams conversation bot.` );

            const ref = TurnContext.getConversationReference( context.activity );
            ref.user = teamMember;
            let botAdapter: BotFrameworkAdapter = context.adapter as BotFrameworkAdapter;
            await botAdapter.createConversation ( ref,
                async ( t1 ) => {
                    const ref2 = TurnContext.getConversationReference( t1.activity );
                    await t1.adapter.continueConversation( ref2, async ( t2 ) => {
                        await t2.sendActivity( message );
                    } );
                } );
        } );

        await context.sendActivity( MessageFactory.text( 'All messages have been sent.' ) );
    }

    public async getPagedMembers( context: TurnContext ): Promise<any> {
        let continuationToken;
        const members = [];
        do {
            const pagedMembers: TeamsPagedMembersResult = await TeamsInfo.getPagedMembers( context, 100, continuationToken );
            continuationToken = pagedMembers.continuationToken;
            members.push( ...pagedMembers.members );
        } while ( continuationToken !== undefined );
        return members;
    }
}
