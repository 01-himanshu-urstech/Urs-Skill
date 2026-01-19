import { Contact } from './contact.model.js';
import APIError from '../../utils/apiError.js';

class ContactService {

  async createContact(data) {
    const contact = await Contact.create(data);
    return contact;
  }

  async getAllContacts() {
    return Contact.find().sort({ createdAt: -1 });
  }

  async updateStatus(contactId, status) {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw APIError.notFound('Contact not found');
    }

    contact.status = status;
    await contact.save();
    return contact;
  }
}

export default new ContactService();
