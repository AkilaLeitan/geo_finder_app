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

    async findLocations(searchText?: string, limit?: number): Promise<{ locations: ILocation[]; total: number }> {
        const query: any = {};

        // If searchText is provided, search in `name` and `searchBlob`
        if (searchText) {
            const regex = new RegExp(searchText.toLowerCase(), 'i'); // Case-insensitive regex
            query.$or = [
                { name: regex },
                { searchBlob: { $regex: regex } },
            ];
        }

        // Get total count of matching documents
        const total = await LocationModel.countDocuments(query).exec();

        // Fetch locations with optional limit
        const locations = await LocationModel.find(query)
            .limit(limit || 0) // Apply limit if provided
            .exec();

        return { locations, total };
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