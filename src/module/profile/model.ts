import mongoose from 'mongoose'

const Profile = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
})
