import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Contact } from '../../interfaces';

interface AddContactFormProps {
    onSaveContact: (contact: Contact) => void;
    onCancel: () => void;
}

export function AddContactForm(props: AddContactFormProps) {
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const onSaveContact = () => {
        const contact: Contact = {
            id: 0,
            name,
            phoneNumber,
        };

        if (name?.length > 0 && phoneNumber?.length > 0) {
            props.onSaveContact(contact);
        }
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>

            <Button variant={'primary'} onClick={() => onSaveContact()}>Save</Button>
            &nbsp;
            <Button variant={'secondary'} onClick={() => props.onCancel()}>Cancel</Button>
        </Form>
    );
}
