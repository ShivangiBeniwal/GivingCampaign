"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.GivingBot = exports.ConversationDataRef = exports.ConversationRef = void 0;
const botbuilder_1 = require("botbuilder");
const cardHelper = __importStar(require("./cardHelper"));
const util_1 = require("util");
exports.ConversationRef = new Map();
exports.ConversationDataRef = new Map();
class GivingBot extends botbuilder_1.TeamsActivityHandler {
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
            else if (text.includes('org')) {
                yield this.messageOrgDetailsAsync(context);
            }
            else if (text.includes('events')) {
                yield this.messageAboutActivityAsync(context);
            }
            else if (text.includes('highlight')) {
                yield this.messageHighlightAsync(context);
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
    messageOrgDetailsAsync(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const oscard = botbuilder_1.CardFactory.adaptiveCard(cardHelper.orgSummaryCard());
            const message = botbuilder_1.MessageFactory.attachment(oscard);
            yield context.sendActivity(message);
        });
    }
    messageAboutActivityAsync(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const acard = botbuilder_1.CardFactory.adaptiveCard(cardHelper.activityCard());
            yield context.sendActivity(botbuilder_1.MessageFactory.attachment(acard));
        });
    }
    messageHighlightAsync(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const nwcard = botbuilder_1.CardFactory.adaptiveCard(cardHelper.newsLetterCard());
            yield context.sendActivity(botbuilder_1.MessageFactory.attachment(nwcard));
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
            const message = botbuilder_1.MessageFactory.attachment(card);
            yield context.sendActivity(message);
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
exports.GivingBot = GivingBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l2aW5nQm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL2dpdmluZ0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREO0FBQzVELGtDQUFrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsQywyQ0Fjb0I7QUFDcEIseURBQTJDO0FBQzNDLCtCQUFtQztBQUN0QixRQUFBLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzVCLFFBQUEsbUJBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUU3QyxNQUFhLFNBQVUsU0FBUSxpQ0FBb0I7SUFDL0M7UUFDSSxLQUFLLEVBQUUsQ0FBQTtRQUVQLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBUSxPQUFvQixFQUFFLElBQUksRUFBa0IsRUFBRTtZQUNqRSx3QkFBVyxDQUFDLHNCQUFzQixDQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUUsQ0FBQztZQUN2RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzlELElBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRSxTQUFTLENBQUUsRUFBRztnQkFDOUIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUUsT0FBTyxDQUFFLENBQUM7YUFDOUM7aUJBQU0sSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFFLFFBQVEsQ0FBRSxFQUFHO2dCQUNwQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFFLENBQUM7YUFDakQ7aUJBQU0sSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFFLFFBQVEsQ0FBRSxFQUFHO2dCQUNwQyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxPQUFPLENBQUUsQ0FBQzthQUNqRDtpQkFBTSxJQUFLLElBQUksQ0FBQyxRQUFRLENBQUUsU0FBUyxDQUFFLEVBQUc7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