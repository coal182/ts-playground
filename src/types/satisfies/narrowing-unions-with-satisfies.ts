/* eslint-disable @typescript-eslint/no-unused-vars */
interface Contact {
  phoneNumber: ContactData;
  email: ContactData;
}
type ContactData = number | `${string}@${string}`;

const phoneNumber: ContactData = 952010101;
//      ^?

const phoneNumberWithSatisfies = 952010101 satisfies ContactData;
//      ^?

const email: ContactData = 'coal182@email.com';
//      ^?

const emailWithSatisfies = 'coal182@email.com' satisfies ContactData;
//      ^?

const contact: Contact = {
  phoneNumber,
  email,
};

const contactEmail = contact.email; // Doesn't know if is an string or a number
//      ^?
const contactPhone = contact.phoneNumber; // Doesn't know if is an string or a number
//      ^?

const contactWithSatisfies = {
  phoneNumber: phoneNumberWithSatisfies,
  email: emailWithSatisfies,
} satisfies Contact;

const contactEmailSatisfies = contactWithSatisfies.email; // knows is an string and autocompletes with string methods
//      ^?
const contactPhoneSatisfies = contactWithSatisfies.phoneNumber; // knows is a number and autocompletes with number methods
//      ^?

const contactWithSatisfiesAndConst = {
  phoneNumber: phoneNumberWithSatisfies,
  email: emailWithSatisfies,
} as const satisfies Contact;

const contactEmailSatisfiesAndConst = contactWithSatisfiesAndConst.email; // knows is an string and autocompletes with string methods
//      ^?
const contactPhoneSatisfiesAndConst = contactWithSatisfiesAndConst.phoneNumber; // with as consts takes the exact number
//      ^?
