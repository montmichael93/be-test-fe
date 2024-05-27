"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import { useContact } from "../../provider/contact.provider";

export default function Home() {
  const { createMessage } = useContact();
  const { users, messages } = useContact();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setContent("");
  };

  return (
    <>
      <br />
      <br />
      <Box bg="#111" p={10}>
        <Box>
          <SimpleGrid
            display={{
              base: "initial",
              md: "grid",
            }}
            columns={{
              md: 3,
            }}
            spacing={{
              md: 6,
            }}
          >
            <GridItem
              colSpan={{
                md: 1,
              }}
            >
              <Box px={[4, 0]}>
                <Heading
                  fontSize="lg"
                  fontWeight="md"
                  lineHeight="6"
                  color="gray.200"
                >
                  Users:
                </Heading>
                <Text mt={1} fontSize="sm" color="gray.400">
                  {users.slice(-2).map((user, index) => {
                    return (
                      <>
                        <br />
                        <div>
                          <p>{user.name}</p>
                          <p>{user.email}</p>
                        </div>
                        <br />
                      </>
                    );
                  })}
                </Text>
                <Heading
                  fontSize="lg"
                  fontWeight="md"
                  lineHeight="6"
                  color="gray.200"
                >
                  Messages:
                </Heading>

                <Text mt={1} fontSize="sm" color="gray.400">
                  {messages.slice(-2).map((message, index) => {
                    return (
                      <>
                        <br />
                        <div key={index}>
                          <p>{message.subject}</p>
                          <p>{message.content}</p>
                        </div>
                        <br />
                      </>
                    );
                  })}
                </Text>
              </Box>
            </GridItem>
            <GridItem
              mt={[5, null, 0]}
              colSpan={{
                md: 2,
              }}
            >
              <chakra.form
                method="POST"
                shadow="base"
                rounded={[null, "md"]}
                overflow={{
                  sm: "hidden",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const userInput = {
                    name,
                    email,
                  };
                  const messageInput = {
                    subject,
                    content,
                  };
                  createMessage(userInput, messageInput)
                    .then(() => {
                      reset();
                    })
                    .catch((e) => console.error(e));
                }}
              >
                <Stack
                  px={4}
                  py={5}
                  bg="w#141517"
                  spacing={6}
                  p={{
                    sm: 6,
                  }}
                >
                  <div>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="first_name"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.50s"
                      >
                        Name
                      </FormLabel>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        color="white"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 4]}>
                      <FormLabel
                        htmlFor="email_address"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.50"
                      >
                        Email address
                      </FormLabel>
                      <Input
                        type="text"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        color="white"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="first_name"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.50"
                      >
                        Subject
                      </FormLabel>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        color="white"
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl id="email" mt={1}>
                      <FormLabel fontSize="sm" fontWeight="md" color="gray.50">
                        About
                      </FormLabel>
                      <Textarea
                        placeholder="you@example.com"
                        mt={1}
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        color="white"
                        fontSize={{
                          sm: "sm",
                        }}
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                      />
                      <FormHelperText>
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <FormControl>
                    <Flex alignItems="center" mt={1}></Flex>
                  </FormControl>
                </Stack>
                <Box
                  px={{
                    base: 4,
                    sm: 6,
                  }}
                  py={3}
                  bg="#121212"
                  textAlign="right"
                >
                  <Button
                    type="submit"
                    value="submit"
                    colorScheme="brand"
                    _focus={{
                      shadow: "",
                    }}
                    fontWeight="md"
                  >
                    Save
                  </Button>
                </Box>
              </chakra.form>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
