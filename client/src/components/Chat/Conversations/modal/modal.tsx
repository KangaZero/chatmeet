import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Session } from "next-auth";

interface ConversationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConversationModal: React.FC<ConversationModalProps> = ({ isOpen, onClose }) => {

    
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> HI </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConversationModal
