const { uid } = require('uid');
const { v4 } = require('uuid');

const fs = require('fs').promises;

const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);
    const contact = parsedContacts.find(item => item.id === contactId);
    console.log(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const parsedContacts = JSON.parse(contacts);

    const contactIdx = parsedContacts.findIndex(item => item.id === contactId.toString());
    if (!contactIdx) {
      return console.log('nnnnnnnnnnnn');
    }
    if (contactIdx === -1) {
      return null;
    }
    // console.log(contactIdx);

    // const [removeContact] = parsedContacts.splice(contactIdx, 1);
    const contactsAfterRemove = parsedContacts.filter(
      contact => contact.id !== contactId.toString()
    );

    console.log(contactsAfterRemove);

    await fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove), 'utf-8');
    // return removeContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  if (!name) return console.warn('Name is required!');
  if (!email) return console.warn('Email is required!');
  if (!phone) return console.warn('Phone is required!');

  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    let parsedContacts = JSON.parse(contacts);

    const nextId = Math.max(...parsedContacts.map(contact => parseInt(contact.id))) + 1;

    // const newContact = {
    //   id: nextId.toString(),
    //   name,
    //   email,
    //   phone,
    // };
    // console.log(newContact.name);
    // if (newContact.name === parsedContacts.name) {
    //   return null;
    // }
    const resultContactsData = [...parsedContacts, { id: nextId.toString(), name, email, phone }];
    // parsedContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(resultContactsData), 'utf8');
    console.log(newContact);
    console.log(parsedContacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
