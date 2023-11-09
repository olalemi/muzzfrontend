import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import ChooseARoomScreen from "./screens/ChooseARoomScreen";
import CreateARoomScreen from "./screens/CreateARoomScreen";
import UserProvider from "./utility/UserProvider";

const customTheme = extendTheme({
  breakpoints: {
    base: "320px",
    sm: "700px",
    md: "1200px",
    lg: "1500px",
  },

  fonts: {
    body: "Plus Jakarta Sans, sans-serif",
    heading: "Plus Jakarta Sans, sans-serif",
  },
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/chat/:roomId" element={<ChatScreen />} />
            <Route path="/choose-a-room" element={<ChooseARoomScreen />} />
            <Route path="/create-a-room" element={<CreateARoomScreen />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
