import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Container/Container.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    if (localStorage.getItem('contacts') !== null) {
      return JSON.parse(localStorage.getItem('contacts'));
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const makeContact = (name, number) => {
    return { id: nanoid(), name, number };
  };

  const checkContact = value => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === value.toLowerCase()
    );
    return isInContacts;
  };

  const addContact = (name, number) => {
    if (checkContact(name)) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prevState => [makeContact(name, number), ...prevState]);
  };

  const handleDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value.toLowerCase());
  };

  const visibleContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={changeFilter} />
      <ContactList onDelete={handleDelete} contacts={visibleContacts} />
    </Layout>
  );
};
