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
exports.SsoOAuthHelpler = void 0;
const botbuilder_1 = require("botbuilder");
class SsoOAuthHelpler {
    constructor(oAuthConnectName, storage) {
        this.oAuthConnectName = oAuthConnectName;
        this.storage = storage;
    }
    /// <summary>
    /// Determines if a "signin/tokenExchange" should be processed by this caller.
    ///
    /// If a token exchange is unsuccessful, an InvokeResponse of PreconditionFailed is sent.
    /// </summary>
    /// <param name="turnContext"><see cref="ITurnContext"/> for this specific activity.</param>
    /// <returns>True if the bot should continue processing this TokenExchange request.</returns>
    shouldProcessTokenExchange(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (turnContext.activity.name !== botbuilder_1.tokenExchangeOperationName) {
                throw new Error("Only 'signin/tokenExchange' invoke activities can be procssed by TokenExchangeHelper.");
            }
            if (!(yield this.exchangedToken(turnContext))) {
                // If the TokenExchange is NOT successful, the response will have already been sent by ExchangedToken
                return false;
            }
            // If a user is signed into multiple Teams clients, the Bot might receive a "signin/tokenExchange" from each client.
            // Each token exchange request for a specific user login will have an identical activity.value.Id.
            // Only one of these token exchange requests should be processe by the bot.  For a distributed bot in production,
            // this requires a distributed storage to ensure only one token exchange is processed.
            // This example utilizes Bot Framework IStorage's ETag implementation for token exchange activity deduplication.
            // Create a StoreItem with Etag of the unique 'signin/tokenExchange' request
            const storeItem = {
                eTag: turnContext.activity.value.id
            };
            const storeItems = { [this.getStorageKey(turnContext)]: storeItem };
            try {
                this.storage.write(storeItems);
            }
            catch (err) {
                console.log(err);
                if (err instanceof Error && err.message.startsWith('Etag conflict')) {
                    // TODO: Should send 200 invoke response here???
                    return false;
                }
                throw err;
            }
            return true;
        });
    }
    exchangedToken(turnContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let tokenExchangeResponse = null;
            const tokenExchangeRequest = turnContext.activity.value;
            const tokenProvider = turnContext.adapter;
            try {
                // turnContext.adapter IExtendedUserTokenProvider
                tokenExchangeResponse = yield tokenProvider.exchangeToken(turnContext, tokenExchangeRequest.connectionName, turnContext.activity.from.id, { token: tokenExchangeRequest.token });
                console.log('tokenExchangeResponse: ' + JSON.stringify(tokenExchangeResponse));
            }
            catch (err) {
                console.log(err);
                // Ignore Exceptions
                // If token exchange failed for any reason, tokenExchangeResponse above stays null , and hence we send back a failure invoke response to the caller.
            }
            if (!tokenExchangeResponse || !tokenExchangeResponse.token) {
                // The token could not be exchanged (which could be due to a consent requirement)
                // Notify the sender that PreconditionFailed so they can respond accordingly.
                yield turnContext.sendActivity({
                    type: botbuilder_1.ActivityTypes.InvokeResponse,
                    value: {
                        status: botbuilder_1.StatusCodes.PRECONDITION_FAILED,
                        // TokenExchangeInvokeResponse
                        body: {
                            id: tokenExchangeRequest.id,
                            connectionName: tokenExchangeRequest.connectionName,
                            failureDetail: 'The bot is unable to exchange token. Proceed with regular login.'
                        }
                    }
                });
                return false;
            }
            else {
                // Store response in TurnState, so the SsoOAuthPrompt can use it, and not have to do the exchange again.
                turnContext.turnState.set('tokenExchangeInvokeRequest', tokenExchangeRequest);
                turnContext.turnState.set('tokenResponse', tokenExchangeResponse);
            }
            return true;
        });
    }
    getStorageKey(turnContext) {
        if (!turnContext || !turnContext.activity || !turnContext.activity.conversation) {
            throw new Error('Invalid context, can not get storage key!');
        }
        const activity = turnContext.activity;
        const channelId = activity.channelId;
        const conversationId = activity.conversation.id;
        if (activity.type !== botbuilder_1.ActivityTypes.Invoke || activity.name !== botbuilder_1.tokenExchangeOperationName) {
            throw new Error('TokenExchangeState can only be used with Invokes of signin/tokenExchange.');
        }
        const value = activity.value;
        if (!value || !value.id) {
            throw new Error('Invalid signin/tokenExchange. Missing activity.value.id.');
        }
        return `${channelId}/${conversationId}/${value.id}`;
    }
}
exports.SsoOAuthHelpler = SsoOAuthHelpler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NvT2F1dGhIZWxwbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3Nzb09hdXRoSGVscGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBb0Y7QUFFcEYsTUFBYSxlQUFlO0lBR3hCLFlBQVksZ0JBQXFCLEVBQUUsT0FBc0I7UUFDckQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFFRCxhQUFhO0lBQ2IsOEVBQThFO0lBQzlFLEdBQUc7SUFDSCx5RkFBeUY7SUFDekYsY0FBYztJQUNkLDRGQUE0RjtJQUM1Riw2RkFBNkY7SUFDdkYsMEJBQTBCLENBQUMsV0FBd0I7O1lBQ3JELElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssdUNBQTBCLEVBQUU7Z0JBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsdUZBQXVGLENBQUMsQ0FBQzthQUM1RztZQUVELElBQUksQ0FBQyxDQUFBLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQSxFQUFFO2dCQUN6QyxxR0FBcUc7Z0JBQ3JHLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsb0hBQW9IO1lBQ3BILGtHQUFrRztZQUNsRyxpSEFBaUg7WUFDakgsc0ZBQXNGO1lBRXRGLGdIQUFnSDtZQUVoSCw0RUFBNEU7WUFDNUUsTUFBTSxTQUFTLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7YUFDdEMsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDcEUsSUFBSTtnQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMs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