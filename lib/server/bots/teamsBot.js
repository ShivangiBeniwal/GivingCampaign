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
exports.TeamsBot = void 0;
const dialogBot_1 = require("./dialogBot");
const botbuilder_1 = require("botbuilder");
class TeamsBot extends dialogBot_1.DialogBot {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(ssoOAuthHelper, conversationState, userState, dialog) {
        super(conversationState, userState, dialog);
        this.ssoOAuthHelper = ssoOAuthHelper;
        this.onMembersAdded((context, next) => __awaiter(this, void 0, void 0, function* () {
            const membersAdded = context.activity.membersAdded;
            if (membersAdded === undefined)
                return;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    yield context.sendActivity('Welcome to TeamsBot. Type anything to get logged in. Type \'logout\' to sign-out.');
                }
            }
            yield next();
        }));
        this.onTokenResponseEvent((context, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('Running dialog with Token Response Event Activity.');
            // Run the Dialog with the new Token Response Event Activity.
            yield this.dialog.run(context, this.dialogState);
            yield next();
        }));
    }
    onSignInInvoke(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.activity && context.activity.name === botbuilder_1.tokenExchangeOperationName) {
                // The Token Exchange Helper will attempt the exchange, and if successful, it will cache the result
                // in TurnState.  This is then read by SsoOAuthPrompt, and processed accordingly.
                if (!(yield this.ssoOAuthHelper.shouldProcessTokenExchange(context))) {
                    // If the token is not exchangeable, do not process this activity further.
                    // (The Token Exchange Helper will send the appropriate response if the token is not exchangeable)
                    return;
                }
            }
            yield this.dialog.run(context, this.dialogState);
        });
    }
    handleTeamsSigninVerifyState(context, query) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Running dialog with signin/verifystate from an Invoke Activity.');
            yield this.dialog.run(context, this.dialogState);
        });
    }
}
exports.TeamsBot = TeamsBot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhbXNCb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvYm90cy90ZWFtc0JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNERBQTREO0FBQzVELGtDQUFrQzs7Ozs7Ozs7Ozs7O0FBRWxDLDJDQUF3QztBQUN4QywyQ0FBaUk7QUFJakksTUFBYSxRQUFTLFNBQVEscUJBQVM7SUFFbkM7Ozs7O09BS0c7SUFDSCxZQUFZLGNBQStCLEVBQUUsaUJBQW9DLEVBQUUsU0FBb0IsRUFBRSxNQUFrQjtRQUN2SCxLQUFLLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRXJDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBTyxPQUFvQixFQUFFLElBQWUsRUFBaUIsRUFBRTtZQUMvRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUNuRCxJQUFJLFlBQVksS0FBSyxTQUFTO2dCQUFFLE9BQU07WUFDdEMsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ2hELElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO2lCQUNuSDthQUNKO1lBRUQsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQU8sT0FBb0IsRUFBRSxJQUFlLEVBQWlCLEVBQUU7WUFDckYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1lBRWxFLDZEQUE2RDtZQUM3RCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakQsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVLLGNBQWMsQ0FBQyxPQUFvQjs7WUFDckMsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLHVDQUEwQixFQUFFO2dCQUMxRSxtR0FBbUc7Z0JBQ25HLGlGQUFpRjtnQkFDakYsSUFBSSxDQUFDLENBQUEsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFBLEVBQUU7b0JBQ2hFLDBFQUEwRTtvQkFDMUUsa0dBQWtHO29CQUNsRyxPQUFPO2lCQUNWO2FBQ0o7WUFDRCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRUssNEJBQTRCLENBQUMsT0FBb0IsRUFBRSxLQUFtQzs7WUFDeEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7Q0FDSjtBQWxERCw0QkFrREMifQ==