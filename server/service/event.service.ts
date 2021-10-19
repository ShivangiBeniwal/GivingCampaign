import { DocumentDefinition, FilterQuery } from "mongoose";
import EventModel, { EventDocument } from "../models/event.model";

export async function createEvent(
  input: DocumentDefinition<Omit<EventDocument, "createdAt" | "updatedAt">>
) {
  try {
    const event = await EventModel.create(input);

    return event.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findEvent(query: FilterQuery<EventDocument>) {
  return EventModel.findOne(query).lean();
}

export async function deleteEvent(query: FilterQuery<EventDocument>) {
  return EventModel.findOneAndDelete(query).lean();
}

export async function getAllEvents(){
  return EventModel.find().lean();
}