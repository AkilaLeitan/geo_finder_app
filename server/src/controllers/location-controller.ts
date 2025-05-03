import { Request, Response } from 'express';

export const getLocations = (req: Request, res: Response): void => {
    res.json({ message: 'Locations retrieved successfully!' });
};