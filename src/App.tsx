import React from "react";
// import HomeScreen from "./screens/HomeScreen";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ChatScreen from "./screens/ChatScreen";

const customTheme = extendTheme({
  breakpoints: {
    base: "320px",
    sm: "500px",
    md: "1100px"
  },

  fonts: {
    body: "Plus Jakarta Sans, sans-serif",
    heading: "Plus Jakarta Sans, sans-serif"
  }
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <ChatScreen/>
    </ChakraProvider>
  );
}

export default App;
