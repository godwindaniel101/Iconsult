import {UserDocument} from '../auth/model'

export type CompanyUserDocument =  UserDocument & {
    company_name:string
    rc_number:string
    website:string
    email:string
    tell:string
}
