import { Box } from "@chakra-ui/react"
import { Session } from "next-auth"
import ConversationList from "./ConversationList"
import ConversationOperations from '../../../graphql/operations/conversation';
import { useQuery } from "@apollo/client";
import { ConversationsData } from "../../../util/types";


interface ConversationWrapperProps {
    session: Session
}

const ConversationWrapper: React.FC<ConversationWrapperProps> = ({session}) => {

  const { 
    data: conversationsData, 
    loading: conversationsLoading,
    error: conversationsError
    // 1st is the data we get, 2nd is what we inputed
   } = useQuery<ConversationsData, null>(ConversationOperations.Queries.conversations)

   console.log('conversationsData', conversationsData)

  return (
    <Box width={{ base: '100%', md: '400px' }} bg='whiteAlpha.50' py={6} px={3}>
        {/* Add skeleton */}
        <ConversationList session={session} />
    </Box>
  )
}

export default ConversationWrapper
