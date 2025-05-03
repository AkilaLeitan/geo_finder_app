import { UpdateQuery } from 'mongoose';
import LocationModel, { ILocation } from '../models/location-model';

export class LocationRepository {
    async addLocation(location: ILocation): Promise<ILocation> {
        return await LocationModel.create(location);
    }

    async findByLink(link: string): Promise<ILocation | null> {
        return await LocationModel.findOne({ link }).exec();
    }

    async getAllLocations(): Promise<ILocation[]> {
        return await LocationModel.find().exec(); // Fetch all locations
    }

    async findById(id: string): Promise<ILocation | null> {
        return await LocationModel.findById(id).exec(); // Fetch location by ID
    }

    async findLocationsByString(searchString: string): Promise<ILocation[]> {
        const regex = new RegExp(searchString, 'i'); // Case-insensitive regex
        return await LocationModel.find({
            $or: [
                { name: regex }, // Search in the `name` field
                { searchBlob: { $regex: regex } }, // Search in the `searchBlob` array
            ],
        }).exec();
    }

    async upsertLocation(id: string, updateData: UpdateQuery<ILocation>): Promise<ILocation | null> {
        return await LocationModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, upsert: true, runValidators: true } // Upsert and validate
        ).exec();
    }

    async deleteLocationById(id: string): Promise<ILocation | null> {
        return await LocationModel.findByIdAndDelete(id).exec(); // Delete location by ID
    }
    
}