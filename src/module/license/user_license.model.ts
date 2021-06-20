import mongoose from 'mongoose'
import {UserDocument} from "../auth/model"
import {LicenseDocument} from "./model"

export type UserLicenseDocument = mongoose.Document & {
    user:UserDocument["_id"];
    license: LicenseDocument["_id"];
    startedAt:Date;
    expiredAt:Date
}
const UserLicenseSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    license:{type:mongoose.Schema.Types.ObjectId, ref: 'License'},
    startedAt:{type:Date},
    expiredAt:{type:Date}
})

export default mongoose.model<UserLicenseDocument>('UserLicense',UserLicenseSchema)