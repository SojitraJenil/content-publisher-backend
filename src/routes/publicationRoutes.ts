import express from 'express';
import { getPublications, createPublication, updatePublication, deletePublication } from '../controllers/publicationController';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

router.use(protect);
router.get('/', getPublications);
router.post('/', createPublication);
router.put('/:id', updatePublication);
router.delete('/:id', deletePublication);

export default router;
