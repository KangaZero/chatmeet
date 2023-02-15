import { Box, useColorModeValue } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { ConversationsData } from "../../../util/types";
import { Conversation } from "../../../../../backend/src/util/types";
import { useEffect } from "react";
import { MdRouter } from "react-icons/md";
import router from "next/router";
import { useRouter } from 'next/router';
import SkeletonLoader from "../../common/SkeletonLoader";

interface ConversationWrapperProps {
  session: Session;
}

const ConversationWrapper: React.FC<ConversationWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
    subscribeToMore: conversationsSubscribed,
    // 1st is the data we get, 2nd is what we inputed
  } = useQuery<ConversationsData, any>(
    ConversationOperations.Queries.conversations
  );

  const onViewConversation = async (conversationId: string) => {
    // Push convoId to router query paramas
   router.push({query: { conversationId}});
  }

  const router = useRouter();
  const { query: { conversationId }} = router;


  const subscribeToNewConversations = () => {
    conversationsSubscribed({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationsData };
          };
        }
      ) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [...prev.conversations, newConversation],
        });
      },
    });
  };

  // Execute upon page load
  useEffect(() => {
    subscribeToNewConversations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <Box 
    display={{base: conversationId ? 'none' : 'flex', md: 'flex'}}
    flexDirection='column'
    width={{ base: "100%", md: "400px" }} bg={useColorModeValue('blue.100','gray.800')} 
    overflowY='auto'
    gap={4} py={6} px={3}>
     
      {conversationsLoading ? (
        <SkeletonLoader count={8} height='50px' width='270px' />
      ) : (
        <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
        onViewConversation={onViewConversation}
      />
      )
      }

      
    </Box>
  );
};

export default ConversationWrapper;
