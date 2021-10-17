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
exports.SimpleGraphClient = void 0;
const microsoft_graph_client_1 = require("@microsoft/microsoft-graph-client");
/**
 * This class is a wrapper for the Microsoft Graph API.
 * See: https://developer.microsoft.com/en-us/graph for more information.
 */
class SimpleGraphClient {
    constructor(token) {
        if (!token || !token.trim()) {
            throw new Error('SimpleGraphClient: Invalid token received.');
        }
        this._token = token;
        // Get an Authenticated Microsoft Graph client using the token issued to the user.
        this.graphClient = microsoft_graph_client_1.Client.init({
            authProvider: (done) => {
                done(null, this._token); // First parameter takes an error if you can't get an access token.
            }
        });
    }
    /**
     * Collects information about the user in the bot.
     */
    getMe() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.graphClient
                .api('/me')
                .get().then((res) => {
                return res;
            });
        });
    }
    // Gets the user's photo
    GetPhotoAsync(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let graphPhotoEndpoint = 'https://graph.microsoft.com/v1.0/me/photos/240x240/$value';
            let graphRequestParams = {
                method: 'GET',
                headers: {
                    'Content-Type': 'image/png',
                    "authorization": "bearer " + token
                }
            };
            let response = yield fetch(graphPhotoEndpoint, graphRequestParams).catch();
            if (!response.ok) {
                console.error("ERROR: ", response);
            }
            let imageBuffer = yield response.arrayBuffer().catch(); //Get image data as raw binary data
            //Convert binary data to an image URL and set the url in state
            const imageUri = 'data:image/png;base64,' + Buffer.from(imageBuffer).toString('base64');
            return imageUri;
        });
    }
}
exports.SimpleGraphClient = SimpleGraphClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlR3JhcGhDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZXJ2ZXIvc2ltcGxlR3JhcGhDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDREQUE0RDtBQUM1RCxrQ0FBa0M7Ozs7Ozs7Ozs7OztBQUVsQyw4RUFBMkQ7QUFFM0Q7OztHQUdHO0FBQ0gsTUFBYSxpQkFBaUI7SUFHMUIsWUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsa0ZBQWtGO1FBQ2xGLElBQUksQ0FBQyxXQUFXLEdBQUcsK0JBQU0sQ0FBQyxJQUFJLENBQUM7WUFDM0IsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUVBQW1FO1lBQ2hHLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztZQUNQLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVztpQkFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQztpQkFDVixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7S0FBQTtJQUVELHdCQUF3QjtJQUNsQixhQUFhLENBQUMsS0FBYTs7WUFDN0IsSUFBSSxrQkFBa0IsR0FBRywyREFBMkQsQ0FBQztZQUNyRixJQUFJLGtCQUFrQixHQUFHO2dCQUNyQixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLFdBQVc7b0JBQzNCLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSztpQkFDckM7YUFDSixDQUFBO1lBRUQsSUFBSSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN0QztZQUVELElBQUksV0FBVyxHQUFHLE1BQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsbUNBQW1DO1lBRTNGLDhEQUE4RDtZQUM5RCxNQUFNLFFBQVEsR0FBRyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RixPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO0tBQUE7Q0FDSjtBQW5ERCw4Q0FtREMifQ==