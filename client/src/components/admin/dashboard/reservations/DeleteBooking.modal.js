import React from "react";
import { Button1, Button2 } from '../../../styledComponents/Button-Wrapper';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/react";

const DeleteBooking = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <Button2 onClick={onOpen}>
        X
      </Button2>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader >Êtes  vous sur de supprimer cette réservation?</ModalHeader>
            <ModalFooter>
              <Button2
                onClick={ () => props.deleteBooking(props.startAt)}
                >
                  Oui
              </Button2>
              <Button1 onClick={onClose}>
                Non
              </Button1>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteBooking;
