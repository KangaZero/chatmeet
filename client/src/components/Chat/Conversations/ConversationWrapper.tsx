import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { ConversationsData } from "../../../util/types";
import { Conversation } from "../../../../../backend/src/util/types";
import { useEffect } from "react";

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
  } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );

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
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      {/* Add skeleton */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
      />
    </Box>
  );
};

export default ConversationWrapper;
