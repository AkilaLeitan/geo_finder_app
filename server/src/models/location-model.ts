import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
    name: string;
    link: string;
    searchBlob?: string[];
    description?: string;
}

const LocationModel: Schema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
    searchBlob: { type: [String], required: false },
    description: { type: String, required: false },
});

export default mongoose.model<ILocation>('Location', LocationModel);