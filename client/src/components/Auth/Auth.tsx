import { Button, Text, Center, Stack, Image, Input } from '@chakra-ui/react';
import { signIn } from "next-auth/react";
import { useState } from 'react';

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({ session, reloadSession }) => {

const [username, setUsername] = useState('');

const handleSubmit = async () => {
    try {
        // TODO createUsername mutation with GRAPHQL
        
    } catch (err) {
        console.error(err)
    }
    
}

  return (
    <Center height="100vh">
        <Stack spacing="6" align="center"> 
            {session ? (
                <>
                <Text fontWeight={800} fontSize="2xl">Create a Username</Text>
                <Input 
                backgroundColor="blackAlpha.600"
                placeholder="Input a username" 
                onChange={(e) => 
                setUsername(e.target.value)} 
                value={username} />
                <Button width="100%" onClick={handleSubmit} >Save</Button>
                </>
            ) : (
                <>
                    <Text fontSize="5xl">ChatMeet</Text>
                        <Button 
                            leftIcon={<Image height='20px' src='google-logo.png'/>}
                            onClick={() => signIn('google')}>
                            Sign in with Google
                        </Button>
                </>
             )} 
        </Stack>
    </Center>
  );
};


export default Auth;
