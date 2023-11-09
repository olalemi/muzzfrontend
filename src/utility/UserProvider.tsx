import React, { createContext, useEffect, useState } from "react";
import UserService from "../api/UserService";
import { IUser } from "../interfaces/User/IUser";
import { Flex, Text } from "@chakra-ui/react";
import { getBaseUrlWithoutRoute } from "../api";
import { Socket, io } from "socket.io-client";

type Props = {
  children: React.ReactNode;
};

interface UserContextType {
  currentUser: IUser | undefined;
  socket: Socket | undefined;
  setCurrentUser: (user: IUser | undefined) => void;
}
export const UserContext = createContext<UserContextType>({
  currentUser: undefined,
  socket: undefined,
  setCurrentUser: () => {},
});
function UserProvider(props: Props) {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(getBaseUrlWithoutRoute());
    const getCurrentUser = async () => {
      const getUserId = localStorage.getItem("userId");

      const userId = JSON.parse(getUserId!);
      if (!userId || !socket) {
        setIsLoading(false);
        return;
      }
      const user = await UserService.getCurrentUser(userId);

     

      if (user && socket) {
        setSocket(socket);
        setCurrentUser(user);
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <Flex
        direction={{ base: "column" }}
        justifyContent={{ base: "center" }}
        alignContent="center"
      >
        <Text
          color="#000"
          textAlign="center"
          fontSize={{ base: "20px", md: "24px" }}
          fontWeight={700}
          mt="400px"
        >
          Loading...
        </Text>
      </Flex>
    );
  }

  return (
    <UserContext.Provider value={{ currentUser, socket, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
