"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const subscribechema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    eventids: { type: [String], required: true, unique: true },
}, {
    timestamps: true
});
const SubscribeModel = mongoose.model("Subscribe", subscribechema);
exports.default = SubscribeModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL21vZGVscy9zdWJzY3JpYmUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXFDO0FBT3JDLE1BQU0sY0FBYyxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxLQUFLLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBQztJQUMvQyxRQUFRLEVBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxJQUFJLEVBQUM7Q0FDdkQsRUFBQztJQUNFLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FBQTtBQUVGLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRW5FLGtCQUFlLGNBQWMsQ0FBQyJ9