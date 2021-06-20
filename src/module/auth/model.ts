import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export type UserDocument = mongoose.Document & {
  email: string
  name: string
  first_name: string
  last_name: string
  password: string
  category: string
  user_type: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    category: {
      type: String,
      enum: ['individual', 'company', 'company-individual'],
      default: 'individual',
    },
    user_type: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  },
  { timestamps: true },
)

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  const user = this as UserDocument

  if (!user.isModified('password')) return next()

  const saltRounds = +process.env.SALTROUNDS! as number

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword =  await bcrypt.hash(user.password, salt)

  user.password = hashedPassword

  return next();

})
export default mongoose.model<UserDocument>('User', UserSchema)
