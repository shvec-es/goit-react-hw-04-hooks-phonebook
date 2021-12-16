import { useState, useEffect } from 'react';
import { Wrapper, Title } from 'styles';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const currentContactList = JSON.parse(localStorage.getItem('contacts'));

    if (currentContactList) {
      setContacts(currentContactList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const addContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Wrapper>
      <div>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
      </div>
      {filteredContacts.length > 0 ? (
        <div>
          <Title>Contacts</Title>
          <Filter filter={filter} onChange={changeFilter} />
          <ContactList contacts={filteredContacts} onClick={deleteContact} />
        </div>
      ) : (
        <Title>You don't have contacts</Title>
      )}
    </Wrapper>
  );
}

export default App;
