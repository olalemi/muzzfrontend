import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
