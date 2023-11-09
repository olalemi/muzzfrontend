import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomService from "../api/RoomService";
import { IRoom } from "../interfaces/Room/IRoom";
import {
  Box,
  Grid,
  GridItem,
  Center,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";

const ChooseARoomScreen = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Fetch the room data here and set it in the state
        const data = await RoomService.getRooms();

        if (!data) {
          return;
        }
        setAllRooms(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    async function getAllRooms() {
      const rooms = await RoomService.getRooms();
      if (!rooms) {
        return;
      }
      setAllRooms(rooms);
    }

    getAllRooms();
  }, []);

  function handleJoinRoom(roomId: string) {
    navigate(`/chat/${roomId}`);
  }

  function handleGoBackToCreateARoom() {
    navigate(`/create-a-room`);
  }

  async function handleDeleteRoom(roomId: string) {
    const res = await RoomService.deleteRoom(roomId);
    if (res === 200) {
    }
    setAllRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
  }

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
    <Box>
      {allRooms.length < 1 ? (
        <Flex
          direction={{ base: "column" }}
          justifyContent={{ base: "center" }}
          alignContent="center"
          mt="300px"
          gap="10px"
        >
          <Box mt="2px">
            <Text
              color="red"
              textAlign="center"
              fontSize={{ base: "20px", md: "24px" }}
              fontWeight={700}
            >
              Sorry the room is empty!
            </Text>
          </Box>
          <Box margin="auto" maxW="400px">
            <Button
              onClick={handleGoBackToCreateARoom}
              style={{
                backgroundColor: "#01BE6E",
                color: "#ffffff",
                fontSize: "16px",
                borderRadius: "10px",
                width: "100%",
                height: "45px",
                padding: "0px 50px",
                marginTop: "50px",
              }}
            >
              Click here to create a new room
            </Button>
          </Box>
        </Flex>
      ) : (
        <Box>
          <Box
            backgroundColor="#F5F5F5"
            width="100%"
            backgroundSize="cover"
            minHeight={{ base: "100vh", md: "100vh" }}
          >
            <Box>
              <Text
                color="#000"
                textAlign="center"
                fontSize={{ base: "18px", md: "24px" }}
                fontWeight={600}
                pt="50px"
              >
                CLICK AND JOIN A ROOM BELOW
              </Text>
            </Box>
            <Center style={{ marginTop: 50, padding: "0px 30px 30px 30px" }}>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                }}
                gap={{ base: "10px", md: "20px" }}
              >
                {allRooms.map((ar, i) => (
                  <GridItem
                    key={i}
                    style={{
                      textAlign: "center",
                      border: "1px solid #000",
                      backgroundColor: "pink",
                      padding: "10px",
                      color: "#000",
                      borderRadius: "5px",
                    }}
                  >
                    <Flex
                      borderRadius="5px"
                      direction={{ base: "column", md: "row" }}
                      justifyContent={{ base: "center", md: "space-around" }}
                      alignContent="center"
                      gap="5px"
                    >
                      <Box
                        border="1px solid #000"
                        backgroundColor="pink"
                        padding="10px"
                        borderRadius="5px"
                        onClick={() => handleJoinRoom(ar._id!)}
                        _hover={{
                          backgroundColor: "#8C9C8E",
                        }}
                      >
                        {ar.name}
                      </Box>
                      <Box
                        cursor="pointer"
                        onClick={() => handleDeleteRoom(ar._id!)}
                        mt={{ base: "10px" }}
                      >
                        <DeleteIcon />
                      </Box>
                    </Flex>
                  </GridItem>
                ))}
              </Grid>
            </Center>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChooseARoomScreen;
