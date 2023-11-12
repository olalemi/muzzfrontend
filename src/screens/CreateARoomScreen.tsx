import React from 'react'; 
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import RoomService from "../api/RoomService";

const CreateARoomScreen = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    roomName: Yup.string()
      .required("room name is required")
      .matches(/^[A-Za-z][A-Za-z0-9]{3,}$/, 'room name must start with a letter and be at least 4 characters long')
  });
  

  const formik = useFormik({
    initialValues: {
      roomName: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.roomName) {
        await RoomService.createRoom({ name: values.roomName });
        navigate("/choose-a-room");
      } else {
      }
    }
  });

  const handleSkipIntoAnExistingRoom = () => {
    navigate("/choose-a-room");
  };

  return (
    <Box>
      <Flex
        direction={{ base: "column" }}
        justifyContent={{ base: "center" }}
        alignContent="center"
        mt="200px"
        gap="10px"
        borderRadius="10px"
      >
        <Box margin="auto">
          <Text
            color="#000"
            textAlign="center"
            fontSize={{ base: "20px", md: "24px" }}
            fontWeight={700}
            mt="-100px"
          >
            Create a new room
          </Text>
        </Box>
        <Box p={{ md: "20px" }} margin="auto" borderRadius="10px">
          <form
            onSubmit={formik.handleSubmit}
            style={{
              padding: "0px 25px 0px 25px"
            }}
          >
            <Flex
              direction={{ base: "column" }}
              justifyContent={{ base: "center" }}
              alignContent="center"
              gap="10px"
              margin=" 0 auto"
            >
              <Box>
                <Input
                  value={formik.values.roomName}
                  id="roomName"
                  name="roomName"
                  type="text"
                  placeholder="Create a new room"
                  borderColor="#818181"
                  borderRadius="10px"
                  focusBorderColor="#fb406c"
                  width="100%"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
              {formik.touched.roomName && formik.errors.roomName && (
              <Text color="#FF0000" fontSize={{ base: "10px", md: "10px" }} mt="2px" ml="10px">
                {formik.errors.roomName}
              </Text>
            )}

              <Box mt="2px">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: !formik.isValid ? "#8C9C8E" : "#01BE6E",
                    color: "#ffffff",
                    fontSize: "16px",
                    borderRadius: "10px",
                    width: "100%",
                    height: "40px",
                    padding: "0px 50px"
                  }}
                  disabled={!formik.isValid}
                >
                  Enter
                </Button>
              </Box>

              <Box mt="2px">
                <Text
                  color="#000"
                  textAlign="center"
                  fontSize={{ base: "18px", md: "20px" }}
                  fontWeight={300}
                  mt="7px"
                >
                  or
                </Text>
              </Box>

              <Box mt="10px">
                <Button
                  onClick={handleSkipIntoAnExistingRoom}
                  style={{
                    backgroundColor: "#01BE6E",
                    color: "#ffffff",
                    fontSize: "16px",
                    borderRadius: "10px",
                    width: "100%",
                    height: "40px",
                    padding: "0px 50px"
                  }}
                  _hover={{
                    backgroundColor: "#8C9C8E"
                  }}
                >
                  Skip to enter an existing room
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateARoomScreen;
