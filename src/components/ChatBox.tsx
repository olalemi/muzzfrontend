import React, { useState, useEffect, useRef } from "react";
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { Send as SendIcon } from "@mui/icons-material";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      setMessages([...messages, messageInput]);
      setMessageInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Scroll to the bottom of the chat messages when new messages are added
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bg="#fff"
      padding="5px"
    >
      <Box overflow="scroll" mb="10px" maxHeight="625px">
        <ScrollToBottom>
          {messages.map((message, index) => (
            <Text
              fontSize="20px"
              maxWidth={`${Math.min(75, 20 + message.length * 2)}%`}
              justifyContent="right"
              marginLeft="auto"
              textAlign="left"
              color="#ffffff"
              backgroundColor="#fb406c"
              borderRadius="10px 10px 0px 10px"
              p="10px"
              key={index}
              mb="5px"
            >
              {message}
            </Text>
          ))}
          <Box ref={messagesRef}></Box>
        </ScrollToBottom>
      </Box>

      <Stack direction="row" mb="20px" p={2}>
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          borderRadius="50px"
          focusBorderColor="#fb406c"
          onKeyDown={handleKeyDown}
        />
        {messageInput.trim() !== "" && (
          <SendIcon
            style={{ cursor: "pointer", color: "#fb406c", marginTop: "7px" }}
            onClick={handleSendMessage}
          />
        )}
      </Stack>
    </Box>
  );
};

export default ChatBox;
