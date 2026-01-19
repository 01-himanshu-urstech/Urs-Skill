import ContactService from './contact.service.js';
import { createContactSchema } from './contact.validation.js';

class ContactController {

  async createContact(req, res, next) {
    try {
      const { error, value } = createContactSchema.validate(req.body);
      if (error) return next(error);

      const contact = await ContactService.createContact(value);

      res.status(201).json({
        success: true,
        message: 'Contact request submitted successfully',
        data: contact
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllContacts(req, res, next) {
    try {
      const contacts = await ContactService.getAllContacts();

      res.json({
        success: true,
        data: contacts
      });
    } catch (err) {
      next(err);
    }
  }

  async updateContactStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await ContactService.updateStatus(id, status);

      res.json({
        success: true,
        message: 'Contact status updated',
        data: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ContactController();
