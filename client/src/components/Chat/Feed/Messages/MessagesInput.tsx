
import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import { useState } from "react";
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { SendMessageArguments } from "../../../../../../backend/src/util/types";
import MessageOperations from "../../../../graphql/operations/message";
import { ObjectId } from "bson";

interface MesssageInputProps {
    session: Session;
    conversationId: string;
}

const MessageInput:React.FC<MesssageInputProps> = ({ session, conversationId }) => {
   
    const [messageBody, setMessageBody] = useState('');
    const [sendMessage] = useMutation<{ sendMessage: boolean }, SendMessageArguments>(MessageOperations.Mutations.sendMessage)

    const onSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        
        try {
            const {id: senderId} = session.user;
            const messageId = new ObjectId().toString();
            const newMessage: SendMessageArguments = {
                id: messageId,
                senderId,
                conversationId,
                body: messageBody,
            };
           const {data, errors} = await sendMessage({variables: {...newMessage}});

           console.log('messageinputdata', data)

           if (!data?.sendMessage || errors) {
                throw new Error('Something went wrong!');
            }

            setMessageBody('');

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
        overflow='hidden'
        >
            <form onSubmit={onSendMessage}>
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
        </Box>
    );
};

export default MessageInput;

