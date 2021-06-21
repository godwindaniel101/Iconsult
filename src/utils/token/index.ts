import jwt from "jsonwebtoken";

const tokenKey = process.env.NODE_KEY as string;

export const sign = async (object: Object, option?: jwt.SignOptions) => {

  var token = jwt.sign(object, tokenKey, option);

  return token;
};

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, tokenKey)

    return { valid: true, expired: false, decoded, err: null }

  } catch (err) {

    return { valid: false, expired: true, decoded: null, err }

  }
};


