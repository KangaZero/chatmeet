import { Box } from "@chakra-ui/react"
import { Session } from "next-auth"
import ConversationList from "./ConversationList"
import ConversationOperations from '../../../graphql/operations/conversation';
import { useQuery } from "@apollo/client";


interface ConversationWrapperProps {
    session: Session
}

const ConversationWrapper: React.FC<ConversationWrapperProps> = ({session}) => {

  const { 
    data: conversationsData, 
    loading: conversationsLoading,
    error: conversationsError
   } = useQuery(ConversationOperations.Queries.conversations)

   console.log('conversationsData', conversationsData)

  return (
    <Box width={{ base: '100%', md: '400px' }} bg='whiteAlpha.50' py={6} px={3}>
        {/* Add skeleton */}
        <ConversationList session={session} />
    </Box>
  )
}

export default ConversationWrapper
