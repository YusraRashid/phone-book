import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';

import './SearchBar.scss';

interface SearchBarProps {
    onSearch: (searchText: string) => void;
    onAddNewContact: () => void;
}

export function SearchBar(props: SearchBarProps) {
    return (
        <>
            <div className="search-toolbar">
                <h5>Search Phone Book</h5>
                <Button onClick={() => props.onAddNewContact()}>Add New Contact</Button>
            </div>

            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <FaSearch />
                </InputGroup.Text>
                <FormControl placeholder="Contact name" onChange={(e) => props.onSearch(e.target.value)} />
            </InputGroup>
        </>
    );
}
