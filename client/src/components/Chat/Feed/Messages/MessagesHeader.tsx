
import { useQuery } from "@apollo/client";
import { Button, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, {FC} from "react";
import { Participant } from "../../../../../../backend/src/util/types";
import ConversationOperations from "../../../../graphql/operations/conversation";
import { formatUsernames } from "../../../../util/function";
import { ConversationsData } from "../../../../util/types";
// import SkeletonLoader from "../../../common/SkeletonLoader";
export interface MessagesHeaderProps {
  userId: string;
  conversationId: string;
}

const MessagesHeader = ({ userId, conversationId }: MessagesHeaderProps): JSX.Element | undefined | any => {
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
};
 
  const router = useRouter();
  const { data, loading } = useQuery<ConversationsData, any>(
    ConversationOperations.Queries.conversations
  );

  const conversation = data?.conversations.find(
    (conversation) => conversation.id === conversationId
  );

  if (data?.conversations && !loading && !conversation) {
    router.replace(process.env.NEXT_PUBLIC_BASE_URL as string);
    // return null;
  }

  if (conversation && conversation.participants) {
    const participants: Participant[] = conversation.participants.map(p => ({
      id: p.user.id,
      username: p.user.username,
    }));
    // console.log('participants: ', participants)
    const usernames = formatUsernames(participants, userId);

  

  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor={styles.border}
    >
      <Button
        display={{ md: "none" }}
        onClick={() =>
          router.replace("?conversationId", "/", {
            shallow: true,
          })
        }
      >
        Back
      </Button>
      {/* {loading && <SkeletonLoader count={1} height="30px" width="320px" />} */}
      {!conversation && !loading && <Text>Conversation Not Found</Text>}
      {conversation && (
        <Stack direction="row">
          <Text color={styles.text}>To: </Text>
          <Text fontWeight={600}>
            {/* {formatUsernames(conversation.participants , userId)} */}
            {usernames}
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
}

export default MessagesHeader;
