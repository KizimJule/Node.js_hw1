const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const invokeActions = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      listContacts();
      break;
    case 'getById':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;
    default:
      console.log('Unknown action!');
  }
};

invokeActions({ action: 'list' });
invokeActions({ action: 'getById', id: '4' });

// const newContact = {
//   name: 'Julia Kizim',
//   email: 'Kizim@mail.ru',
//   phone: '0506255408',
// };
invokeActions({ action: 'add', name: 'Julia Kizim', email: 'Kizim@mail.ru', phone: '0506255408' });
// removeContact(12);
