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

  const styles = {
    // (light, dark)
    cardBg: useColorModeValue('teal.50', 'whiteAlpha.200'),
    cardBgHover: {bg: useColorModeValue("teal.100", "whiteAlpha.100")},
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
} 

  const [menuOpen, setMenuOpen] = useState(false);

  // console.log('conversationITME', conversation)

  const conversationUpdatedAt = conversation.updatedAt
  // console.log('converssationUpdatedAt', conversationUpdatedAt)

  const participants: any = conversation.participants.map(p => ({
    id: p.user?.id,
    username: p.user?.username,
  }));
  const usernames = formatUsernames(participants, userId);


  const handleClick = (event: React.MouseEvent) => {
    if (event.type === "click") {
      onClick();
    } else if (event.type === "contextmenu") {
      event.preventDefault();
      setMenuOpen(!menuOpen);
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
      bg={isSelected ? `${styles.cardBg}` : "none"}
      _hover={styles.cardBgHover}
      onClick={handleClick}
      onContextMenu={handleClick}
      position="relative"
    >
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <MenuList bg="#fdfd">
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
      <Flex justify="space-between" width="80%" height="100%" py={3}>
        <Flex direction="column" width="70%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {usernames}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {/* {conversation.latestMessage.body} */} Hi
              </Text>
            </Box>
          )}
        </Flex>
        <Text textAlign="right">
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