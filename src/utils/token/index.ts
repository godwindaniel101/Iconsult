import jwt from "jsonwebtoken";

export const sign = async (object: Object, option?: jwt.SignOptions) => {

  const tokenKey = process.env.NODE_KEY as string;

  var token =  jwt.sign(object, tokenKey, option);
  
  return token;
};

export const decode = () => {};
