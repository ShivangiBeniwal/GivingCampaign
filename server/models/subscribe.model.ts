import * as mongoose from "mongoose";

export interface SubscribeDocument extends mongoose.Document{
    email?:string,
    eventids?:[string];
}

const subscribechema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    eventids:{type:[String], required:true, unique:true},
},{
    timestamps: true
})

const SubscribeModel = mongoose.model("Subscribe", subscribechema);

export default SubscribeModel;