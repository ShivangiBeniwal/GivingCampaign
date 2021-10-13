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
exports.getAllEventHandler = exports.deleteEventHandler = exports.findEventHandler = exports.createEventHandler = void 0;
const event_service_1 = require("../service/event.service");
function createEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event = yield (0, event_service_1.createEvent)(req.body);
            return res.send(event);
        }
        catch (e) {
            console.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.createEventHandler = createEventHandler;
function findEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event = yield (0, event_service_1.findEvent)(req.body);
            return res.send(event);
        }
        catch (e) {
            console.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.findEventHandler = findEventHandler;
function deleteEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event = yield (0, event_service_1.deleteEvent)(req.body);
            return res.send(event);
        }
        catch (e) {
            console.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.deleteEventHandler = deleteEventHandler;
function getAllEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event_list = yield (0, event_service_1.getAllEvents)();
            return res.send(event_list);
        }
        catch (e) {
            console.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.getAllEventHandler = getAllEventHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9jb250cm9sbGVyL2V2ZW50LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRUEsNERBQTZGO0FBRTdGLFNBQXNCLGtCQUFrQixDQUN0QyxHQUE4QyxFQUM5QyxHQUFhOztRQUViLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEsMkJBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO1FBQUMsT0FBTyxDQUFNLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztDQUFBO0FBWEQsZ0RBV0M7QUFFRCxTQUFzQixnQkFBZ0IsQ0FDbEMsR0FBNEMsRUFDNUMsR0FBYTs7UUFFYixJQUFJO1lBQ0YsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLHlCQUFTLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7Q0FBQTtBQVhILDRDQVdHO0FBRUQsU0FBc0Isa0JBQWtCLENBQ3RDLEdBQTRDLEVBQzVDLEdBQWE7O1FBRWIsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBQSwyQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFBQyxPQUFPLENBQU0sRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDO0NBQUE7QUFYRCxnREFXQztBQUVELFNBQXNCLGtCQUFrQixDQUN0QyxHQUF3QixFQUN4QixHQUFhOztRQUNYLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUEsNEJBQVksR0FBRSxDQUFDO1lBQ3hDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QjtRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7Q0FBQTtBQVZILGdEQVVHIn0=