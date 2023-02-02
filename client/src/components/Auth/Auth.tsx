import { Button, Text, Center, Stack, Image, Input } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import userOperations from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../util/types';

interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {

const [username, setUsername] = useState('');

const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData, 
    CreateUsernameVariables
>(
    userOperations.Mutations.createUsername
    )
    // if (loading) return "Submitting..."
    // if (error) return `Hi`

const handleSubmit = async () => {
    try {
        await createUsername({ variables : { username }}) 
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
