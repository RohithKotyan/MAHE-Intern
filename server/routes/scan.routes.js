import { Router } from 'express';
import { createScan, getMyScans, getScanById, deleteScan } from '../controllers/scan.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = Router();

router.use(protect);
router.post('/', uploadSingle, createScan);
router.get('/', getMyScans);
router.get('/:id', getScanById);
router.delete('/:id', deleteScan);

export default router;
