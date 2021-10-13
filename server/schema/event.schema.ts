import {object, string, TypeOf} from "zod";

export const createEventSchema = object({
  body: object({
    name: string({required_error: "Name is required"}),
    desc: string({required_error: "Description is required"}),
    shoutout: string({required_error: "Shoutout is required"}),
    startdate: string({required_error: "Start date is required"}),
    enddate: string({required_error: "End date is required"}),
    email: string().email("Not a valid email"),
    eventid: string(),
    eventurl: string({required_error: "Event URL is required"})
  }).required()
});

export const findEventSchema = object({
    body: object({
      eventid: string()
    }).required()
  });

export type CreateEventInput = TypeOf<typeof createEventSchema>;
export type FindEventInput = TypeOf<typeof findEventSchema>;