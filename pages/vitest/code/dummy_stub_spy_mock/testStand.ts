export interface Message {
  subject: string;
  body: string;
}

export interface Recipient {
  email: string;
  name: string;
}

export const sendEmail = (message: Message, rec: Recipient) => {
  console.log(message.body);
  console.log(message.subject);
}