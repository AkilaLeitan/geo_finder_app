import { Router } from 'express';
import { getLocations } from '../controllers/location-controller';

const router = Router();

router.get('/locations', getLocations);

export default router;