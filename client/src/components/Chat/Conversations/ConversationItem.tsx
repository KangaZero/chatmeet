import { Box, Divider, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { Conversation } from "../../../../../backend/src/util/types"
import conversation from "../../../graphql/operations/conversation"

type ConversationItemProps = {
    conversation: Conversation
}

 const ConversationItem: React.FC<ConversationItemProps> = ({ conversation}) => {
  
    return (
    <Stack 
    p={4}
    bg={useColorModeValue("teal.50", "whiteAlpha.50")} 
    _hover={{
      bg: useColorModeValue("teal.100", "whiteAlpha.300"),
    }}
    > 
      <Text>
      {conversation.id}
        </Text>  
        <Divider />
    </Stack>
  )
}

export default ConversationItem