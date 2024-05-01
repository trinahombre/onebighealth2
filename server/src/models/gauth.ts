import {Schema, model} from "mongoose";

const user = new Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});

const Guser = model("GUser", user);

export default Guser;