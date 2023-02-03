import { Button, Text, Center, Stack, Image, Input } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import userOperations from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../util/types';
import { toast } from 'react-hot-toast';

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
                <Button width="100%" onClick={handleSubmit} isLoading={loading}>Save</Button>
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
