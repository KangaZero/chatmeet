import { Button, Text, Center, Stack, Image, Input, Icon, useColorModeValue } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import userOperations from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../util/types';
import { toast } from 'react-hot-toast';
import { TriangleUpIcon } from '@chakra-ui/icons';

import { motion } from "framer-motion"
interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {

const [username, setUsername] = useState('');

const styles = {
    // (light, dark)
    cardBg: useColorModeValue('teal.50', 'whiteAlpha.50'),
    inputField: useColorModeValue('cyan.100', 'gray.700'),
    inputFieldFocus: useColorModeValue('orange.50','blackAlpha.300'),
    text: useColorModeValue('teal.900','yellow.50'),
    title: useColorModeValue('teal.900','yellow.50'),
    border: useColorModeValue('teal.900', 'yellow.50'),
    button: useColorModeValue('yellow.50', 'teal.900'),
    link: useColorModeValue('blue.500', 'blue.600'),
    linkHover: {color: useColorModeValue('blue.300', 'blue.700')},
    buttonHoverBg: {bg: useColorModeValue('teal.200', 'teal.700')},
    googleButtonBg: useColorModeValue('blue.200', 'blue.600'),
    googleButtonHoverBg:{bg:useColorModeValue('blue.500','blue.800')},
    facebookButtonBg: useColorModeValue('gray.300', 'gray.600'),
    facebookButtonHoverBg:{bg:useColorModeValue('gray.500','gray.800')}
} 

const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData, 
    CreateUsernameVariables
>(
    userOperations.Mutations.createUsername
    )


const handleSubmit = async () => {
    try {
        const {data} = await createUsername({ variables : { username }}) 

        if (!data) {
            throw new Error();
        } 
        
        if (data.createUsername.error) {
            const { createUsername: { error }, } = data;
            throw new Error(error)
        }

        toast.success('Username succesfully created! 🎶');

        // if successful reload session to get updated info
        reloadSession();
        console.log('createUsername', data)
    } catch (error: any) {
        toast.error(error?.message)
        console.error(error)

    }
    
}

  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.1 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    >
        <Center height="100vh">
            <Stack
            bg={styles.cardBg} 
            spacing="6" 
            align="center" 
            px={10}
            py={20}
            borderColor={styles.border}
            borderWidth='2px'
            borderRadius='20px'
            borderStyle='ridge'
            > 
                {session ? (
                    <>
                    <Icon as={TriangleUpIcon}
                        h={5}
                        w={10}
                    />
                    <Text color={styles.title} fontWeight={1000} fontSize='3xl'>ChatMeet</Text>
                    <Text color={styles.text} fontWeight={800} fontSize="2xl">Create a Username</Text>
                    <Input 
                    backgroundColor={styles.inputField}
                    focusBorderColor={styles.inputFieldFocus}
                    variant='flushed'
                    placeholder="Input a username" 
                    px={2}
                    onChange={(e) => 
                    setUsername(e.target.value)} 
                    value={username} />
                    <Button 
                    width="100%" 
                    onClick={handleSubmit} 
                    isLoading={loading}
                    bg={styles.button}
                    _hover={styles.buttonHoverBg}
                    >
                    Save
                    </Button>
                    </>
                ) : (
                    <>
                        <Text 
                        color={styles.title} 
                        fontWeight={1000}
                        py={5}
                        fontSize="4xl">ChatMeet</Text>
                            <Button 
                                minWidth={'100%'}
                                bg={styles.googleButtonBg}
                                _hover={styles.googleButtonHoverBg}
                                leftIcon={<Image height='20px' alt='google logo' src='google-logo.png'/>}
                                onClick={() => signIn('google')}>
                                Sign in via Google
                            </Button>
                            <Button 
                                minWidth={'100%'}
                                bg={styles.facebookButtonBg}
                                _hover={styles.facebookButtonHoverBg}
                                leftIcon={<Image height='20px' alt='facebook logo' src='facebook-logo.svg'/>}
                                onClick={() => signIn('facebook')}>
                                Sign in via Facebook
                            </Button>
                            <Text>Or</Text>
                            <Link href='/signup'>
                                <Text
                                color={styles.link}
                                _hover={styles.linkHover} 
                                >
                                    Sign up manually
                                </Text>
                            </Link>
                    </>
                )} 
            </Stack>
        </Center>
    </motion.div>
  );
};


export default Auth;
