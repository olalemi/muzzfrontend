import React from "react";
import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserService from "../api/UserService";
import { IUser } from "../interfaces/User/IUser";

const HomeScreen = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Username is required")
      .matches(
        /^[A-Za-z]{4,}$/,
        "Username  must start with a letter and be at least 4 characters long"
      )
  });

  const formik = useFormik({
    initialValues: {
      userName: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.userName) {
        const user = await UserService.createUser({
          userName: values.userName,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        if (user) {
          localStorage.setItem("userId", JSON.stringify(user._id!));
        }
        navigate("/create-a-room");
      } else {
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
              {formik.touched.userName && formik.errors.userName && (
                <Text
                  color="#FF0000"
                  fontSize={{ base: "10px", md: "10px" }}
                  mt="2px"
                  ml="10px"
                >
                  {formik.errors.userName}
                </Text>
              )}

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
                  Submit
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
