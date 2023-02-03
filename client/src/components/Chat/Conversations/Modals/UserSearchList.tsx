import { SearchedUsers } from "../../../../util/types"
import {Box, Text, Flex, Stack, Avatar, Button, useColorModeValue} from '@chakra-ui/react';


type UserSearchListProps = {
    users: Array<SearchedUsers>
    addParticipant: (user: SearchedUsers)  => void
}

const UserSearchList = ({users, addParticipant}: UserSearchListProps) => {

      const styles = {
        cardBg: useColorModeValue('teal.50', 'whiteAlpha.50'),
        inputField: useColorModeValue('cyan.100', 'gray.700'),
        inputFieldFocus: useColorModeValue('orange.50','blackAlpha.300'),
        text: useColorModeValue('teal.900','yellow.50'),
        title: useColorModeValue('teal.900','yellow.50'),
        border: useColorModeValue('teal.900', 'yellow.50'),
        button: useColorModeValue('yellow.50', 'teal.900'),
        link: useColorModeValue('blue.500', 'blue.600'),
        user: useColorModeValue('yellow.100', 'blue.600'),
        linkHover: {color: useColorModeValue('blue.300', 'blue.700')},
        buttonHoverBg: {bg: useColorModeValue('teal.200', 'teal.700')},
        userHoverbg: {bg: useColorModeValue('cyan.200', 'cyan.600')},
        googleButtonBg: useColorModeValue('blue.200', 'blue.600'),
        googleButtonHoverBg:{bg:useColorModeValue('blue.500','blue.800')},
        facebookButtonBg: useColorModeValue('gray.300', 'gray.600'),
        facebookButtonHoverBg:{bg:useColorModeValue('gray.500','gray.800')}
    } 
  

  return (
    <>
        {users.length === 0 ? (
            <Flex mt={6} justify="center">
              <Text>No users found</Text>
            </Flex>
            ) : (
                <Stack mt={6}>
                    {users.map(user => {
                        return (
                            <Stack
                                key={user.id}
                                direction='row'
                                align='center'
                                spacing={4}
                                py={3}
                                px={5}
                                bg={styles.user}
                                borderRadius='5px 20px'
                                _hover={styles.userHoverbg}
                                borderColor={styles.border}
                                borderWidth='1px'
                                borderStyle='inset'
                            >
                                <Avatar src='facebook.logo.svg' />
                                <Flex justify='space-between' width='100%'>
                                    <Text color={styles.text}>
                                        {user.username}
                                    </Text>
                                    <Button
                                        bg={styles.button}
                                        _hover={styles.buttonHoverBg}
                                        onClick={() => { addParticipant(user); } }
                                    >
                                        Select
                                    </Button>
                                </Flex>
                            </Stack>
                        );
                    })}
                </Stack>
        )
    }
    </>
    // {users.map((user) => 
    //     <Box>
    //         <Text>{user?.username}</Text>
    //     </Box> 
    // )}
  )
}
export default UserSearchList