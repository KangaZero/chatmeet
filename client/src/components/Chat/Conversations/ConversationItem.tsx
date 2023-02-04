import { Stack, Text } from "@chakra-ui/react"
import { Conversation } from "../../../../../backend/src/util/types"
import conversation from "../../../graphql/operations/conversation"

type ConversationItemProps = {
    conversation: Conversation
}

 const ConversationItem: React.FC<ConversationItemProps> = ({ conversation}) => {
  console.log("HEU ALL")
  
    return (
    <Stack> 
      <Text>
      {conversation.id}
        </Text>  
    </Stack>
  )
}

export default ConversationItem