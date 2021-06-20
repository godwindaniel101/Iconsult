import mongoose from "mongoose";

export type LicenseDocument = mongoose.Document & {

}
const License  = new  mongoose.Schema({
    name:{type:String,required:true}
})

