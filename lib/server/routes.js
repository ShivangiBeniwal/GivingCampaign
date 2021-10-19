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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const event_schema_1 = require("./schema/event.schema");
const event_controller_1 = require("./controller/event.controller");
function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // Setup home page
    app.get('/', (req, res) => res.render('main'));
    app.get("/file", (req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', '/client/images/', req.query.name));
    });
    // Dummy Form Page
    app.get('/form', (req, res) => res.render('form'));
    // Feeds before creating event
    app.get('/feeds_before', (req, res) => res.render('feedsBefore'));
    // Feeds after creating event
    app.get('/feeds_after', (req, res) => res.render('feedsAfter'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmVyL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFFN0IscUZBQTZEO0FBQzdELHdEQUEyRTtBQUMzRSxvRUFBNkg7QUFFN0gsU0FBd0IsTUFBTSxDQUFDLEdBQVk7SUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUUsa0JBQWtCO0lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRXpELEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO1FBQ3BDLEdBQUcsQ0FBQyxRQUFRLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFFSCxrQkFBa0I7SUFDbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFN0QsOEJBQThCO0lBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRzVFLDZCQUE2QjtJQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUUxRSxvQkFBb0I7SUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFFekUsbURBQW1EO0lBQ25ELHNFQUFzRTtJQUN0RSw4RUFBOEU7SUFDOUUsb0JBQW9CO0lBQ3BCLEtBQUs7SUFFTCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxxQ0FBa0IsQ0FBQyxDQUFDO0lBRTNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyxnQ0FBaUIsQ0FBQyxFQUFFLHFDQUFrQixDQUFDLENBQUM7SUFDdEYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFBLDBCQUFnQixFQUFDLDhCQUFlLENBQUMsRUFBRSxtQ0FBZ0IsQ0FBQyxDQUFDO0lBQy9FLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyw4QkFBZSxDQUFDLEVBQUUscUNBQWtCLENBQUMsQ0FBQztBQUMxRixDQUFDO0FBakNELHlCQWlDQyJ9