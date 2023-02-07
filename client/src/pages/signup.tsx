/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Icon,
  Center
} from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { toast } from 'react-hot-toast';
import { motion } from "framer-motion";
import next, { NextPage } from "next";
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextLink from 'next/link';


interface IAuthProps {
    session: Session | null;
    request: NextRequest;
}

const SignupCard: React.FC<IAuthProps> =({session, request}) => {

    if (session?.user) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)  
    }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userFormData, setUserFormData] = useState(
    {
      username: '',
      name: '',
      email: '',
      password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

//     At least one uppercase letter
// At least one lowercase letter
// At least one number
// At least one special character
// No whitespaces
// A minimum length of 5 characters
    const validatePassword = (value: string) => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,}$/;
        if (!value) {
          return "Password is required";
        } else if (value.length < 5) {
          return "Password must be at least 5 characters long";
        } else if (!pattern.test(value)) {
          return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
      }

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value })
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();


    if (userFormData.password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }

    try {
        toast.success('this is test')
        // const { data } = await addNewUser({
        //     variables: { ...userFormData },
        //   });    
        
    } catch (error: any) {
        toast.error('Oops something went wrong')
    }



  }

  const styles = {
    // (light, dark)
    cardBg: useColorModeValue("teal.50", "whiteAlpha.50"),
    innerCardBg: useColorModeValue("teal.100", "whiteAlpha.100"),
    inputField: useColorModeValue("cyan.100", "gray.700"),
    inputFieldFocus: useColorModeValue("orange.50", "blackAlpha.300"),
    text: useColorModeValue("teal.900", "yellow.50"),
    title: useColorModeValue("teal.900", "yellow.50"),
    border: useColorModeValue("teal.900", "yellow.50"),
    button: useColorModeValue("yellow.50", "teal.900"),
    link: useColorModeValue("blue.500", "blue.600"),
    linkHover: { color: useColorModeValue("blue.300", "blue.700") },
    buttonHoverBg: { bg: useColorModeValue("teal.200", "teal.700") },
    googleButtonBg: useColorModeValue("blue.200", "blue.600"),
    googleButtonHoverBg: { bg: useColorModeValue("blue.500", "blue.800") },
    facebookButtonBg: useColorModeValue("gray.300", "gray.600"),
    facebookButtonHoverBg: { bg: useColorModeValue("gray.500", "gray.800") },
  };

  return (
      <Center height="110vh">
    <motion.div 
    initial={{ opacity: 0, scale: 0.1 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    >
    <Flex>
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"xl"}
        py={12}
        px={6}
        bg={styles.cardBg}
        borderColor={styles.border}
        borderWidth="2px"
        borderRadius="20px"
        borderStyle="ridge"
      >
        <Stack align={"center"}>
          <Icon as={TriangleUpIcon} h={5} w={10} />
          <Heading fontSize={"4xl"} textAlign={"center"} color={styles.title}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={styles.text}>
            and start chatting! 😎
          </Text>
        </Stack>
        <Box
          bg={styles.innerCardBg}
          borderColor={styles.border}
          borderWidth="2px"
          borderRadius="20px"
          borderStyle="ridge"
          // boxShadow={'lg'}
          p={8}
        >
    
          <form onSubmit={handleSignUp}>
          <Stack spacing={4} color={styles.text}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input 
              bg={styles.inputField} 
              focusBorderColor={styles.inputFieldFocus} 
              type="text"
              name="username"
              value={userFormData.username}
              onChange={handleInputChange}
               />
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input 
                  bg={styles.inputField} 
                  focusBorderColor={styles.inputFieldFocus} 
                  type="text" 
                  name="name"
                  value={userFormData.name}
                  onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input 
              bg={styles.inputField} 
              focusBorderColor={styles.inputFieldFocus} 
              type="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
               />

            </FormControl>
              </Box>
            </HStack>

            {/* <Field name="password" validate={validatePassword}> */}
                <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                    bg={styles.inputField} 
                    focusBorderColor={styles.inputFieldFocus} 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userFormData.password}
                
                    onChange={handleInputChange}
                    />
                    <InputRightElement h={"full"}>
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                        }
                    >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                </FormControl>
            {/* </Field> */}

            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input 
                bg={styles.inputField} 
                focusBorderColor={styles.inputFieldFocus} 
                type={showPassword ? "text" : "password"} 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                onSubmit={handleSignUp}
                type="submit"
                // isLoading={loading}
                bg={styles.button}
                color={styles.text}
                _hover={styles.buttonHoverBg}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link 
                as={NextLink}
                href='/'
                color={styles.link}
                _hover={styles.linkHover}>Login</Link>
              </Text>
            </Stack>
          </Stack>
          </form>

        </Box>
      </Stack>
    </Flex>
</motion.div>
    </Center>

  );
}


export default SignupCard