import express from 'express';
import { submitContact, getContacts, markAsRead, deleteContact } from '../controllers/contactController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Protected routes (admin only)
router.get('/', authenticate, authorize(['admin']), getContacts);
router.patch('/:id/read', authenticate, authorize(['admin']), markAsRead);
router.delete('/:id', authenticate, authorize(['admin']), deleteContact);

export default router;
