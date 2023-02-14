
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import toast from "react-hot-toast";

interface MesssageInputProps {
    session: Session;
    conversationId: string;
}

const MessageInput = ({ session, conversationId }: MesssageInputProps) => {
   
    const [messageBody, setMessageBody] = useState('');

    const onSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messageBody,
                    conversationId,
                    userId: session.user.id,
                }),
            });

            const data = await response.json();
            console.log('data', data);
        } catch (error: any) {
            console.error('onSendMessage error', error);
            toast.error(error?.message || 'Something went wrong!');
        }
        
    }

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

    return (
        <Box
        px={4}
        py={6}
        width='100%'
        backgroundColor = {styles.cardBg}
        >
            <form onSubmit={(e) => {}}>
                <Input 
                border="1px solid"
                borderColor={styles.border}
                size="md"
                resize="none"
                _focus= {{borderColor: styles.inputFieldFocus}}
                _hover= {{borderColor: styles.inputFieldFocus}}
                placeholder="Type a message..." 
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)} />
                
            </form>
            Here
        </Box>
    );
};

export default MessageInput;

