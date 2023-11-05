import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "2xl" }}>
      <ModalOverlay />
      <ModalContent
        backgroundColor="#fff"
        borderRadius="10px"
        marginTop={{ base: "60%", sm: "15%" }}
        marginLeft={4}
        marginRight={4}
      >
        <ModalCloseButton />

        <ModalBody
          style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "25px 30px 50px "
          }}
        >
          <ModalHeader
            style={{
              color: "#000",
              textAlign: "center",
              fontWeight: "700"
            }}
            mt={5}
            fontSize={{ base: "24px", md: "40px" }}
          >
            Log out?
          </ModalHeader>

          <Text
            fontSize={{ base: "16px", md: "24px" }}
            fontWeight="500"
            color="#000"
            textAlign="center"
          >
            Are you sure you want to log out ?
          </Text>
          <Flex
            direction={{ base: "row" }}
            justifyContent={{ base: "center" }}
            alignContent="center"
          >
            <Button
              onClick={handleLogOut}
              style={{
                backgroundColor: "#fb406c",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                borderRadius: "10px",
                padding: "10px 24px",
                height: "60px",
                marginTop: "20px",
                width: "85%"
              }}
            >
              Log out
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
