import { Request, Response } from "express";
import { CreateEventInput, FindEventInput } from "../schema/event.schema";
import { createEvent, findEvent, deleteEvent, getAllEvents } from "../service/event.service";

export async function createEventHandler(
  req: Request<{}, {}, CreateEventInput["body"]>,
  res: Response
) {
  try {
    const event = await createEvent(req.body);
    return res.send(event);
  } catch (e: any) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findEventHandler(
    req: Request<{}, {}, FindEventInput["body"]>,
    res: Response
  ) {
    try {
      const event = await findEvent(req.body);
      return res.send(event);
    } catch (e: any) {
      console.error(e);
      return res.status(409).send(e.message);
    }
  }

  export async function deleteEventHandler(
    req: Request<{}, {}, FindEventInput["body"]>,
    res: Response
  ) {
    try {
      const event = await deleteEvent(req.body);
      return res.send(event);
    } catch (e: any) {
      console.error(e);
      return res.status(409).send(e.message);
    }
  }

  export async function getAllEventHandler(
    req: Request<{}, {}, {}>,
    res: Response){
      try {
        const event_list = await getAllEvents();
        return res.send(event_list);
      } catch (e: any) {
        console.error(e);
        return res.status(409).send(e.message);
      }
    }