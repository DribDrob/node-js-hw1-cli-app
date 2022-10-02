const contacts = require("./contacts");

// const { Command } = require("commander");
// const program = new Command();

const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      console.table(listContacts);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      console.log(addedContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "3" });
// invokeAction({
//   action: "add",
//   name: "Lucas Drago",
//   email: "mail@gmail.com",
//   phone: "(044) 206-2688",
// });
// invokeAction({ action: "remove", id: "cdf8446d-f0fa-4454-be1d-fa36b32c807b" });
invokeAction(argv);
