import mongoose, { Document, Schema } from 'mongoose';

export interface IPublication extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    content: string;
    status: 'draft' | 'published';
}

const publicationSchema = new Schema<IPublication>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

export default mongoose.model<IPublication>('Publication', publicationSchema);
