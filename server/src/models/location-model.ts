import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
    _id: string;
    name: string;
    link: string;
    latitude: number;
    longitude: number;
    searchBlob?: string[];
    description?: string;
}

const LocationModel: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    searchBlob: { type: [String], required: false },
    description: { type: String, required: false },
});

export default mongoose.model<ILocation>('Locations', LocationModel);
