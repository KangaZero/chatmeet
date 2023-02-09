import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState, ReactNode } from "react";
import { Conversation } from "../../../../../backend/src/util/types";
import { ConversationsData } from "../../../util/types";
import ConversationOperations from '../../../graphql/operations/conversation';
import { useQuery } from "@apollo/client";

import ConversationItem from "./ConversationItem";
import ConversationModal from "./Modals/ConversationModal";
import { useRouter } from "next/router";

interface ConversationListProps {
    session: Session;
    conversations: Array<any>;
    onViewConversation: (conversationId: string) => void;
    // conversations: Array<ConversationsData> 
}

const ConversationList: React.FC<ConversationListProps> = ({ session, conversations, onViewConversation }) => {

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

    const [isOpen, setIsOpen] = useState(false)
    
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const router = useRouter();
    const {user: { id: userId}} = session;

  return (
    <Box width='100%'>
        <Box 
        py={2} 
        px={4} 
        mb={4} 
        _hover={styles.buttonHoverBg}
        bg={styles.button}  
        borderRadius={4} 
        cursor='pointer' 
        onClick={onOpen}>
            <Text 
            textAlign='center'
            color={styles.text} 
            fontWeight={500}>
                Start a conversation 
            </Text>
        </Box>
        <ConversationModal isOpen={isOpen} onClose={onClose} session={session}/>
        {conversations.map((conversation: any) => (
  <ConversationItem 
  key={conversation.id}
  userId={userId}
  conversation={conversation}
  onClick={() => onViewConversation(conversation.id)}
  isSelected={conversation.id === router.query.conversationId} />
))}
    </Box>
  )
}

export default ConversationList
