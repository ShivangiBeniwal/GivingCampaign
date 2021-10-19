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
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    shoutout: { type: String, required: true },
    startdate: { type: String, required: true, unique: true },
    enddate: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    eventid: { type: String, required: true, unique: true },
    eventurl: { type: String, required: true, unique: true },
}, {
    timestamps: true
});
const EventModel = mongoose.model("Event", eventSchema);
exports.default = EventModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zZXJ2ZXIvbW9kZWxzL2V2ZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxQztBQWlCckMsTUFBTSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3BDLElBQUksRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBQztJQUNqQyxJQUFJLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxJQUFJLEVBQUM7SUFDakMsUUFBUSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsSUFBSSxFQUFDO0lBQ3JDLFNBQVMsRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDO0lBQ25ELE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDO0lBQ2pELEtBQUssRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDO0lBQy9DLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDO0lBQ2pELFFBQVEsRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsSUFBSSxFQUFDO0NBQ3JELEVBQUM7SUFDRSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUFDLENBQUE7QUFFRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUV4RCxrQkFBZSxVQUFVLENBQUMifQ==