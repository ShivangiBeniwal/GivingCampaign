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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSubscriptionForEmail = exports.subscribeEvent = void 0;
const subscribe_model_1 = __importDefault(require("../models/subscribe.model"));
function subscribeEvent(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var query = input;
        const eventids = yield findSubscriptionForEmail(input);
        if (typeof eventids != null) {
            // eventids.push(input.eventids);
            subscribe_model_1.default.updateOne(query, input);
        }
        var query = input;
        subscribe_model_1.default.updateOne(query, input);
    });
}
exports.subscribeEvent = subscribeEvent;
function findSubscriptionForEmail(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return subscribe_model_1.default.findOne(query).lean();
    });
}
exports.findSubscriptionForEmail = findSubscriptionForEmail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvc2VydmljZS9zdWJzY3JpYmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRkFBOEU7QUFFOUUsU0FBc0IsY0FBYyxDQUFDLEtBQTRDOztRQUM3RSxJQUFJLEtBQUssR0FBcUQsS0FBSyxDQUFDO1FBQ3BFLE1BQU0sUUFBUSxHQUFZLE1BQU0sd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsSUFBRyxPQUFPLFFBQVEsSUFBSSxJQUFJLEVBQUM7WUFDdkIsaUNBQWlDO1lBQ2pDLHlCQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksS0FBSyxHQUFxRCxLQUFLLENBQUM7UUFDcEUseUJBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FBQTtBQVRELHdDQVNDO0FBRUQsU0FBc0Isd0JBQXdCLENBQUMsS0FBc0Q7O1FBQ2pHLE9BQU8seUJBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUMsQ0FBQztDQUFBO0FBRkgsNERBRUcifQ==