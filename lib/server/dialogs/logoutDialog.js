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
exports.LogoutDialog = void 0;
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
class LogoutDialog extends botbuilder_dialogs_1.ComponentDialog {
    constructor(id, connectionName) {
        super(id);
        this.connectionName = connectionName;
    }
    onBeginDialog(innerDc, options) {
        const _super = Object.create(null, {
            onBeginDialog: { get: () => super.onBeginDialog }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.interrupt(innerDc);
            if (result) {
                return result;
            }
            return yield _super.onBeginDialog.call(this, innerDc, options);
        });
    }
    onContinueDialog(innerDc) {
        const _super = Object.create(null, {
            onContinueDialog: { get: () => super.onContinueDialog }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.interrupt(innerDc);
            if (result) {
                return result;
            }
            return yield _super.onContinueDialog.call(this, innerDc);
        });
    }
    interrupt(innerDc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (innerDc.context.activity.type === botbuilder_1.ActivityTypes.Message) {
                const text = innerDc.context.activity.text.toLowerCase();
                // Remove the line break
                if (text.replace(/\r?\n|\r/g, '') === 'logout') {
                    // The bot adapter encapsulates the authentication processes.
                    const botAdapter = innerDc.context.adapter;
                    yield botAdapter.signOutUser(innerDc.context, this.connectionName);
                    yield innerDc.context.sendActivity('You have been signed out.');
                    return yield innerDc.cancelAllDialogs();
                }
            }
        });
    }
}
exports.LogoutDialog = LogoutDialog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb3V0RGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL2RpYWxvZ3MvbG9nb3V0RGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw0REFBNEQ7QUFDNUQsa0NBQWtDOzs7Ozs7Ozs7Ozs7QUFFbEMsMkNBQWdFO0FBQ2hFLDJEQUFvRTtBQUVwRSxNQUFhLFlBQWEsU0FBUSxvQ0FBZTtJQUU3QyxZQUFZLEVBQVUsRUFBRSxjQUFzQjtRQUMxQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUssYUFBYSxDQUFDLE9BQXNCLEVBQUUsT0FBdUI7Ozs7O1lBQy9ELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUVELE9BQU8sTUFBTSxPQUFNLGFBQWEsWUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsT0FBc0I7Ozs7O1lBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUVELE9BQU8sTUFBTSxPQUFNLGdCQUFnQixZQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxPQUFzQjs7WUFDbEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssMEJBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDekQsd0JBQXdCO2dCQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDNUMsNkRBQTZEO29CQUM3RCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQThCLENBQUM7b0JBQ2xFLE1BQU0sVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUNoRSxPQUFPLE1BQU0sT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQzNDO2FBQ0o7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQXRDRCxvQ0FzQ0MifQ==