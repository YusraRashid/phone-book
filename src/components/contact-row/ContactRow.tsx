import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

import { Contact } from '../../interfaces';

interface ContactListProps {
    contact: Contact;
    editing: boolean;
    onUpdate: (contact: Contact) => void;
    onDelete: (contact: Contact) => void;
    onStartEdit: (contact: Contact) => void;
    onCancelEdit: (contact: Contact) => void;
}

export function ContactRow(props: ContactListProps) {
    const [name, setName] = useState<Contact['name']>('');
    const [phoneNumber, setPhoneNumber] = useState<Contact['phoneNumber']>('');

    useEffect(() => {
        setName(props.contact.name);
        setPhoneNumber(props.contact.phoneNumber);
    }, [props.contact, props.editing])

    const onCancelEdit = () => {
        setName(props.contact.name);
        setPhoneNumber(props.contact.phoneNumber);

        props.onCancelEdit(props.contact);
    };

    const onSaveContact = () => {
        const updatedContact: Contact = {
            ...props.contact,
            name,
            phoneNumber,
        };

        props.onUpdate(updatedContact);
    };

    const renderDisplayRow = (contact: Contact) => {
        return (
            <tr>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.phoneNumber}</td>
                <td className="action-cell">
                    <Button variant={'secondary'} size="sm" onClick={() => props.onStartEdit(contact)}>
                        <FaEdit /> Edit
                    </Button>

                    <Button variant={'danger'} size={'sm'} onClick={() => props.onDelete(contact)}>
                        <FaTrash /> Delete
                    </Button>
                </td>
            </tr>
        );
    };

    const renderEditRow = (contact: Contact) => {
        return (
            <tr>
                <td>{contact.id}</td>
                <td>
                    <FormControl value={name} onChange={(e) => setName(e.target.value)} />
                </td>
                <td>
                    <FormControl value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </td>
                <td className="action-cell">
                    <Button variant={'primary'} size={'sm'} onClick={() => onSaveContact()}>
                        <FaCheck /> Save
                    </Button>

                    <Button variant={'outline'} size="sm" onClick={() => onCancelEdit()}>
                        <FaTrash /> Cancel
                    </Button>
                </td>
            </tr>
        );
    }

    if (props.editing) {
        return renderEditRow(props.contact);
    } else {
        return renderDisplayRow(props.contact);
    }
}
