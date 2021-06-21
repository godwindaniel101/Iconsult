import mongoose from 'mongoose';

export type SessionDocument = mongoose.Document & {
    user: string;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}
const SessionSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    userAgent: { type: String },
}, { timestamps: true }
)

export default mongoose.model<SessionDocument>('Session', SessionSchema)