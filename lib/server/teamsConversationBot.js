// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ActionTypes, CardFactory, MessageFactory, TeamsActivityHandler, TeamsInfo, TurnContext } from 'botbuilder';
import { TextEncoder } from "util";
export const ConversationRef = new Map();
export const ConversationDataRef = new Map();
export class TeamsConversationBot extends TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage((context, next) => __awaiter(this, void 0, void 0, function* () {
            TurnContext.removeRecipientMention(context.activity);
            const text = context.activity.text.trim().toLocaleLowerCase();
            if (text.includes('mention')) {
                yield this.mentionActivityAsync(context);
            }
            else if (text.includes('update')) {
                yield this.cardActivityAsync(context, true);
            }
            else if (text.includes('delete')) {
                yield this.deleteCardActivityAsync(context);
            }
            else if (text.includes('message')) {
                yield this.messageAllMembersAsync(context);
            }
            else if (text.includes('who')) {
                yield this.getSingleMember(context);
            }
            else {
                yield this.cardActivityAsync(context, false);
            }
            yield next();
        }));
        this.onTeamsMembersAddedEvent((membersAdded, teamInfo, context, next) => __awaiter(this, void 0, void 0, function* () {
            // let newMembers: string = '';
            // membersAdded.forEach( ( account ) => {
            //     newMembers += account.id + ' ';
            // } );
            // const name = !teamInfo ? 'not in team' : teamInfo.name;
            // const card = CardFactory.heroCard( 'Account Added', `${ newMembers } joined ${ name }.` );
            // const message = MessageFactory.attachment( card );
            // await context.sendActivity( message );
            // Calling method to set conversation reference.
            this.addConversationReference(context.activity);
            // Calling method to set conversation data reference that has roster information.
            this.addConversationDataReference(context);
            yield this.cardActivityAsync(context, false);
            yield next();
        }));
    }
    // Method to set conversation reference.
    addConversationReference(activity) {
        var _a;
        const conversationReference = TurnContext.getConversationReference(activity);
        if (((_a = conversationReference.conversation) === null || _a === void 0 ? void 0 : _a.id) === undefined)
            return;
        ConversationRef.set(conversationReference.conversation.id, conversationReference);
    }
    // Method to set conversation data reference that has roster information.
    addConversationDataReference(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield TeamsInfo.getMembers(context);
            ConversationDataRef.set("members", members);
        });
    }
    cardActivityAsync(context, isUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
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
            if (isUpdate) {
                yield this.sendUpdateCard(context, cardActions);
            }
            else {
                yield this.sendWelcomeCard(context, cardActions);
            }
        });
    }
    sendUpdateCard(context, cardActions) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = context.activity.value;
            data.count += 1;
            cardActions.push({
                text: 'UpdateCardAction',
                title: 'Update Card',
                type: ActionTypes.MessageBack,
                value: data
            });
            const card = CardFactory.heroCard('Updated card', `Update count: ${data.count}`, [''], cardActions);
            // card.id = context.activity.replyToId;
            const message = MessageFactory.attachment(card);
            message.id = context.activity.replyToId;
            yield context.updateActivity(message);
        });
    }
    sendWelcomeCard(context, cardActions) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialValue = {
                count: 0
            };
            cardActions.push({
                text: 'UpdateCardAction',
                title: 'Update Card',
                type: ActionTypes.MessageBack,
                value: initialValue
            });
            const card = CardFactory.heroCard('Welcome card', '', [''], cardActions);
            yield context.sendActivity(MessageFactory.attachment(card));
        });
    }
    getSingleMember(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let member;
            try {
                member = yield TeamsInfo.getMember(context, context.activity.from.id);
            }
            catch (e) {
                if (e.code === 'MemberNotFoundInConversation') {
                    context.sendActivity(MessageFactory.text('Member not found.'));
                    return;
                }
                else {
                    console.log(e);
                    throw e;
                }
            }
            const message = MessageFactory.text(`You are: ${member.name}`);
            yield context.sendActivity(message);
        });
    }
    mentionActivityAsync(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const mention = {
                mentioned: context.activity.from,
                text: `<at>${new TextEncoder().encode(context.activity.from.name)}</at>`,
                type: 'mention'
            };
            const replyActivity = MessageFactory.text(`Hi ${mention.text}`);
            replyActivity.entities = [mention];
            yield context.sendActivity(replyActivity);
        });
    }
    deleteCardActivityAsync(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.activity.replyToId === undefined)
                return;
            yield context.deleteActivity(context.activity.replyToId);
        });
    }
    messageAllMembersAsync(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield this.getPagedMembers(context);
            members.forEach((teamMember) => __awaiter(this, void 0, void 0, function* () {
                console.log('a ', teamMember);
                const message = MessageFactory.text(`Hello ${teamMember.name} ${teamMember.role}. I'm a Teams conversation bot.`);
                const ref = TurnContext.getConversationReference(context.activity);
                ref.user = teamMember;
                let botAdapter = context.adapter;
                yield botAdapter.createConversation(ref, (t1) => __awaiter(this, void 0, void 0, function* () {
                    const ref2 = TurnContext.getConversationReference(t1.activity);
                    yield t1.adapter.continueConversation(ref2, (t2) => __awaiter(this, void 0, void 0, function* () {
                        yield t2.sendActivity(message);
                    }));
                }));
            }));
            yield context.sendActivity(MessageFactory.text('All messages have been sent.'));
        });
    }
    getPagedMembers(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let continuationToken;
            const members = [];
            do {
                const pagedMembers = yield TeamsInfo.getPagedMembers(context, 100, continuationToken);
                continuationToken = pagedMembers.continuationToken;
                members.push(...pagedMembers.members);
            } while (continuationToken !== undefined);
            return members;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhbXNDb252ZXJzYXRpb25Cb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvdGVhbXNDb252ZXJzYXRpb25Cb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNERBQTREO0FBQzVELGtDQUFrQzs7Ozs7Ozs7OztBQUVsQyxPQUFPLEVBQ0gsV0FBVyxFQUlYLFdBQVcsRUFHWCxjQUFjLEVBRWQsb0JBQW9CLEVBRXBCLFNBQVMsRUFFVCxXQUFXLEVBQ2QsTUFBTSxZQUFZLENBQUM7QUFDcEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuQyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6QyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRTdDLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxvQkFBb0I7SUFDMUQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBUSxPQUFvQixFQUFFLElBQUksRUFBa0IsRUFBRTtZQUNsRSxXQUFXLENBQUMsc0JBQXNCLENBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBRSxDQUFDO1lBQ3ZELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDOUQsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFFLFNBQVMsQ0FBRSxFQUFHO2dCQUM5QixNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBRSxPQUFPLENBQUUsQ0FBQzthQUM5QztpQkFBTSxJQUFLLElBQUksQ0FBQyxRQUFRLENBQUUsUUFBUSxDQUFFLEVBQUc7Z0JBQ3BDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFFLE9BQU8sRUFBRSxJQUFJLENBQUUsQ0FBQzthQUNqRDtpQkFBTSxJQUFLLElBQUksQ0FBQyxRQUFR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