import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { Send as SendIcon } from "@mui/icons-material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import { Socket } from "socket.io-client";
import { IUserMessage } from "../interfaces/RoomMessages/IRoomMessages";
import { IUser } from "../interfaces/User/IUser";

type Props = {
  socket: Socket;
  currentUser: IUser;
  roomId: string;
};

const ChatBox = (props: Props) => {
  const { currentUser, roomId, socket } = props;
  const [messageInput, setMessageInput] = useState<string>("");
  const [allMessages, setAllMessages] = useState<IUserMessage[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const appendMessage = useCallback(
    (message: IUserMessage) => {
      setAllMessages((prevMessages) => [...prevMessages, message]);
    },
    [setAllMessages],
  );

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("sendRoomMessageResponse", (data: any) => {
      if (data) {
        console.log("Received message data:", data);
        appendMessage(data.roomMessage);
      }
    });
  }, [socket, appendMessage]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("sendRoomMessage", {
        roomMessage: {
          userId: currentUser._id,
          userName: currentUser.userName,
          message: messageInput,
        },
        roomId: roomId,
      });

      setMessageInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bg="#fff"
      p={{ base: "10px" }}
    >
      <Box
        overflowY="auto"
        mb="10px"
        maxHeight={{ base: "610px", md: "517px" }}
      >
        <ScrollToBottom>
          {allMessages.map((am, index) => (
            <Text
              fontSize="20px"
              width={`${Math.min(75, 20 + am.message.length)}%`}
              justifyContent="center"
              marginLeft={am.userId === currentUser._id! ? "auto" : "0px"}
              textAlign="left"
              color={am.userId === currentUser._id! ? "white" : "#818181"}
              backgroundColor={
                am.userId === currentUser._id! ? "#fb406c" : "#F4F2F2"
              }
              borderRadius={
                am.userId === currentUser._id!
                  ? "10px 10px 0px 10px"
                  : "10px 10px 10px 0px"
              }
              p={{ base: "10px" }}
              key={index}
              mb={{ base: "10px", md: "10px" }}
              style={{ overflowWrap: "break-word" }}
            >
              {am.message}
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
