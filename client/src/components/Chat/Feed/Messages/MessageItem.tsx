import { Flex, Text, Avatar, Stack, Box, useColorModeValue } from "@chakra-ui/react";
import { MessagePopulated } from "../../../../../../server/src/util/types";
import { formatDate } from "../../../../util/function";

interface MessageItemProps {
  message: MessagePopulated;
  sentByMe: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, sentByMe }) => {
  console.trace("MessageItem", message.createdAt);

  return (
    <Stack
      direction="row"
      spacing={4}
      _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
      justify={sentByMe ? "flex-end" : "flex-start"}
      p={3}
      width="100%"
      wordBreak="break-word"
    >
      {!sentByMe && (
        <Flex align="flex-end">
          <Avatar
            src={message.sender.image !== null ? message.sender.image : ""}
            size="sm"
          />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack direction="row" align="center" >
          {!sentByMe && (
            <Text fontSize="sm" textAlign="left" fontWeight="bold">
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14}>{formatDate(message.createdAt)}</Text>
        </Stack>
        <Flex direction="row" justify={sentByMe ? "flex-end" : "flex-start"}>
        <Box
         bg={sentByMe ? "brand.100" : "whiteAlpha.300"}
         px={2}
         py={1}
         borderRadius={12}
         maxWidth="65%"
         >
            <Text>
                {message.body}
            </Text>
        </Box>
      </Flex>
      </Stack>
      
    </Stack>
  );
};

export default MessageItem;
