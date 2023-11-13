import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserService from "../api/UserService";
import { IUser } from "../interfaces/User/IUser";
import { UserContext } from "../utility/UserProvider";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const { setCurrentUser, socket } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function fetchAllUsers() {
      const users = await UserService.getUsers();

      if (users && users.length > 0) {
        setUsers(users);
      }
    }

    fetchAllUsers();
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit("getAllUsers", {});
    socket.on("allUsersResponse", (data: any) => {
      if (data) {
        setAllUsers(data);
      }
    });
  }, [socket]);

  async function handleLoginAsync(userId: string) {
    localStorage.setItem("userId", JSON.stringify(userId));
    const currentUser = await UserService.getCurrentUser(userId);

    if (currentUser) {
      setCurrentUser(currentUser);
    }

    navigate("/create-a-room");
  }

  function disableRoomUser(userId: string) {
    const findUserInRoom = allUsers.find((user) => user._id === userId);

    if (findUserInRoom) {
      return true;
    }

    return false;
  }

  return (
    <Box p="30px">
      <Flex
        direction={{ base: "column" }}
        justifyContent={{ base: "center" }}
        alignContent="center"
        mt="200px"
        gap="10px"
        borderRadius="10px"
      >
        <Box
          border="1px solid #818181"
          p={{ base: "20px", md: "20px" }}
          margin="auto"
          borderRadius="10px"
        >
          <Box>
            <Text
              color="#fb406c"
              textAlign="center"
              fontSize={{ base: "24px", md: "24px" }}
              fontWeight={600}
              p="10px"
            >
              Welcome to Muzz Chat
            </Text>
          </Box>

          <Flex
            direction={{ base: "column" }}
            justifyContent={{ base: "center" }}
            alignContent="center"
            gap="10px"
            margin=" 0 auto"
          >
            <Box mt="20px" maxW="400px">
              {users.map((user, i) => (
                <Button
                  key={i}
                  isDisabled={disableRoomUser(user._id!)}
                  onClick={async () => await handleLoginAsync(user._id!)}
                  type="submit"
                  style={{
                    backgroundColor: "#01BE6E",
                    color: "#ffffff",
                    fontSize: "16px",
                    borderRadius: "10px",
                    width: "100%",
                    height: "45px",
                    padding: "0px 50px",
                    marginTop: "10px",
                  }}
                >
                  Login as {user.userName}
                </Button>
              ))}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeScreen;
