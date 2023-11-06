import {
  Box,
  Center,
  Flex,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {  useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getBaseUrlWithoutRoute } from "../api";
import icon from "../assets/images/icon.svg";
import ChatBox from "../components/ChatBox";
import CustomModal from "../components/CustomModal";
import { UserContext } from "../utility/UserProvider";

const ChatScreen = () => {
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useContext(UserContext);
  const { roomId } = useParams();

  const socket = io(getBaseUrlWithoutRoute());

  useEffect(() => {
    socket.emit("user", {
      _id: currentUser?._id,
      userName: currentUser?.userName,
      roomId: roomId
    });
  }, [socket, currentUser?._id, currentUser?.userName, roomId]);

  const userName =
    currentUser?.userName!.length! > 0 ? currentUser?.userName : "";

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
                {userName?.charAt(0).toUpperCase()}
                {userName?.slice(1)}
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
                paddingRight: "10px"
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
          <div
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
          </div>

          <div onClick={handleProfileDisplay}>
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
          </div>
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
                    {userName?.charAt(0).toUpperCase()}
                    {userName?.slice(1)}'s Profile
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
