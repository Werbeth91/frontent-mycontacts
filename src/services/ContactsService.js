import HttpClient from './utils/HttpClient'

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient(`http://localhost:3001`)
  }

  async listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?oderBy=${orderBy}`)
  }

}


export default new ContactsService();