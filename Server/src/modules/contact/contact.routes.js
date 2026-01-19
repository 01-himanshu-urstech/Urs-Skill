import express from 'express';
import ContactController from './contact.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

/* PUBLIC */
router.post('/', ContactController.createContact);



/* ADMIN */
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
  ContactController.getAllContacts
);

/* ADMIN - Get contact by ID */
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
  ContactController.getContactById
);


router.patch(
  '/:id/status',
  authMiddleware,
  roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
  ContactController.updateContactStatus
);

export default (app) => {
  app.use('/api/v1/contacts', router);
};
