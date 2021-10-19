import * as mongoose from "mongoose";

export interface SubscribeInput extends mongoose.Document{
    email?:string,
    eventids?:[string];
}

export interface SubscribeDocument extends SubscribeInput, mongoose.Document{}

const subscribeschema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    eventids:{type:[String], required:true, unique:true},
},{
    timestamps: true
})

const SubscribeModel = mongoose.model("Subscribe", subscribeschema);

export default SubscribeModel;