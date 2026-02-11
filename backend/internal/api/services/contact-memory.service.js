// In-memory storage for when MongoDB is not available
let contacts = [];
let contactIdCounter = 1;

const { logger } = require('../../common/logger');

class InMemoryContactService {
  async createContact(contactData) {
    try {
      const contact = {
        _id: contactIdCounter++,
        ...contactData,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      contacts.push(contact);
      
      logger.info('New contact submission created (in-memory)', { 
        contactId: contact._id, 
        email: contact.email,
        service: contact.service 
      });
      
      return contact;
    } catch (error) {
      logger.error('Error creating contact submission (in-memory)', { error: error.message, data: contactData });
      throw error;
    }
  }

  async getAllContacts({ page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' }) {
    try {
      let filteredContacts = [...contacts];
      
      if (status) {
        filteredContacts = filteredContacts.filter(contact => contact.status === status);
      }

      // Sort
      filteredContacts.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (sortOrder === 'desc') {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
          return 0;
        } else {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
          return 0;
        }
      });

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

      return {
        contacts: paginatedContacts,
        pagination: {
          total: filteredContacts.length,
          page,
          limit,
          pages: Math.ceil(filteredContacts.length / limit)
        }
      };
    } catch (error) {
      logger.error('Error fetching contacts (in-memory)', { error: error.message });
      throw error;
    }
  }

  async getContactById(contactId) {
    try {
      const contact = contacts.find(c => c._id == contactId);
      if (!contact) {
        throw new Error('Contact not found');
      }
      return contact;
    } catch (error) {
      logger.error('Error fetching contact by ID (in-memory)', { contactId, error: error.message });
      throw error;
    }
  }

  async updateContactStatus(contactId, status) {
    try {
      const contactIndex = contacts.findIndex(c => c._id == contactId);
      
      if (contactIndex === -1) {
        throw new Error('Contact not found');
      }

      contacts[contactIndex].status = status;
      contacts[contactIndex].updatedAt = new Date();

      logger.info('Contact status updated (in-memory)', { contactId, status });
      return contacts[contactIndex];
    } catch (error) {
      logger.error('Error updating contact status (in-memory)', { contactId, status, error: error.message });
      throw error;
    }
  }

  async deleteContact(contactId) {
    try {
      const contactIndex = contacts.findIndex(c => c._id == contactId);
      
      if (contactIndex === -1) {
        throw new Error('Contact not found');
      }

      const deletedContact = contacts.splice(contactIndex, 1)[0];

      logger.info('Contact deleted (in-memory)', { contactId });
      return { message: 'Contact deleted successfully' };
    } catch (error) {
      logger.error('Error deleting contact (in-memory)', { contactId, error: error.message });
      throw error;
    }
  }

  async getContactStatistics() {
    try {
      const stats = contacts.reduce((acc, contact) => {
        acc[contact.status] = (acc[contact.status] || 0) + 1;
        return acc;
      }, {});

      const totalContacts = contacts.length;
      const recentContacts = contacts.filter(contact => {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return new Date(contact.createdAt) >= sevenDaysAgo;
      }).length;

      return {
        total: totalContacts,
        recent: recentContacts,
        pending: stats.pending || 0,
        read: stats.read || 0,
        responded: stats.responded || 0
      };
    } catch (error) {
      logger.error('Error fetching contact statistics (in-memory)', { error: error.message });
      throw error;
    }
  }
}

module.exports = new InMemoryContactService();
