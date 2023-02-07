import { useQuery } from "@apollo/client";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Session } from "next-auth"
import { useRouter } from "next/router";
import ConversationOperations from '../../../graphql/operations/conversation';
import { ConversationsData } from "../../../util/types";



interface FeedWrapperProps {
    session: Session
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({session}) => {

  const router = useRouter();

  const {conversationId} = router.query;

  // const [Conversations, { data, loading, error }] = useQuery<SearchConversationsData>(ConversationOperations.Query.conversations)

  // console.log('conversations', data)

  return (
    <Flex 
    // on mobile devices show nothing if no convo but always show for desktop
      display={{base: conversationId ? 'flex' : 'none', md: 'flex'}}
      width='100%'
      direction='column'
      border='1px solid orange'>

    {conversationId ? (
      <Flex
        mx='auto'>
        {conversationId}
        <Button>
          Check
        </Button>
        </Flex>
    ) : (
      <Box>
        <h1>Loading...</h1>
      </Box>
    )}
  </Flex>
  
  )
}

export default FeedWrapper