"use strict";
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
exports.SsoOAuthPrompt = void 0;
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const botbuilder_1 = require("botbuilder");
/**
 * Response body returned for a token exchange invoke activity.
 */
class TokenExchangeInvokeResponse {
    constructor(id, connectionName) {
        this.id = id;
        this.connectionName = connectionName;
    }
}
class SsoOAuthPrompt extends botbuilder_dialogs_1.OAuthPrompt {
    constructor(dialogId, settings) {
        super(dialogId, settings);
        this.authSettings = settings;
    }
    continueDialog(dialogContext) {
        const _super = Object.create(null, {
            continueDialog: { get: () => super.continueDialog }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // If the token was successfully exchanged already, it should be cached in TurnState along with the TokenExchangeInvokeRequest
            const cachedTokenResponse = dialogContext.context.turnState.get('tokenResponse');
            if (cachedTokenResponse) {
                const tokenExchangeRequest = dialogContext.context.turnState.get('tokenExchangeInvokeRequest');
                if (!tokenExchangeRequest) {
                    throw new Error('TokenResponse is present in TurnState, but TokenExchangeInvokeRequest is missing.');
                }
                // TokenExchangeInvokeResponse
                const exchangeResponse = new TokenExchangeInvokeResponse(tokenExchangeRequest.id, this.authSettings.connectionName);
                yield dialogContext.context.sendActivity({
                    type: botbuilder_1.ActivityTypes.InvokeResponse,
                    value: {
                        status: botbuilder_1.StatusCodes.OK,
                        body: exchangeResponse
                    }
                });
                // PromptRecognizerResult
                var result = {
                    succeeded: true,
                    value: {
                        channelId: cachedTokenResponse.channelId,
                        connectionName: cachedTokenResponse.connectionName,
                        token: cachedTokenResponse.token,
                        expiration: ""
                    }
                };
                return yield dialogContext.endDialog(result.value);
            }
            return yield _super.continueDialog.call(this, dialogContext);
        });
    }
}
exports.SsoOAuthPrompt = SsoOAuthPrompt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NvT2F1dGhQcm9tcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvZGlhbG9ncy9zc29PYXV0aFByb21wdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyREFBNkc7QUFDN0csMkNBQXVFO0FBRXZFOztHQUVHO0FBQ0YsTUFBTSwyQkFBMkI7SUFJOUIsWUFBWSxFQUFVLEVBQUUsY0FBc0I7UUFDMUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7QUFFRCxNQUFhLGNBQWUsU0FBUSxnQ0FBVztJQUUzQyxZQUFZLFFBQWdCLEVBQUUsUUFBNkI7UUFDdkQsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztJQUNqQyxDQUFDO0lBRUssY0FBYyxDQUFDLGFBQTRCOzs7OztZQUM3Qyw4SEFBOEg7WUFDOUgsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFakYsSUFBSSxtQkFBbUIsRUFBRTtnQkFDckIsTUFBTSxvQkFBb0IsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDL0YsSUFBSSxDQUFDLG9CQUFvQixFQUFFO29CQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG1GQUFtRixDQUFDLENBQUM7aUJBQ3hHO2dCQUVELDhCQUE4QjtnQkFDOUIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLDJCQUEyQixDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUVwSCxNQUFNLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUNwQztvQkFDSSxJQUFJLEVBQUUsMEJBQWEsQ0FBQyxjQUFjO29CQUNsQyxLQUFLLEVBQ0w7d0JBQ0ksTUFBTSxFQUFFLHdCQUFXLENBQUMsRUFBRTt3QkFDdEIsSUFBSSxFQUFFLGdCQUFnQjtxQkFDekI7aUJBQ0osQ0FBQyxDQUFDO2dCQUVQLHlCQUF5QjtnQkFDekIsSUFBSSxNQUFNLEdBQTBDO29CQUNoRCxTQUFTLEVBQUUsSUFBSTtvQkFDZixLQUFLLEVBQUU7d0JBQ0gsU0FBUyxFQUFFLG1CQUFtQixDQUFDLFNBQVM7d0JBQ3hDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxjQUFjO3dCQUNsRCxLQUFLLEVBQUUsbUJBQW1CLENBQUMsS0FBSzt3QkFDaEMsVUFBVSxFQUFFLEVBQUU7cUJBQ2pCO2lCQUNKLENBQUE7Z0JBRUQsT0FBTyxNQUFNLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3REO1lBRUQsT0FBTyxNQUFNLE9BQU0sY0FBYyxZQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELENBQUM7S0FBQTtDQUNKO0FBOUNELHdDQThDQyJ9