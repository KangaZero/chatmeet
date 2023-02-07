import { 
  Avatar,
  Box,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text, useColorModeValue } from "@chakra-ui/react"
 import { formatRelative } from "date-fns";
import enAu from "date-fns/locale/en-AU";
import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { formatUsernames, formatDate } from'../../../util/function'

import { Conversation } from "../../../../../backend/src/util/types"


type ConversationItemProps = {
    conversation: Conversation
  userId: string;
  onClick: () => void;
  isSelected: boolean;
    //   onEditConversation?: () => void;
  //   hasSeenLatestMessage?: boolean;
  //   selectedConversationId?: string;
  //   onDeleteConversation?: (conversationId: string) => void;
  //   onLeaveConversation?: (conversation: ConversationPopulated) => void;
}

//  const ConversationItem: React.FC<ConversationItemProps> = ({ conversation}) => {
  
//     return (
//     <Stack 
//     p={4}
//     bg={useColorModeValue("teal.50", "whiteAlpha.50")} 
//     _hover={{
//       bg: useColorModeValue("teal.100", "whiteAlpha.300"),
//     }}
//     > 
//       <Text>
//       {conversation.id}
//         </Text>  
//         <Divider />
//     </Stack>
//   )
// }

const ConversationItem: React.FC<ConversationItemProps> = ({
  userId,
  conversation,
  onClick,
  isSelected,
  //   selectedConversationId,
  //   hasSeenLatestMessage,
  //   onEditConversation,
  //   onDeleteConversation,
  //   onLeaveConversation,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  console.log('conversationITME', conversation)

  const conversationUpdatedAt = conversation.updatedAt
  console.log(conversationUpdatedAt)

  const handleClick = (event: React.MouseEvent) => {
    if (event.type === "click") {
      onClick();
    } else if (event.type === "contextmenu") {
      event.preventDefault();
      setMenuOpen(true);
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={isSelected ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={handleClick}
      onContextMenu={handleClick}
      position="relative"
    >
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <MenuList bg="#2d2d2d">
          <MenuItem
            icon={<AiOutlineEdit fontSize={20} />}
            onClick={(event) => {
              event.stopPropagation();
              //   onEditConversation();
            }}
          >
            Edit
          </MenuItem>
          {conversation.participants.length > 2 ? (
            <MenuItem
              icon={<BiLogOut fontSize={20} />}
              onClick={(event) => {
                event.stopPropagation();
                // onLeaveConversation(conversation);
              }}
            >
              Leave
            </MenuItem>
          ) : (
            <MenuItem
              icon={<MdDeleteOutline fontSize={20} />}
              onClick={(event) => {
                event.stopPropagation();
                // onDeleteConversation(conversation.id);
              }}
            >
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      {/* <Flex position="absolute" left="-6px">
        {hasSeenLatestMessage === false && (
          <GoPrimitiveDot fontSize={18} color="#6B46C1" />
        )}
      </Flex> */}
      <Avatar />
      <Flex justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants, userId)}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {/* {conversation.latestMessage.body} */} Hi
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="blackAlpha.700" textAlign="right">
          {formatDate(conversationUpdatedAt)}
        </Text>
      </Flex>
    </Stack>
  );
};

// const ConversationItem: any = ({userId,
//   conversation,
//   onClick,
//   isSelected,}) => {
//   return (
//     <div>

// <Text> {conversation.id}</Text>
//     </div>
//   )
// }

export default ConversationItem