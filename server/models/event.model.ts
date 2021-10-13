import * as mongoose from "mongoose";

export interface EventDocument extends mongoose.Document{
    name?:string;
    desc?:string;
    shoutout?:string;
    startdate?:String;
    enddate?:String;
    email?:string;
    eventid?:string;
    eventurl?:string;
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = new mongoose.Schema({
    name:{type:String, required:true},
    desc:{type:String, required:true},
    shoutout:{type:String, required:true},
    startdate:{type:String, required:true, unique:true},
    enddate:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    eventid:{type:String, required:true, unique:true},
    eventurl:{type:String, required:true, unique:true},
},{
    timestamps: true
})

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;