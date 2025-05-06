import { Request, Response } from 'express';
import { LocationService } from '../services/location-service';
import { BaseResponse } from '../utils/base-response';
import { ErrorCodes } from '../utils/errors';
import { ILocation } from '../models/location-model';

export class LocationController {
    private readonly service: LocationService;

    constructor() {
        this.service = new LocationService();
    }

    async addLocation(req: Request, res: Response): Promise<void> {
        try {
            const { name, link, latitude, longitude, searchBlob, description } = req.body;

            const location: Omit<ILocation, '_id'> = { name, link, latitude, longitude, searchBlob, description } as Omit<ILocation, '_id'>;
            const result = await this.service.addLocation(location);
            res.status(201).json(new BaseResponse(true, result, null, 'Location added successfully'));
        } catch (error: any) {
            console.error('Error adding location:', error);
            if (error.message === ErrorCodes.INVALID_URL.toString()) {
                res.status(400).json(new BaseResponse(false, null, ErrorCodes.INVALID_URL.toString(), 'Invalid URL'));
            } else if (error.message === ErrorCodes.DUPLICATE_LINK.toString()) {
                res.status(400).json(new BaseResponse(false, null, ErrorCodes.DUPLICATE_LINK.toString(), 'Link already exists'));
            }
            else {
                res.status(500).json(new BaseResponse(false, null, ErrorCodes.SOMETHING_WENT_WRONG.toString(), 'Something went wrong'));
            }
        }
    }

    async getAllLocations(req: Request, res: Response): Promise<void> {
        try {
            const locations = await this.service.getAllLocations();
            res.status(200).json(new BaseResponse(true, locations, null, 'Locations fetched successfully'));
        } catch (error: any) {
            console.error('Error get all locations:', error);
            res.status(500).json(new BaseResponse(false, null, ErrorCodes.SOMETHING_WENT_WRONG.toString(), 'Something went wrong'));
        }
    }

    async getLocationById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const location = await this.service.getLocationById(id);
            res.status(200).json(new BaseResponse(true, location, null, 'Location fetched successfully'));
        } catch (error: any) {
            console.error('Error get location by id:', error);
            if (error.message === ErrorCodes.LOCATION_NOT_FOUND.toString()) {
                res.status(404).json(new BaseResponse(false, null, ErrorCodes.LOCATION_NOT_FOUND.toString(), 'Location not found'));
            } else {
                res.status(500).json(new BaseResponse(false, null, ErrorCodes.SOMETHING_WENT_WRONG.toString(), 'Something went wrong'));
            }
        }
    }

    async getLocations(req: Request, res: Response): Promise<void> {
        try {
            const { searchText, limit, latitude, longitude } = req.query;

            // Parse limit as a number
            const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;

            const latitudeNum = latitude ? parseFloat(latitude as string) : undefined;
            const longitudeNum = longitude ? parseFloat(longitude as string) : undefined;

            const result = await this.service.getLocations(searchText as string, parsedLimit);
            res.status(200).json(new BaseResponse(true, result, null, 'Locations fetched successfully'));
        } catch (error: any) {
            console.error('Error fetching locations:', error);
            res.status(500).json(new BaseResponse(false, null, ErrorCodes.SOMETHING_WENT_WRONG.toString(), 'Something went wrong'));
        }
    }

    async upsertLocation(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, link, searchBlob, description } = req.body;

            const updatedLocation = await this.service.upsertLocation(id, { name, link, searchBlob, description } as Omit<ILocation, '_id'>);
            res.status(200).json(new BaseResponse(true, updatedLocation, null, 'Location updated successfully'));
        } catch (error: any) {
            console.error('Error update location:', error);
            if (error.message === ErrorCodes.LOCATION_NOT_FOUND.toString()) {
                res.status(404).json(new BaseResponse(false, null, ErrorCodes.LOCATION_NOT_FOUND.toString(), 'Location not found'));
            } else if (error.message === ErrorCodes.INVALID_URL) {
                res.status(400).json(new BaseResponse(false, null, ErrorCodes.INVALID_URL.toString(), 'Invalid URL'));
            } else if (error.message === ErrorCodes.DUPLICATE_LINK) {
                res.status(409).json(new BaseResponse(false, null, ErrorCodes.DUPLICATE_LINK.toString(), 'Link already exists'));
            } else {
                res.status(500).json(new BaseResponse(false, null, ErrorCodes.SOMETHING_WENT_WRONG.toString(), 'Something went wrong'));
            }
        }
    }

    async deleteLocation(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const locationName = await this.service.deleteLocationById(id);
            res.status(200).json(new BaseResponse(true, null, null, `Location "${locationName}" is successfully deleted`));
        } catch (error: any) {
            console.error('Error delete location:', error);
            if (error.message === ErrorCodes.LOCATION_NOT_FOUND.toString()) {
                res.status(404).json(new BaseResponse(false, null, ErrorCodes.LOCATION_NOT_FOUND.toString(), 'Location not found'));
            } else {
                res.status(500).json(new BaseResponse(false, null, ErrorCodes.SOMETHING_WENT_WRONG.toString(), 'Failed to delete location'));
            }
        }
    }
}