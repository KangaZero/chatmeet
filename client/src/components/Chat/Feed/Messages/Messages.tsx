import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  MessagesData,
  MessagesSubscriptionData,
  MessagesVariables,
} from "../../../../util/types";
import MessageOperations from "../../../../graphql/operations/message";
import toast from "react-hot-toast";
import SkeletonLoader from "../../../common/SkeletonLoader";
import { useEffect, useRef } from "react";

import MessageItem from "./MessageItem";

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }): any => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(MessageOperations.Queries.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
    // onCompleted: () => {
    //     console.log('completed')
    // }
  });

  // if (error) {
  //     console.error(error)
  //     return null;
  // }

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subscribeToMoreMessages = (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessagesSubscriptionData) => {
        if (!subscriptionData.data) {
          return prev;
        }
        // console.log('subscriptionData', subscriptionData)

        const newMessage = subscriptionData.data.messageSent;

        return Object.assign({}, prev, {
          messages: [newMessage, ...prev.messages],
        });
      },
    });
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    subscribeToMoreMessages(conversationId);
  }, [conversationId]);

  // useEffect(() => {
  //     if (!messagesEndRef.current || !data) return;
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }, [data, messagesEndRef.current]);

  // console.log("messages", data)

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading && (
        <Stack spacing={4} px={3}>
          <SkeletonLoader count={8} height="50px" width="270px" />
        </Stack>
      )}
      {data?.messages && (
        <Flex direction="column-reverse" overflow="auto" height="100%">
          {data.messages.map((message) => (
            <Stack
              border="1px solid black"
              key={message.id}
              direction={message.senderId === userId ? "row-reverse" : "row"}
            >
              <MessageItem message={message} sentByMe={message.senderId === userId} />
            </Stack>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
