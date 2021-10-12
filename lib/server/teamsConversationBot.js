"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsConversationBot = exports.ConversationDataRef = exports.ConversationRef = void 0;
const botbuilder_1 = require("botbuilder");
const util_1 = require("util");
exports.ConversationRef = new Map();
exports.ConversationDataRef = new Map();
class TeamsConversationBot extends botbuilder_1.TeamsActivityHandler {
    constructor() {
        super();
        this.onMessage((context, next) => __awaiter(this, void 0, void 0, function* () {
            // Calling method to set conversation reference.
            this.addConversationReference(context.activity);
            // Calling method to set conversation data reference that has roster information.
            this.addConversationDataReference(context);
            botbuilder_1.TurnContext.removeRecipientMention(context.activity);
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
        this.onConversationUpdate((context, next) => __awaiter(this, void 0, void 0, function* () {
            this.addConversationReference(context.activity);
            // Calling method to set conversation data reference that has roster information.
            this.addConversationDataReference(context);
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
        const conversationReference = botbuilder_1.TurnContext.getConversationReference(activity);
        if (((_a = conversationReference.conversation) === null || _a === void 0 ? void 0 : _a.id) === undefined)
            return;
        exports.ConversationRef.set(conversationReference.conversation.id, conversationReference);
    }
    // Method to set conversation data reference that has roster information.
    addConversationDataReference(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield botbuilder_1.TeamsInfo.getMembers(context);
            exports.ConversationDataRef.set("members", members);
        });
    }
    cardActivityAsync(context, isUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardActions = [
                {
                    text: 'MessageAllMembers',
                    title: 'Message all members',
                    type: botbuilder_1.ActionTypes.MessageBack,
                    value: null
                },
                {
                    text: 'whoAmI',
                    title: 'Who am I?',
                    type: botbuilder_1.ActionTypes.MessageBack,
                    value: null
                },
                {
                    text: 'Delete',
                    title: 'Delete card',
                    type: botbuilder_1.ActionTypes.MessageBack,
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
                type: botbuilder_1.ActionTypes.MessageBack,
                value: data
            });
            const card = botbuilder_1.CardFactory.heroCard('Updated card', `Update count: ${data.count}`, undefined, cardActions);
            // card.id = context.activity.replyToId;
            const message = botbuilder_1.MessageFactory.attachment(card);
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
                type: botbuilder_1.ActionTypes.MessageBack,
                value: initialValue
            });
            const card = botbuilder_1.CardFactory.heroCard('Welcome card', '', undefined, cardActions);
            yield context.sendActivity(botbuilder_1.MessageFactory.attachment(card));
        });
    }
    getSingleMember(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let member;
            try {
                member = yield botbuilder_1.TeamsInfo.getMember(context, context.activity.from.id);
            }
            catch (e) {
                if (e.code === 'MemberNotFoundInConversation') {
                    context.sendActivity(botbuilder_1.MessageFactory.text('Member not found.'));
                    return;
                }
                else {
                    console.log(e);
                    throw e;
                }
            }
            const message = botbuilder_1.MessageFactory.text(`You are: ${member.name}`);
            yield context.sendActivity(message);
        });
    }
    mentionActivityAsync(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const mention = {
                mentioned: context.activity.from,
                text: `<at>${new util_1.TextEncoder().encode(context.activity.from.name)}</at>`,
                type: 'mention'
            };
            const replyActivity = botbuilder_1.MessageFactory.text(`Hi ${mention.text}`);
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
                const message = botbuilder_1.MessageFactory.text(`Hello ${teamMember.name} ${teamMember.role}. I'm a Teams conversation bot.`);
                const ref = botbuilder_1.TurnContext.getConversationReference(context.activity);
                ref.user = teamMember;
                let botAdapter = context.adapter;
                yield botAdapter.createConversation(ref, (t1) => __awaiter(this, void 0, void 0, function* () {
                    const ref2 = botbuilder_1.TurnContext.getConversationReference(t1.activity);
                    yield t1.adapter.continueConversation(ref2, (t2) => __awaiter(this, void 0, void 0, function* () {
                        yield t2.sendActivity(message);
                    }));
                }));
            }));
            yield context.sendActivity(botbuilder_1.MessageFactory.text('All messages have been sent.'));
        });
    }
    getPagedMembers(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let continuationToken;
            const members = [];
            do {
                const pagedMembers = yield botbuilder_1.TeamsInfo.getPagedMembers(context, 100, continuationToken);
                continuationToken = pagedMembers.continuationToken;
                members.push(...pagedMembers.members);
            } while (continuationToken !== undefined);
            return members;
        });
    }
}
exports.TeamsConversationBot = TeamsConversationBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhbXNDb252ZXJzYXRpb25Cb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvdGVhbXNDb252ZXJzYXRpb25Cb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDtBQUM1RCxrQ0FBa0M7Ozs7Ozs7Ozs7OztBQUVsQywyQ0Flb0I7QUFDcEIsK0JBQW1DO0FBQ3RCLFFBQUEsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDNUIsUUFBQSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRTdDLE1BQWEsb0JBQXFCLFNBQVEsaUNBQW9CO0lBQzFEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsU0FBUyxDQUFFLENBQVEsT0FBb0IsRUFBRSxJQUFJLEVBQWtCLEVBQUU7WUFDMUMsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsaUZBQWlGO1lBQ2pGLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSx3QkFBVyxDQUFDLHNCQUFzQixDQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUUsQ0FBQztZQUN2RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzlELElBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRSxTQUFTLENBQUUsRUFBRztnQkFDOUIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUUsT0FBTyxDQUFFLENBQUM7YUFDOUM7aUJBQU0sSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFFLFFBQVEsQ0FBRSxFQUFHO2dCQUNwQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFFLENBQUM7YUFDakQ7aUJBQU0sSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFFLFFB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