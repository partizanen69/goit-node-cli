import { program } from 'commander';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from './contacts.js';
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case 'get':
      if (!id) {
        console.error('id is not defined');
        return;
      }
      console.log(await getContactById(id));
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.error('Either name or email or phone is not defined');
        return;
      }
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      if (!id) {
        console.error('id is not defined');
        return;
      }

      console.log(await removeContact(id));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
