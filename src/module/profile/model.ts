import mongoose, { ObjectId } from 'mongoose'

export type ProfileDocument = mongoose.Document & {
  _id: ObjectId
  user: string
}
const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

export default mongoose.model<ProfileDocument>('Profile', ProfileSchema)