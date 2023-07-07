// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";
const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join("db", "contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  try {
    // Read JSON========================================
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
};
// listContacts();

const getContactById = async (contactId) => {
  try {
    // Read JSON========================================
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    //Contact search by id
    const contactFound = contacts.find((contact) => contact.id === contactId);
    //Checking contactFound
    if (!contactFound) {
      console.log("No such contact found");
      return;
    }
    console.table(contactFound);
  } catch (error) {
    console.log(error);
  }
};

// getContactById("e6ywwRe4jcqxXfCZOj_1e");

const removeContact = async (contactId) => {
  try {
    // Read JSON========================================
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    //Contact index search by id
    const index = contacts.findIndex((contact) => contact.id === contactId);
    //Checking if we have index
    if (index < 0) {
      console.log("No such contact found");
      return;
    }
    //Delete contact
    console.log("Contact Delete")
    console.table(contacts[index]);
    contacts.splice(index, 1);
    //Overwrite file contacts.json
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
};

// removeContact("rsKkOQUi80UsgVPCcLZZW");

const addContact = async (name, email, phone) => {
  try {
    // Read JSON========================================
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    //Search contact name
    const nameFilter = contacts.find((contact) => contact.name === name);
    //Checking if we have similar name
    if (nameFilter) {
      console.log("You have such a contact");
      return;
    }
    //Add contact    
    const newContact = { id: nanoid(), name, email, phone };
    console.log(newContact);
    contacts.push(newContact);     
    
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
};

// addContact("Mango", "mango@gmail.com", "322-22-22");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};