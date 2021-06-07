import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Icon,
  Button
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';

const DeleteBooking = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <Button colorScheme="red" onClick={onOpen} ml='2'>
        <Icon as={DeleteIcon} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader >Êtes  vous sur de supprimer cette réservation?</ModalHeader>
            <ModalFooter>
              <Button
                onClick={ () => props.deleteBooking(props.startAt)}
                colorScheme="red"
                mr="2"
                >
                  Oui
              </Button>
              <Button onClick={onClose} colorScheme="teal" variant="outline">
                Non
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteBooking;
