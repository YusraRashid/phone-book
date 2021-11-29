import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import { Contact } from '../../interfaces';

import { ContactRow } from '../contact-row/ContactRow';

import './ContactList.scss';

interface ContactListProps {
    contacts: Contact[];
    searchValue: string;
    onUpdateContact: (contact: Contact) => void;
    onDeleteContact: (contact: Contact) => void;
}

export function ContactList(props: ContactListProps) {
    const [contactList, setContactList] = useState<Contact[]>([]);
    const [editContactId, setEditContactId] = useState<number | null>(null);

    useEffect(() => {
        if (props.searchValue) {
            const filteredContacts = props.contacts.filter((contact) => {
                const searchValue = props.searchValue.toLowerCase();
                const contactName = contact.name.toLowerCase();

                return contactName.includes(searchValue);
            });

            setContactList(filteredContacts);
        } else {
            setContactList(props.contacts);
        }
    }, [props.searchValue, props.contacts]);

    useEffect(() => {
        setEditContactId(null);
    }, [props.contacts]);

    const renderContactRow = (contact: Contact) => {
        const isEditing = contact.id === editContactId;

        return (
            <ContactRow
                key={contact.id}
                contact={contact}
                editing={isEditing}
                onDelete={(contact) => {
                    props.onDeleteContact(contact);
                }}
                onUpdate={(contact) => {
                    props.onUpdateContact(contact);
                }}
                onStartEdit={(contact) => {
                    setEditContactId(contact.id);
                }}
                onCancelEdit={(contact) => {
                    setEditContactId(null);
                }}
            />
        )
    };

    const renderNoResults = () => {
        if (contactList.length === 0) {
            return (
                <tr>
                    <td colSpan={4}>
                        No contacts matching "{props.searchValue}"
                    </td>
                </tr>
            );
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="header-contact-id">#</th>
                    <th className="header-contact-name">Name</th>
                    <th className="header-contact-number">Phone Number</th>
                    <th className="header-contact-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                {contactList.map(renderContactRow)}
                {renderNoResults()}
            </tbody>
        </Table>
    );
}
