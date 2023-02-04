import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import { Conversation } from "../../../../../backend/src/util/types";
import { ConversationsData } from "../../../util/types";
import ConversationOperations from '../../../graphql/operations/conversation';
import { useQuery } from "@apollo/client";

import ConversationItem from "./ConversationItem";
import ConversationModal from "./Modals/ConversationModal";

interface ConversationListProps {
    session: Session;
    conversations: any;
}



const ConversationList: React.FC<ConversationListProps> = ({ session, conversations }) => {


       console.log('hey', conversations)
    const [isOpen, setIsOpen] = useState(false)

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

  return (
    <Box width='100%'>
        <Box 
        py={2} 
        px={4} 
        mb={4} 
        bg='blackAlpha.300' 
        borderRadius={4} 
        cursor='pointer' 
        onClick={onOpen}>
            <Text textAlign='center' color='whiteAlpha.800' fontWeight={500}>
                Start a conversation 
            </Text>
        </Box>
        <ConversationModal isOpen={isOpen} onClose={onClose} session={session}/>
        {conversations.map((conversation: any) => (
  <ConversationItem 
  key={conversation.id}
  conversation={conversation} />
))}
    </Box>
  )
}

export default ConversationList
