import { UserDocument } from "../module/auth/model";
declare global {
    namespace Express {
      interface Request {
        user: UserDocument
      }
    }
  }