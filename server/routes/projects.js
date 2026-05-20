import express from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);

// Protected routes (admin only)
router.post('/', authenticate, authorize(['admin']), createProject);
router.put('/:id', authenticate, authorize(['admin']), updateProject);
router.delete('/:id', authenticate, authorize(['admin']), deleteProject);

export default router;
