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
        this.onInstallationUpdate((context, next) => __awaiter(this, void 0, void 0, function* () {
            this.addConversationReference(context);
            yield next();
        }));
        this.onConversationUpdate((context, next) => __awaiter(this, void 0, void 0, function* () {
            this.addConversationReference(context);
            yield next();
        }));
        this.onTeamsMembersAddedEvent((membersAdded, teamInfo, context, next) => __awaiter(this, void 0, void 0, function* () {
            // Calling method to set conversation reference.
            this.addConversationReference(context);
            yield this.cardActivityAsync(context, false);
            yield next();
        }));
    }
    // Method to set conversation reference.
    addConversationReference(context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const conversationReference = botbuilder_1.TurnContext.getConversationReference(context.activity);
            if (((_a = conversationReference.conversation) === null || _a === void 0 ? void 0 : _a.id) === undefined)
                return;
            const user = yield botbuilder_1.TeamsInfo.getMember(context, context.activity.from.id);
            exports.ConversationRef.set(user.userPrincipalName, conversationReference);
            // Calling method to set conversation data reference that has roster information.
            this.addConversationDataReference(context);
        });
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
            const message = botbuilder_1.MessageFactory.text(`You are: ${member.name} ${member.userPrincipalName}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhbXNDb252ZXJzYXRpb25Cb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvdGVhbXNDb252ZXJzYXRpb25Cb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDtBQUM1RCxrQ0FBa0M7Ozs7Ozs7Ozs7OztBQUVsQywyQ0Fjb0I7QUFDcEIsK0JBQW1DO0FBQ3RCLFFBQUEsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDNUIsUUFBQSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRTdDLE1BQWEsb0JBQXFCLFNBQVEsaUNBQW9CO0lBQzFEO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFFUCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQVEsT0FBb0IsRUFBRSxJQUFJLEVBQWtCLEVBQUU7WUFDakUsd0JBQVcsQ0FBQyxzQkFBc0IsQ0FBRSxPQUFPLENBQUMsUUFBUSxDQUFFLENBQUM7WUFDdkQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM5RCxJQUFLLElBQUksQ0FBQyxRQUFRLENBQUUsU0FBUyxDQUFFLEVBQUc7Z0JBQzlCLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFFLE9BQU8sQ0FBRSxDQUFDO2FBQzlDO2lCQUFNLElBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRSxRQUFRLENBQUUsRUFBRztnQkFDcEMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUUsT0FBTyxFQUFFLElBQUksQ0FBRSxDQUFDO2FBQ2pEO2lCQUFNLElBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRSxRQUFRLENBQUUsRUFBRztnQkFDcEMsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUUsT0FBTyxDQUFFLENBQUM7YUFDakQ7aUJBQU0sSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFFLFNBQVMsQ0FBRSxFQUFHO2dCQUNyQyxN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