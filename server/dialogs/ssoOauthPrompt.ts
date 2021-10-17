import { DialogContext, OAuthPrompt, OAuthPromptSettings, PromptRecognizerResult } from 'botbuilder-dialogs';
import { StatusCodes, ActivityTypes, TokenResponse } from 'botbuilder';

/**
 * Response body returned for a token exchange invoke activity.
 */
 class TokenExchangeInvokeResponse {
    id: string;
    connectionName: string;

    constructor(id: string, connectionName: string) {
        this.id = id;
        this.connectionName = connectionName;
    }
}

export class SsoOAuthPrompt extends OAuthPrompt {
    authSettings: OAuthPromptSettings;
    constructor(dialogId: string, settings: OAuthPromptSettings) {
        super(dialogId, settings);
        this.authSettings = settings;
    }

    async continueDialog(dialogContext: DialogContext) {
        // If the token was successfully exchanged already, it should be cached in TurnState along with the TokenExchangeInvokeRequest
        const cachedTokenResponse = dialogContext.context.turnState.get('tokenResponse');

        if (cachedTokenResponse) {
            const tokenExchangeRequest = dialogContext.context.turnState.get('tokenExchangeInvokeRequest');
            if (!tokenExchangeRequest) {
                throw new Error('TokenResponse is present in TurnState, but TokenExchangeInvokeRequest is missing.');
            }

            // TokenExchangeInvokeResponse
            const exchangeResponse = new TokenExchangeInvokeResponse(tokenExchangeRequest.id, this.authSettings.connectionName);

            await dialogContext.context.sendActivity(
                {
                    type: ActivityTypes.InvokeResponse,
                    value:
                    {
                        status: StatusCodes.OK,
                        body: exchangeResponse
                    }
                });

            // PromptRecognizerResult
            var result: PromptRecognizerResult<TokenResponse> = {
                succeeded: true,
                value: {
                    channelId: cachedTokenResponse.channelId,
                    connectionName: cachedTokenResponse.connectionName,
                    token: cachedTokenResponse.token,
                    expiration: ""
                }
            }

            return await dialogContext.endDialog(result.value);
        }

        return await super.continueDialog(dialogContext);
    }
}
