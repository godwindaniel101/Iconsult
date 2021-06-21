import { Request } from 'express';
import mongoose, { HookNextFunction } from 'mongoose';
import {UserDocument} from '../auth/model'

export type CompanyUserDocument =  UserDocument & {
    company_name:string
    rc_number:string
    website:string
    email:string
    tell:string
}

export type CompanyDocument = mongoose.Document & {
    company_name:string
    rc_number:string
    website:string
    email:string
    tell:string
}

const CompanySchema = new mongoose.Schema({
    company_name: { type: String, required: true },
    rc_number: { type: String },
    website: { type: String },
    email: { type: String },
    tel: { type: String },
})

export default mongoose.model<CompanyDocument>('Company' ,CompanySchema)