import { useQuery } from "@apollo/client";
import { Box, Button, Center, Flex, useColorModeValue } from "@chakra-ui/react";
import { Session } from "next-auth"
import { useRouter } from "next/router";
import ConversationOperations from '../../../graphql/operations/conversation';
import { ConversationsData } from "../../../util/types";
import MessagesHeader from "./Messages/MessagesHeader";
import MessagesInput from "./Messages/MessagesInput";



interface FeedWrapperProps {
    session: Session
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({session}) => {

  const router = useRouter();

  const { conversationId } = router.query;
  const { user: { id: userId }} = session;

  // const [Conversations, { data, loading, error }] = useQuery<SearchConversationsData>(ConversationOperations.Query.conversations)

  // console.log('conversations', data)

    return (
    <Flex 
    // on mobile devices show nothing if no convo but always show for desktop
      display={{base: conversationId ? 'flex' : 'none', md: 'flex'}}
      width='100%'
      direction='column'
      bg={useColorModeValue('teal.50', 'whiteAlpha.50')}

      >

    {conversationId && typeof conversationId === 'string' ? (
      <>
      <Flex
      direction="column"
      justify="space-between"
      overflow="hidden"
      flexGrow={1}
      // eslint-disable-next-line react-hooks/rules-of-hooks
      bg={useColorModeValue('teal.50', 'gray.900')}

        >
        {/* {conversationId} */}
        <MessagesHeader userId={userId} conversationId={conversationId} />
        {/* <Messages /> */}
        </Flex>
        <MessagesInput session={session} conversationId={conversationId}/>
        </>
    ) : (
      <Center>
        <h1>Currently no conversations selected</h1>
      </Center>
    )}
  </Flex>
  
  )
}

export default FeedWrapper