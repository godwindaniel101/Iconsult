import mongoose,{ObjectId} from 'mongoose';

export type SessionDocument = mongoose.Document & {
    _id: ObjectId;
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