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
exports.MainDialog = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const logoutDialog_1 = require("./logoutDialog");
const CONFIRM_PROMPT = 'ConfirmPrompt';
const MAIN_DIALOG = 'MainDialog';
const MAIN_WATERFALL_DIALOG = 'MainWaterfallDialog';
const OAUTH_PROMPT = 'OAuthPrompt';
const ssoOauthPrompt_1 = require("./ssoOauthPrompt");
const simpleGraphClient_1 = require("../simpleGraphClient");
const botbuilder_core_1 = require("botbuilder-core");
class MainDialog extends logoutDialog_1.LogoutDialog {
    constructor() {
        const CN = process.env.ConnectionName === undefined ? "" : process.env.ConnectionName;
        super(MAIN_DIALOG, CN);
        this.addDialog(new ssoOauthPrompt_1.SsoOAuthPrompt(OAUTH_PROMPT, {
            connectionName: CN,
            text: 'Please Sign In',
            title: 'Sign In',
            timeout: 300000
        }));
        this.addDialog(new botbuilder_dialogs_1.ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(MAIN_WATERFALL_DIALOG, [
            this.promptStep.bind(this),
            this.loginStep.bind(this),
            this.ensureOAuth.bind(this),
            this.displayToken.bind(this)
        ]));
        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }
    /**
     * The run method handles the incoming activity (in the form of a DialogContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} dialogContext
     */
    run(context, accessor) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialogSet = new botbuilder_dialogs_1.DialogSet(accessor);
            dialogSet.add(this);
            const dialogContext = yield dialogSet.createContext(context);
            const results = yield dialogContext.continueDialog();
            if (results.status === botbuilder_dialogs_1.DialogTurnStatus.empty) {
                yield dialogContext.beginDialog(this.id);
            }
        });
    }
    promptStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield stepContext.beginDialog(OAUTH_PROMPT);
            }
            catch (err) {
                console.error(err);
            }
            return yield stepContext.endDialog();
        });
    }
    loginStep(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the token from the previous step. Note that we could also have gotten the
            // token directly from the prompt itself. There is an example of this in the next method.
            const tokenResponse = stepContext.result;
            if (!tokenResponse || !tokenResponse.token) {
                yield stepContext.context.sendActivity('Login was not successful please try again.');
            }
            else {
                const client = new simpleGraphClient_1.SimpleGraphClient(tokenResponse.token);
                const me = yield client.getMe();
                const title = me ? me.jobTitle : 'UnKnown';
                yield stepContext.context.sendActivity(`You're logged in as ${me.displayName} (${me.userPrincipalName}); your job title is: ${title}; your photo is: `);
                const photoBase64 = yield client.GetPhotoAsync(tokenResponse.token);
                const card = botbuilder_core_1.CardFactory.thumbnailCard("", botbuilder_core_1.CardFactory.images([photoBase64]));
                yield stepContext.context.sendActivity({ attachments: [card] });
                return yield stepContext.prompt(CONFIRM_PROMPT, 'Would you like to view your token?');
            }
            return yield stepContext.endDialog();
        });
    }
    ensureOAuth(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield stepContext.context.sendActivity('Thank you.');
            const result = stepContext.result;
            if (result) {
                // Call the prompt again because we need the token. The reasons for this are:
                // 1. If the user is already logged in we do not need to store the token locally in the bot and worry
                // about refreshing it. We can always just call the prompt again to get the token.
                // 2. We never know how long it will take a user to respond. By the time the
                // user responds the token may have expired. The user would then be prompted to login again.
                //
                // There is no reason to store the token locally in the bot because we can always just call
                // the OAuth prompt to get the token or get a new token if needed.
                return yield stepContext.beginDialog(OAUTH_PROMPT);
            }
            return yield stepContext.endDialog();
        });
    }
    displayToken(stepContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenResponse = stepContext.result;
            if (tokenResponse && tokenResponse.token) {
                yield stepContext.context.sendActivity(`Here is your token ${tokenResponse.token}`);
            }
            return yield stepContext.endDialog();
        });
    }
}
exports.MainDialog = MainDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbkRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9kaWFsb2dzL21haW5EaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDtBQUM1RCxrQ0FBa0M7Ozs7Ozs7Ozs7OztBQUVsQywyREFBb0k7QUFDcEksaURBQThDO0FBRTlDLE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQztBQUN2QyxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUM7QUFDakMsTUFBTSxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUNwRCxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUM7QUFDbkMscURBQWtEO0FBQ2xELDREQUF5RDtBQUN6RCxxREFBa0Y7QUFFbEYsTUFBYSxVQUFXLFNBQVEsMkJBQVk7SUFDeEM7UUFDSSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7UUFDckYsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksK0JBQWMsQ0FBQyxZQUFZLEVBQUU7WUFDNUMsY0FBYyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsTUFBTTtTQUNsQixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxrQ0FBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG9DQUFlLENBQUMscUJBQXFCLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNHLEdBQUcsQ0FBQyxPQUFvQixFQUFFLFFBQTRDOztZQUN4RSxNQUFNLFNBQVMsR0FBRyxJQUFJLDhCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixNQUFNLGFBQWEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDckQsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLHFDQUFnQixDQUFDLEtBQUssRUFBRTtnQkFDM0MsTUFBTSxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1QztRQUNMLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxXQUFpQzs7WUFDOUMsSUFBSTtnQkFDQSxPQUFPLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN0RDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEI7WUFDRCxPQUFPLE1BQU0sV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxXQUFpQzs7WUFDN0MsZ0ZBQWdGO1lBQ2hGLHlGQUF5RjtZQUN6RixNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUN4QyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7YUFDeEY7aUJBQU07Z0JBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQ0FBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDM0MsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsaUJBQWlCLHlCQUF5QixLQUFLLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3hKLE1BQU0sV0FBVyxHQUFHLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sSUFBSSxHQUFHLDZCQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSw2QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLG9DQUFvQyxDQUFDLENBQUM7YUFDekY7WUFDRCxPQUFPLE1BQU0sV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pDLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxXQUFpQzs7WUFDL0MsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVyRCxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ2xDLElBQUksTUFBTSxFQUFFO2dCQUNSLDZFQUE2RTtnQkFDN0UscUdBQXFHO2dCQUNyRyxrRkFBa0Y7Z0JBQ2xGLDRFQUE0RTtnQkFDNUUsNEZBQTRGO2dCQUM1RixFQUFFO2dCQUNGLDJGQUEyRjtnQkFDM0Ysa0VBQWtFO2dCQUNsRSxPQUFPLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN0RDtZQUNELE9BQU8sTUFBTSxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLFdBQWlDOztZQUNoRCxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RDLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsc0JBQXNCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZGO1lBQ0QsT0FBTyxNQUFNLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QyxDQUFDO0tBQUE7Q0FDSjtBQTFGRCxnQ0EwRkMifQ==