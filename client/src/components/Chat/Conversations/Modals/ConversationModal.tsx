import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Stack, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import UserOperations from '../../../../graphql/operations/user';
import { SearchUsersData, SearchUsersInput } from "../../../../util/types";
import { useLazyQuery } from '@apollo/client';

interface ConversationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ isOpen, onClose }) => {

    const [username, setUsername] = useState('');
    // useLazy only works when specified
    const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
    >(UserOperations.Queries.searchUsers);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        searchUsers({ variables: { username }})
    };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='#2d2d2d' pb={5}>
          <ModalHeader textAlign='center'>Chat & Meet Someone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Input 
                    placeholder="Enter a username"
                     value={username} 
                     onChange={(e) => setUsername(e.target.value)}
                     />
                    <Button type="submit" disabled={!username}>
                        Search
                    </Button>
                </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConversationModal
