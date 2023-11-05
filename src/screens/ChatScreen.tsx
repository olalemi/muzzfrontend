import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Center,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import ChatBox from "../components/ChatBox";
import icon from "../assets/images/icon.svg";
import CustomModal from "../components/CustomModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ChatScreen = () => {
  const [displayProfile, setDisplayProfile] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProfileDisplay = () => {
    setDisplayProfile(!displayProfile); // Toggle the displayProfile state
    console.log("display profile");
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
                Habeebah
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
            <ChatBox />
          </Box>
        ) : (
          <Box mt="200px">
            <Center>
              <VStack>
                <Box borderRadius="50px">
                  <img src={icon} alt="Profile_Picture" />
                </Box>

                <Box>
                  <Text
                    color="#000"
                    textAlign="center"
                    fontSize={{ base: "24px", md: "40px" }}
                    fontWeight={700}
                  >
                    Habeebah's Profile
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
