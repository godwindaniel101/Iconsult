import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import Profile from "../profile/model";

export type UserDocument = mongoose.Document & {
  _id: ObjectId;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  password: string;
  category: string;
  user_type: string;
  company: string;
  is_owner: boolean;
  profile: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
};

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    category: {
      type: String,
      enum: ["individual", "company-individual"],
      default: "individual",
    },
    user_type: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    is_owner: { type: Boolean, default: false },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.methods.comparePassword = async function (candidatePassword: string) {

  const user = this as UserDocument
  
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false )
}

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();

  const saltRounds = +process.env.SALTROUNDS! as number;

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  return next();
});

UserSchema.pre("save", function () {
  this.$locals.wasNew = this.isNew;
});

UserSchema.post("save", async function (user: UserDocument, next: mongoose.HookNextFunction) {
  if (this.$locals.wasNew) {
    const profileData = await Profile.create({ user: user._id });
    user.profile = profileData._id;
    user.save();
  }
  return next();
});

export default mongoose.model<UserDocument>("User", UserSchema);
