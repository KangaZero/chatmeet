import { Flex, Text, Avatar, Stack } from "@chakra-ui/react";
import { formatRelative } from "date-fns";
import enAU from "date-fns/locale/en-AU";
import { MessagePopulated } from '../../../../../../server/src/util/types'
import { formatDate } from "../../../../util/function";

interface MessageItemProps {
  message: MessagePopulated;
  sentByMe: boolean;
}

const formatRelativeLocale = {
    lastWeek: "'Last' eeee 'at' p",
    yesterday: "'Yesterday at' p",
    today: "'Today at' p",
    tomorrow: "'Tomorrow at' p",
}

const MessageItem: React.FC<MessageItemProps> = ({ message, sentByMe }) => {

    console.trace('MessageItem', message.createdAt)

  return (
    <Stack
    direction='row'
    spacing={4}
    _hover={{bg: 'gray.100'}}
    justify={sentByMe ? 'flex-end' : 'flex-start'}
    py={3}
    px={5}
    wordBreak='break-word'
    >
        {!sentByMe && (
            <Flex align='flex-end'>
        <Avatar src={message.sender.image !== null ? message.sender.image : ''} size='sm' />
        </Flex>
        ) 
        }
        <Stack spacing={1} width='100%'>
            <Stack direction='row' align='center'>
                {!sentByMe && (
                    <Text fontSize='sm' textAlign='left' fontWeight='bold'>
                        {message.sender.username}
                    </Text>
                )}
                <Text fontSize={14}>
                    {formatDate(message.createdAt)}
                    {/* {formatRelative(new Date(), new Date(), {
                        locale: {
                            ...enAU,
                            formatRelative: (token) => formatRelativeLocale[token as keyof typeof formatRelativeLocale],
                        },
                    })} */}
                </Text>
            </Stack>
        </Stack>
</Stack>
  );
};

export default MessageItem;
