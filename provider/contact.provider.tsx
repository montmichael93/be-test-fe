"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { MessageDTO, UserInputDTO, UserType } from "../utils/inputTypes";
import { Requests } from "../utils/requests";

type ContactProviderType = {
  users: UserInputDTO[];
  messages: MessageDTO[];
  createMessage: (input: UserInputDTO, message: MessageDTO) => Promise<unknown>;
};

const ContactContext = createContext<ContactProviderType>(
  {} as ContactProviderType
);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserInputDTO[] | []>([]);
  const [messages, setMessages] = useState<MessageDTO[] | []>([]);

  useEffect(() => {
    Requests.getAllUsers().then(setUsers);
    Requests.getAllMessages().then(setMessages);
  }, []);

  const createMessage = (input: UserInputDTO, message: MessageDTO) => {
    const name = input.name;
    const email = input.email;
    const subject = message.subject;
    const content = message.content;

    const newUserMessage = [...messages, { subject, content }];
    const userInput = [...users, { name, email }];
    const requestObject = { name, email, subject, content };

    setMessages(newUserMessage);
    setUsers(userInput);
    console.log(input);
    console.log(messages);
    console.log(users);

    return Requests.createMessage(requestObject)

      .then((message) => {
        setMessages([...messages, message]);
        return users;
      })
      .then((users) => {
        const unUpdatedUserList = users.map((user) => {
          return {
            name: user.name,
            email: user.email,
          };
        });

        setUsers([...users, unUpdatedUserList[0] as UserType]);
      })
      .catch(() => {
        setMessages(messages);
        throw new Error("could not send message");
      });
  };

  return (
    <ContactContext.Provider value={{ users, messages, createMessage }}>
      <ChakraProvider>{children}</ChakraProvider>
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const contentContext = useContext(ContactContext);
  if (contentContext === null) {
    throw new Error(
      "please use contact context within the bounds of contact Provider"
    );
  }
  return contentContext;
};
