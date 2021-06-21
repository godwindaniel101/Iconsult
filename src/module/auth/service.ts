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
