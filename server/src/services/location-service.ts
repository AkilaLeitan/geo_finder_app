import { LocationRepository } from '../repositories/location-repository';
import { ILocation } from '../models/location-model';
import { ErrorCodes } from '../utils/errors';
import { v4 as uuidv4 } from 'uuid';

export class LocationService {
    private readonly repository: LocationRepository;

    constructor() {
        this.repository = new LocationRepository();
    }

    isValidUrl(url: string): boolean {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        return urlRegex.test(url);
    }

    async addLocation(location: Omit<ILocation, '_id'>): Promise<{ id: string }> {
        if (!this.isValidUrl(location.link)) {
            throw new Error(ErrorCodes.INVALID_URL.toString());
        }

        // Check for duplicate link
        const existingLocation = await this.repository.findByLink(location.link);
        if (existingLocation) {
            throw new Error(ErrorCodes.DUPLICATE_LINK.toString());
        }

        const id = uuidv4();
        const newLocation = { ...location, _id: id.toString() };
        await this.repository.addLocation(newLocation as ILocation);

        return { id };
    }

    async getAllLocations(): Promise<ILocation[]> {
        return await this.repository.getAllLocations();
    }

    async getLocationById(id: string): Promise<ILocation | null> {
        const location = await this.repository.findById(id);
        if (!location) {
            throw new Error(ErrorCodes.LOCATION_NOT_FOUND.toString()); // Custom error for not found
        }
        return location;
    }

    async findLocationsByString(searchString: string): Promise<ILocation[]> {
        const lowerCaseString = searchString.toLowerCase(); // Convert string to lowercase
        const locations = await this.repository.findLocationsByString(lowerCaseString);

        if (locations && locations.length > 0) {
            return locations;
        } else {
            throw new Error(ErrorCodes.LOCATION_NOT_FOUND.toString());
        }
    }

    async upsertLocation(id: string, location: Omit<ILocation, '_id'>): Promise<ILocation> {

        // Check if the location with the given ID exists
        const existingLocationById = await this.repository.findById(id);
        if (!existingLocationById) {
            throw new Error(ErrorCodes.LOCATION_NOT_FOUND.toString());
        }

        // Validate the URL
        if (!this.isValidUrl(location.link)) {
            throw new Error(ErrorCodes.INVALID_URL.toString());
        }

        // Check for duplicate link (excluding the current location)
        const existingLocation = await this.repository.findByLink(location.link);
        if (existingLocation && existingLocation._id !== id) {
            throw new Error(ErrorCodes.DUPLICATE_LINK.toString());
        }

        // Upsert the location
        const updateData = { ...location, _id: id || uuidv4() };
        const updatedLocation = await this.repository.upsertLocation(id, updateData);

        if (!updatedLocation) {
            throw new Error(ErrorCodes.DATABASE_ERROR.toString());
        }

        return updatedLocation;
    }

    async deleteLocationById(id: string): Promise<string> {
        // Check if the location exists
        const existingLocation = await this.repository.findById(id);
        if (!existingLocation) {
            throw new Error(ErrorCodes.LOCATION_NOT_FOUND.toString());
        }

        // Delete the location
        await this.repository.deleteLocationById(id);

        // Return the name of the deleted location
        return existingLocation.name;
    }
}