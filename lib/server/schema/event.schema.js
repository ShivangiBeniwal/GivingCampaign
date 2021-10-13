"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Name is required" }),
        desc: (0, zod_1.string)({ required_error: "Description is required" }),
        shoutout: (0, zod_1.string)({ required_error: "Shoutout is required" }),
        startdate: (0, zod_1.string)({ required_error: "Start date is required" }),
        enddate: (0, zod_1.string)({ required_error: "End date is required" }),
        email: (0, zod_1.string)().email("Not a valid email"),
        eventid: (0, zod_1.string)(),
        eventurl: (0, zod_1.string)({ required_error: "Event URL is required" })
    }).required()
});
exports.findEventSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        eventid: (0, zod_1.string)()
    }).required()
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL3NjaGVtYS9ldmVudC5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTJDO0FBRTlCLFFBQUEsaUJBQWlCLEdBQUcsSUFBQSxZQUFNLEVBQUM7SUFDdEMsSUFBSSxFQUFFLElBQUEsWUFBTSxFQUFDO1FBQ1gsSUFBSSxFQUFFLElBQUEsWUFBTSxFQUFDLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUM7UUFDbEQsSUFBSSxFQUFFLElBQUEsWUFBTSxFQUFDLEVBQUMsY0FBYyxFQUFFLHlCQUF5QixFQUFDLENBQUM7UUFDekQsUUFBUSxFQUFFLElBQUEsWUFBTSxFQUFDLEVBQUMsY0FBYyxFQUFFLHNCQUFzQixFQUFDLENBQUM7UUFDMUQsU0FBUyxFQUFFLElBQUEsWUFBTSxFQUFDLEVBQUMsY0FBYyxFQUFFLHdCQUF3QixFQUFDLENBQUM7UUFDN0QsT0FBTyxFQUFFLElBQUEsWUFBTSxFQUFDLEVBQUMsY0FBYyxFQUFFLHNCQUFzQixFQUFDLENBQUM7UUFDekQsS0FBSyxFQUFFLElBQUEsWUFBTSxHQUFFLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQzFDLE9BQU8sRUFBRSxJQUFBLFlBQU0sR0FBRTtRQUNqQixRQUFRLEVBQUUsSUFBQSxZQUFNLEVBQUMsRUFBQyxjQUFjLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQztLQUM1RCxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ2QsQ0FBQyxDQUFDO0FBRVUsUUFBQSxlQUFlLEdBQUcsSUFBQSxZQUFNLEVBQUM7SUFDbEMsSUFBSSxFQUFFLElBQUEsWUFBTSxFQUFDO1FBQ1gsT0FBTyxFQUFFLElBQUEsWUFBTSxHQUFFO0tBQ2xCLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDZCxDQUFDLENBQUMifQ==