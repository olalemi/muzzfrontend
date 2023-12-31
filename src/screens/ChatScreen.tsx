import {
  Box,
  Center,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icon from "../assets/images/icon.svg";
import ChatBox from "../components/ChatBox";
import CustomModal from "../components/CustomModal";
import { UserContext } from "../utility/UserProvider";

const ChatScreen = () => {
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, socket } = useContext(UserContext);
  const { roomId } = useParams();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit("user", {
      _id: currentUser?._id,
      userName: currentUser?.userName,
      roomId: roomId,
    });

    return () => {
      socket.emit("getAllUsers", {});
      socket?.disconnect();
    };
  }, [socket, currentUser?._id, currentUser?.userName, roomId]);

  const handleProfileDisplay = () => {
    setDisplayProfile(!displayProfile);
  };

  return (
    <Box>
      <Box>
        <Flex
          direction={{ base: "row" }}
          justifyContent={{ base: "space-between" }}
          alignContent="center"
          mt="20px"
        >
          <Flex
            direction={{ base: "row" }}
            justifyContent={{ base: "center" }}
            alignContent="center"
            margin="auto"
            gap="5px"
          >
            <Box>
              <img src={icon} alt="Profile_Picture" />
            </Box>

            <Box>
              <Text
                color="#000"
                textAlign="center"
                fontSize={{ base: "18px", md: "20px" }}
                fontWeight={700}
                mt="7px"
              >
                {currentUser?.userName}
              </Text>
            </Box>
          </Flex>

          <Box>
            <MoreHorizIcon
              style={{
                cursor: "pointer",
                color: "#818181",
                marginTop: "7px ",
                fontSize: "50px",
                paddingRight: "10px",
              }}
              onClick={onOpen}
            />
          </Box>
        </Flex>

        <Flex
          direction={{ base: "row" }}
          justifyContent={{ base: "center" }}
          alignContent="center"
          gap="150px"
        >
          <Box
            onClick={() => setDisplayProfile(false)}
            style={{ position: "relative" }}
          >
            <Text
              color={displayProfile ? "#818181" : "#fb406c"}
              textAlign="center"
              fontSize={{ base: "20px", md: "40px" }}
              fontWeight={500}
              mb="10px"
            >
              Chat
            </Text>
          </Box>

          <Box onClick={handleProfileDisplay}>
            <Box>
              <Text
                color={displayProfile ? "#fb406c" : "#818181"}
                textAlign="center"
                fontSize={{ base: "20px", md: "40px" }}
                fontWeight={500}
                mb="10px"
              >
                Profile
              </Text>
            </Box>
          </Box>
        </Flex>
        <Flex>
          <Box
            borderBottom={
              displayProfile ? "4px solid #f5f5f5" : "4px solid #fb406c"
            }
            width="50%"
          />
          <Box
            borderBottom={
              displayProfile ? "4px solid #fb406c" : "4px solid #f5f5f5"
            }
            width="50%"
          />
        </Flex>
      </Box>

      <Box>
        {!displayProfile ? (
          <Box>
            <ChatBox
              socket={socket}
              currentUser={currentUser!}
              roomId={roomId!}
            />
          </Box>
        ) : (
          <Box mt="200px">
            <Center>
              <VStack>
                <Box border="1px solid #818181" borderRadius="10px" p="2">
                  <img src={icon} alt="Profile_Picture" />
                </Box>

                <Box>
                  <Text
                    color="#000"
                    textAlign="center"
                    fontSize={{ base: "24px", md: "40px" }}
                    fontWeight={700}
                  >
                    {currentUser?.userName}'s Profile
                  </Text>
                </Box>
              </VStack>
            </Center>
          </Box>
        )}
      </Box>
      <CustomModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ChatScreen;
