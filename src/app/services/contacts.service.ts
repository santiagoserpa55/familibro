import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/tecnologias';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get<Contact[]>('http://localhost:8080/data');
  }

  createContact(newContact: Contact) {
    return this.http.post<Contact>('https://localhost:7271/Contacts/CreateContact', newContact);
  }

  updateContact(updateContact: Contact) {
    return this.http.put<Contact>('https://localhost:7271/Contacts/UpdateContact', updateContact);
  }

  deleteContact(id: string) {
    let urlString: string = 'https://localhost:7271/Contacts/DeleteContact/' + id;
    return this.http.delete(urlString);
  }
}
