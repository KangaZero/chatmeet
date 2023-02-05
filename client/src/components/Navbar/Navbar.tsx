/* eslint-disable react-hooks/rules-of-hooks */
import { ReactComponentElement, ReactNode } from "react";
import {
  Box,
  Text,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { getSession, useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

type NavbarProps = string | undefined | any;

const Navbar: React.FC<NavbarProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: session } = useSession();

  return (
    <>
      <Box bg={useColorModeValue('teal.100', 'whiteAlpha.50')} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box as={Button} onClick={() => signOut()}>
            Signout
          </Box>
          <NavLink>
            <Text fontWeight={1000} fontSize="2xl">
              ChatMeet
            </Text>
          </NavLink>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {session?.user?.username ? (
                <Menu>
                  <MenuButton
                    _hover={{
                      bg: useColorModeValue("orange.300", "gray.700"),
                    }}
                    onMouseEnter={onOpen}
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={session?.user?.image} />
                  </MenuButton>
                      
                  <MenuList alignItems={"center"} bg={useColorModeValue("teal.50", "whiteAlpha.50")}>
                    <br />
                    <Center>
                      <Avatar borderRadius='30px' size={"2xl"} src={session?.user?.image} />
                    </Center>
                    <br />
                    <Center>
                      <p>{session?.user?.username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem 
                    bg={useColorModeValue("teal.50", "whiteAlpha.50")} 
                    _hover={{
                      bg: useColorModeValue("teal.100", "whiteAlpha.300"),
                    }}
                    as={Button} 
                    href={"/settings"}>
                      Account Settings
                    </MenuItem>
                    <MenuItem 
                    bg={useColorModeValue("teal.50", "whiteAlpha.50")} 
                    _hover={{
                      bg: useColorModeValue("teal.100", "whiteAlpha.300"),
                    }}
                    as={Button} 
                    onClick={() => signOut()}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link href="/">Sign In</Link>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
