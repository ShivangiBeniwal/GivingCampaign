// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { DialogBot } from './dialogBot';
import { ConversationState, SigninStateVerificationQuery, tokenExchangeOperationName, TurnContext, UserState } from 'botbuilder';
import { SsoOAuthHelpler } from '../ssoOauthHelpler';
import { MainDialog } from '../dialogs/mainDialog';

export class TeamsBot extends DialogBot {
    ssoOAuthHelper: SsoOAuthHelpler;
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(ssoOAuthHelper: SsoOAuthHelpler, conversationState: ConversationState, userState: UserState, dialog: MainDialog) {
        super(conversationState, userState, dialog);
        this.ssoOAuthHelper = ssoOAuthHelper;

        this.onMembersAdded(async (context: TurnContext, next: () => any): Promise<void> => {
            const membersAdded = context.activity.membersAdded;
            if (membersAdded === undefined) return
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Welcome to TeamsBot. Type anything to get logged in. Type \'logout\' to sign-out.');
                }
            }

            await next();
        });

        this.onTokenResponseEvent(async (context: TurnContext, next: () => any): Promise<void> => {
            console.log('Running dialog with Token Response Event Activity.');

            // Run the Dialog with the new Token Response Event Activity.
            await this.dialog.run(context, this.dialogState);
            await next();
        });
    }

    async onSignInInvoke(context: TurnContext) {
        if (context.activity && context.activity.name === tokenExchangeOperationName) {
            // The Token Exchange Helper will attempt the exchange, and if successful, it will cache the result
            // in TurnState.  This is then read by SsoOAuthPrompt, and processed accordingly.
            if (!await this.ssoOAuthHelper.shouldProcessTokenExchange(context)) {
                // If the token is not exchangeable, do not process this activity further.
                // (The Token Exchange Helper will send the appropriate response if the token is not exchangeable)
                return;
            }
        }
        await this.dialog.run(context, this.dialogState);
    }

    async handleTeamsSigninVerifyState(context: TurnContext, query: SigninStateVerificationQuery) {
        console.log('Running dialog with signin/verifystate from an Invoke Activity.');
        await this.dialog.run(context, this.dialogState);
    }
}