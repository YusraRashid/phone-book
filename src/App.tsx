import { useState, useEffect } from 'react';

import { Contact } from './interfaces';
import { SearchBar } from './components/search-bar/SearchBar';
import { ContactList } from './components/contact-list/ContactList';
import { AddContactForm } from './components/add-contact-form/AddContactForm';

import './App.scss';

// --------------------------------------------------------------------------------
// Just for testing, can remove all of this
// --------------------------------------------------------------------------------
const DEFAULT_CONTACTS: Contact[] = [
    {
        id: 1,
        name: 'Jovani Kulas',
        phoneNumber: '1-651-894-8389',
    },
    {
        id: 2,
        name: 'Dr. Woodrow Cronin',
        phoneNumber: '(609) 428-7458 x918',
    },
    {
        id: 3,
        name: 'Ella Kreiger Sr.',
        phoneNumber: '988.595.1384',
    },
    {
        id: 4,
        name: 'Alanis Dibbert',
        phoneNumber: '1-574-481-5319',
    },
    {
        id: 5,
        name: 'Milo Homenick',
        phoneNumber: '344.375.6487',
    },
];

let DEMO_CONTACTS: Contact[] = [];

const storageContacts = localStorage.getItem('contactList');

if (!storageContacts) {
    localStorage.setItem('contactList', JSON.stringify(DEFAULT_CONTACTS));
    DEMO_CONTACTS = DEFAULT_CONTACTS;
} else {
    DEMO_CONTACTS = JSON.parse(storageContacts);
}

// --------------------------------------------------------------------------------

function App() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [contacts, setContacts] = useState<Contact[]>(DEMO_CONTACTS);
    const [addingContact, setAddingContact] = useState<boolean>(false);

    // Can remove if you want, was just for testing
    useEffect(() => {
        localStorage.setItem('contactList', JSON.stringify(contacts));
    }, [contacts]);

    const removeContactById = (contactId: number) => {
        const newContactList = contacts.filter((contact) => contact.id !== contactId);
        setContacts(newContactList);
    };

    const updateContact = (updatedContact: Contact) => {
        const updatedContactList = contacts.map((contact) => {
            if (contact.id === updatedContact.id) {
                return updatedContact;
            }

            return contact;
        });

        setContacts(updatedContactList);
    };

    const addNewContact = (partialContact: Contact) => {
        let newContactId = 1;

        if (contacts.length > 0) {
            newContactId = [...contacts].sort((a, b) => a.id - b.id)[contacts.length - 1].id + 1;
        }

        const newContact: Contact = {
            ...partialContact,
            id: newContactId,
        };

        const updatedContactList = [
            ...contacts,
            newContact,
        ];

        setContacts(updatedContactList);
        setAddingContact(false);
    };

    return (
        <div className="App">
            <h1 className="header">Phone Book</h1>

            {addingContact ? (
                <AddContactForm
                    onSaveContact={(contact) => {
                        addNewContact(contact);
                    }}
                    onCancel={() => {
                        setAddingContact(false);
                    }}
                />
            ) : (
                <>
                    <SearchBar
                        onSearch={(searchValue) => {
                            setSearchValue(searchValue);
                        }}
                        onAddNewContact={() => {
                            setAddingContact(true);
                        }}
                    />

                    <ContactList
                        contacts={contacts}
                        searchValue={searchValue}
                        onUpdateContact={(contact) => {
                            updateContact(contact);
                        }}
                        onDeleteContact={(contact) => {
                            removeContactById(contact.id);
                        }}
                    />
                </>
            )}

        </div>
    );
}

export default App;
