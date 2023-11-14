import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { Send as SendIcon } from "@mui/icons-material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Socket } from "socket.io-client";
import {
  IRoomMessage,
  IUserMessage,
} from "../interfaces/RoomMessages/IRoomMessages";
import { IUser } from "../interfaces/User/IUser";
import RoomMessageService from "../api/RoomMessageService";

type Props = {
  socket: Socket | undefined;
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
    async function fetchRoomMessages() {
      const roomMessages = await RoomMessageService.getRoomMessages(roomId);
      if (roomMessages && roomMessages.length > 0) {
        setAllMessages(roomMessages);
      }
    }
    fetchRoomMessages();
  }, [roomId,messageInput]);

  useEffect(() => {
    if (messagesRef.current && socket) {
      socket.emit("getAllUsers", {});
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages, socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("sendRoomMessageResponse", (data: any) => {
      if (data) {
        appendMessage(data.roomMessage);
      }
    });
  }, [socket, appendMessage, allMessages]);

  
    async function handleSendMessage() {
      if (messageInput.trim() !== "") {
        socket?.emit("sendRoomMessage", {
          roomMessage: {
            userId: currentUser._id,
            userName: currentUser.userName,
            message: messageInput,
          },
          roomId: roomId,
        });

        const userMessageToBeSent: IUserMessage = {
          userId: currentUser._id!,
          userName: currentUser.userName,
          message: messageInput,
          messageTime: Date.now(),
        };

        const roomMessage: IRoomMessage = {
          roomId: roomId,
          messages: [userMessageToBeSent],
        };

        await RoomMessageService.createOrUpdateRoomMessage(roomMessage);
        setMessageInput("");
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    };




  const formatMessageDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const shouldDisplayTimestamp = (index: number) => {
    if (index === 0) return true;
    const currentMessage = allMessages[index];
    const previousMessage = allMessages[index - 1];
    return currentMessage.messageTime! - previousMessage.messageTime! > 3600000;
  };

  const shouldGroupMessages = (
    currentMessage: IUserMessage,
    previousMessage?: IUserMessage,
  ) => {
    if (!previousMessage) return false;
    return (
      currentMessage.userId === previousMessage.userId &&
      currentMessage.messageTime! - previousMessage.messageTime! <= 20000
    );
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
        overflow="auto"
        mb={{ base: "10px", md: "0px" }}
        maxHeight={{ base: "610px", md: "517px", lg: "650px" }}
        p={{ base: "10px", md: "20px" }}
      >
        <ScrollToBottom>
          {allMessages.map((am, index) => {
            const previousMessage =
              index > 0 ? allMessages[index - 1] : undefined;
            const groupMessages = shouldGroupMessages(am, previousMessage);

            return (
              <Box>
                {shouldDisplayTimestamp(index) && (
                  <Text
                    textAlign="center"
                    color="#A0AEC0"
                    mb={2}
                    key={`timestamp-${index}`}
                  >
                    {formatMessageDate(am.messageTime!)}
                  </Text>
                )}

                <Text
                  fontSize={{ base: "15px", md: "20px" }}
                  mb={groupMessages ? 0.5 : 3}
                  width={{
                    base: `${Math.min(75, 20 + am.message.trim().length)}%`,
                    md: `${Math.min(30, 1 + am.message.trim().length)}%`,
                  }}
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
                >
                  {am.message.trim()}
                </Text>
              </Box>
            );
          })}
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
