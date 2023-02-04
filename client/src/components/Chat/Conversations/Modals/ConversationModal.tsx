import { useColorModeValue, Divider, Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Stack, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import UserOperations from '../../../../graphql/operations/user';
import ConversationOperations from '../../../../graphql/operations/conversation';
import { CreateConversationData, SearchedUsers, SearchUsersData, SearchUsersInput } from "../../../../util/types";
import { useLazyQuery, useMutation } from '@apollo/client';
import UserSearchList from "./UserSearchList";
import Participants from "./Participants";
import { toNamespacedPath } from "node:path/win32";
import toast from "react-hot-toast";
import { useRouter } from "next/router";


interface ConversationModalProps {
    isOpen: boolean;
    onClose: () => void;
    session: Session;

}

const ConversationModal: React.FC<ConversationModalProps> = ({ isOpen, onClose, session }) => {

    const router = useRouter();

    const [username, setUsername] = useState('');
    const [participants, setParticipants] = useState<Array<SearchedUsers>>([])

    const {
      user: { id: userId },
    } = session;
  
    // useLazy only works when specified
    const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
    >(UserOperations.Queries.searchUsers);

    const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, { participantIds: Array<string> }>(
      ConversationOperations.Mutations.createConversation
    );
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        searchUsers({ variables: { username }})
    };

    const addParticipant = (user: SearchedUsers) => {
      setParticipants((prev) => [...prev, user]);
      setUsername("");
    };

    const remmoveParticipant = (userId: string):void => {
      setParticipants((prev) => prev.filter((p) => p.id !== userId))
    }

    const onCreateConversation = async () => {

      const participantIds = [userId, ...participants.map((p) => p.id)];

      try {
        const { data, errors } = await createConversation({
          variables: {
            participantIds,
          },
        });

        console.log(data, "create COnvoo")

        if (!data?.createConversation || errors) {
          throw new Error("Failed to create conversation");
        }

        const {
          createConversation: { conversationId },
        } = data;

        // Adds to the URL
        router.push({ query: { conversationId } });
  
        /**
         * Clear state and close modal
         * on successful creation
         */
        setParticipants([]);
        setUsername("");
        onClose();

      } catch (error: any) {
        console.error('onCreateConversation error', error);
        return toast.error(error?.message);
      }
    }

    const styles = {
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
  } 

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent 
        bg={styles.cardBg}
        borderColor={styles.border}
        borderWidth='1px'
        borderRadius='10px 35px 0 0'
        borderStyle='inset'
        pb={5}>
          <ModalHeader color={styles.title} textAlign='center'>Chat & Meet Someone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Input 
                     backgroundColor={styles.inputField}
                     focusBorderColor={styles.inputFieldFocus}
                     px={5}
                     variant='flushed'
                     placeholder="Enter a username"
                     value={username} 
                     onChange={(e) => setUsername(e.target.value)}
                     />
                     <Divider 
                     orientation='horizontal'
                     borderColor={styles.border}/>
                    <Button 
                    bg={styles.button}
                    _hover={styles.buttonHoverBg}
                    type="submit" 
                    disabled={!username} 
                    isLoading={loading}>
                        Search
                    </Button>
                </Stack>
            </form>
            {data?.searchUsers && 
            <UserSearchList 
            users={data?.searchUsers} 
            addParticipant={addParticipant} 
            />}
           {participants.length !== 0 && 
           <>
           <Participants 
            participants={participants} 
            removeParticipant={remmoveParticipant} />
            <Button
            bg={styles.facebookButtonBg}
            _hover={styles.facebookButtonHoverBg}
            mt={5}
            width='100%'
            type="button" 
            disabled={!username} 
            isLoading={loading}
            onClick={onCreateConversation}
            >
              Start Chat
            </Button>
           </>
           }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConversationModal
