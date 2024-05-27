import { UserInputDTO } from "./inputTypes";

const baseUrl = "https://be-testing-be.vercel.app/";

const getAllUsers = () =>
  fetch(`${baseUrl}/users`).then((response) => response.json());
//.then(z.array(userType).parse);

const getAllMessages = () =>
  fetch(`${baseUrl}/messages`).then((response) => response.json());
//.then(z.array(messageType).parse);

const createMessage = async (input: UserInputDTO) => {
  try {
    const response = await fetch(`${baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Failed to create message: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating message:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

export const Requests = {
  getAllUsers,
  getAllMessages,
  createMessage,
};
