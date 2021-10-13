import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import SubscribeModel, { SubscribeDocument } from "../models/subscribe.model";

export async function subscribeEvent(input: DocumentDefinition<SubscribeDocument>){
    var query : FilterQuery<Omit<SubscribeDocument,"eventids">> = input;
    const eventids:String[] = await findSubscriptionForEmail(input);
    if(typeof eventids != null){
        // eventids.push(input.eventids);
        SubscribeModel.updateOne(query, input);
    }
    var query : FilterQuery<Omit<SubscribeDocument,"eventids">> = input;
    SubscribeModel.updateOne(query, input);
}

export async function findSubscriptionForEmail(query: FilterQuery<Omit<SubscribeDocument,"eventids">>) {
    return SubscribeModel.findOne(query).lean();
  }
