import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  LeanDocument,
} from "mongoose";
import AppError from "../../utils/error/AppError";
import User, { UserDocument } from "./model";
import { CompanyUserDocument } from "./types";
import Company, { CompanyDocument } from "../company/model";
import Session, { SessionDocument } from "./session";
import { sign } from "../../utils/token";
import config,{omit} from 'lodash'

//function to check if a user exist
export const userExist = async (input: DocumentDefinition<UserDocument>) => {
  const user = await findUser({ email: input.email });
  if (user) return true;

  return false;
};

export const registerHandler = async (
  input: DocumentDefinition<UserDocument>
) => {
  try {
    const user = await User.create(input);
    return user;
  } catch (e) {
    return new AppError(e, 500);
  }
};

export const companyRegisterHandler = async (
  input: DocumentDefinition<CompanyUserDocument>
) => {
  try {
    const company = await Company.create(input);

    let userInput: LeanDocument<UserDocument> = input;

    userInput.company = company._id;
    userInput.category = "company-individual";
    userInput.is_owner = true;

    const user = await registerHandler(userInput);

    return user;
  } catch (e) {
    return new AppError(e, 500);
  }
};

export const validatePassword = async (input: DocumentDefinition<UserDocument>) => {
  const user = await findUser({ email: input.email })
  if (!user || !user.comparePassword(input.password)) return false;

  return omit(user.toJSON(), "password");
}

export const createSession = async (userId: String, userAgent: String) => {
  return (await Session.create({ user: userId, userAgent: userAgent })).toJSON()
}

export const createAccessToken = async ({ user, session }: { user: Omit<UserDocument, 'password'> | LeanDocument<Omit<UserDocument, 'password'>> , session: LeanDocument<SessionDocument> }) => {
  
  const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRING as string;
  
  const token = await sign({ ...user, session: session._id }, { expiresIn: accessTokenExpiresIn })
  
  return token
}

export const createRefreshToken = async (session: LeanDocument<SessionDocument>) => {

  const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRING as string;

  const token = await sign({...session}, { expiresIn: refreshTokenExpiresIn })
  
  return token
}

export const reIssueAccessToken = async(input:LeanDocument<SessionDocument>) =>{
    const session = await Session.findById(input._id)

    if(!session || !session.valid) return false ;

    let userData  =  await User.findOne({_id: session.user});
  
    if(!userData) return false

    const user = omit(userData.toJSON(), "password") as UserDocument

    const accessToken = createAccessToken({session, user})

    return accessToken;
}
export const logoutUser = async(input:DocumentDefinition<UserDocument>) =>{
 
   const session = await Session.updateMany({user : input._id}, {valid : false})
   
   if(!session) return  false;

   return true;
}

export const resetTokenHandler = (data :any)=>{
return 'xxxx';
}
export const findUser = (query: FilterQuery<UserDocument>) => {
  return User.findOne(query);
};

export const findAndUpdate = (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) => {
  const user = User.findOneAndUpdate(query, update);

  if (!user) return false;

  return user;
};
