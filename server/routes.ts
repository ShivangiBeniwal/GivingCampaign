import { Express, Request, Response } from "express"
import validateResource from "./middleware/validateResource";
import { createEventSchema, findEventSchema } from "./schema/event.schema";
import { createEventHandler, findEventHandler, deleteEventHandler, getAllEventHandler } from "./controller/event.controller";

export default function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    // Setup home page
    app.get('/', (req: any, res: any) => res.render('main'));
    // Create Event form
    app.get('/event_form', (req: any, res: any) => res.render('event_form'));

    // app.get('/event_list', (req: any, res: any) => {
    //     // var json_string = { action:"date +%s", result:"1367263074"};
    //     // res.render('event_list', { layout : 'layout', json: json_string });}
    //     res.render();
    // );

    app.get("/event_list", getAllEventHandler);

    app.post("/api/createEvent", validateResource(createEventSchema), createEventHandler);
    app.get("/api/findEvent", validateResource(findEventSchema), findEventHandler);
    app.delete("/api/deleteEvent", validateResource(findEventSchema), deleteEventHandler);
}