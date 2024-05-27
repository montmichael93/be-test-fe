"use client";

import { ChakraProvider } from "@chakra-ui/react";

export function TheChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
