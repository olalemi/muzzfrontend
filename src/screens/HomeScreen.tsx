import React from "react";
import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

const HomeScreen = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("userName is required"),
    roomId: Yup.string().required("roomId is required")
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      roomId: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.userName !== "") {
        localStorage.setItem("userName", values.userName);

        navigate("/chat");
      } else {
        console.log("wrong inputs");
        console.log(values);
      }
    }
  });

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
              <Box maxW="400px">
                <Input
                  id="userName"
                  name="userName"
                  value={formik.values.userName}
                  type="text"
                  borderColor="#818181"
                  placeholder="Enter your username"
                  borderRadius="10px"
                  focusBorderColor="#fb406c"
                  width="100%"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Box maxW="400px">
                <Input
                  value={formik.values.roomId}
                  id="roomId"
                  name="roomId"
                  type="number"
                  placeholder="Enter your room number "
                  borderColor="#818181"
                  borderRadius="10px"
                  focusBorderColor="#fb406c"
                  width="100%"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Box>

              <Box maxW="400px">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: !formik.isValid ? "#8C9C8E" : "#01BE6E",
                    color: "#ffffff",
                    fontSize: "16px",
                    borderRadius: "10px",
                    width: "100%",
                    height: "45px",
                    padding: "0px 50px"
                  }}
                >
                  Join
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeScreen;
