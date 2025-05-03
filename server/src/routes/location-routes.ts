import { Router } from 'express';
import { LocationController } from '../controllers/location-controller';

const router = Router();
const controller = new LocationController();

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test endpoint is working' });
});

router.post('/location', (req, res) => controller.addLocation(req, res));
router.get('/locations', (req, res) => controller.getAllLocations(req, res));
router.get('/location/:id', (req, res) => controller.getLocationById(req, res));
router.get('/locations/search', (req, res) => controller.findLocationsByString(req, res));
router.put('/location/:id', (req, res) => controller.upsertLocation(req, res));
router.delete('/location/:id', (req, res) => controller.deleteLocation(req, res));

export default router;