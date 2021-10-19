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
exports.getAllEvents = exports.deleteEvent = exports.findEvent = exports.createEvent = void 0;
const event_model_1 = __importDefault(require("../models/event.model"));
function createEvent(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event = yield event_model_1.default.create(input);
            return event.toJSON();
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.createEvent = createEvent;
function findEvent(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return event_model_1.default.findOne(query).lean();
    });
}
exports.findEvent = findEvent;
function deleteEvent(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return event_model_1.default.findOneAndDelete(query).lean();
    });
}
exports.deleteEvent = deleteEvent;
function getAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        return event_model_1.default.find().lean();
    });
}
exports.getAllEvents = getAllEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zZXJ2aWNlL2V2ZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWtFO0FBRWxFLFNBQXNCLFdBQVcsQ0FDL0IsS0FBeUU7O1FBRXpFLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLHFCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTdDLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3ZCO1FBQUMsT0FBTyxDQUFNLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztDQUFBO0FBVkQsa0NBVUM7QUFFRCxTQUFzQixTQUFTLENBQUMsS0FBaUM7O1FBQy9ELE9BQU8scUJBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUMsQ0FBQztDQUFBO0FBRkQsOEJBRUM7QUFFRCxTQUFzQixXQUFXLENBQUMsS0FBaUM7O1FBQ2pFLE9BQU8scUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0NBQUE7QUFGRCxrQ0FFQztBQUVELFNBQXNCLFlBQVk7O1FBQ2hDLE9BQU8scUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0NBQUE7QUFGRCxvQ0FFQyJ9