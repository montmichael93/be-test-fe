import { z } from "zod";

export const messageType = z.object({
  id: z.number(),
  subject: z.string(),
  content: z.string(),
  senderId: z.number(),
});
export type MessageType = z.infer<typeof messageType>;

const messageWithoutSenderId = messageType.omit({
  id: true,
  senderId: true,
});

export type MessageDTO = z.infer<typeof messageWithoutSenderId>;
export const userType = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  message: messageWithoutSenderId,
});
export type UserType = z.infer<typeof userType>;

export const CreateContact = userType.omit({
  id: true,
  message: true,
});

export type UserInputDTO = z.infer<typeof CreateContact>;

const TotalRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  content: z.string(),
});

export type TotalDTO = z.infer<typeof TotalRequest>;
