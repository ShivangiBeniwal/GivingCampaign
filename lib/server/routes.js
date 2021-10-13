"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const event_schema_1 = require("./schema/event.schema");
const event_controller_1 = require("./controller/event.controller");
function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // Setup home page
    app.get('/', (req, res) => res.render('main'));
    // Create Event form
    app.get('/event_form', (req, res) => res.render('event_form'));
    // app.get('/event_list', (req: any, res: any) => {
    //     // var json_string = { action:"date +%s", result:"1367263074"};
    //     // res.render('event_list', { layout : 'layout', json: json_string });}
    //     res.render();
    // );
    app.get("/event_list", event_controller_1.getAllEventHandler);
    app.post("/api/createEvent", (0, validateResource_1.default)(event_schema_1.createEventSchema), event_controller_1.createEventHandler);
    app.get("/api/findEvent", (0, validateResource_1.default)(event_schema_1.findEventSchema), event_controller_1.findEventHandler);
    app.delete("/api/deleteEvent", (0, validateResource_1.default)(event_schema_1.findEventSchema), event_controller_1.deleteEventHandler);
}
exports.default = routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFGQUE2RDtBQUM3RCx3REFBMkU7QUFDM0Usb0VBQTZIO0FBRTdILFNBQXdCLE1BQU0sQ0FBQyxHQUFZO0lBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlFLGtCQUFrQjtJQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6RCxvQkFBb0I7SUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFFekUsbURBQW1EO0lBQ25ELHNFQUFzRTtJQUN0RSw4RUFBOEU7SUFDOUUsb0JBQW9CO0lBQ3BCLEtBQUs7SUFFTCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxxQ0FBa0IsQ0FBQyxDQUFDO0lBRTNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyxnQ0FBaUIsQ0FBQyxFQUFFLHFDQUFrQixDQUFDLENBQUM7SUFDdEYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFBLDBCQUFnQixFQUFDLDhCQUFlLENBQUMsRUFBRSxtQ0FBZ0IsQ0FBQyxDQUFDO0lBQy9FLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyw4QkFBZSxDQUFDLEVBQUUscUNBQWtCLENBQUMsQ0FBQztBQUMxRixDQUFDO0FBbEJELHlCQWtCQyJ9