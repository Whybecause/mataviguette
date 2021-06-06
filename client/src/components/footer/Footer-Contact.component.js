import React from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  Divider,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { EmailIcon } from '@chakra-ui/icons';
import { CloseButton } from '../styledComponents/Button-Wrapper';

const FooterContact = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="link" onClick={onOpen}>
        Contact
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
              <h2><Center>Contact</Center></h2>
            <CloseButton onClick={onClose} />
            </ModalHeader>
          <ModalBody>
                <List>
                    <ListItem>
                        <h4>Contacter le propriétaire de la Mataviguette</h4>
                        <ListIcon as={EmailIcon} color="orange.500"  />mataviguette@gmail.com
                    </ListItem>
                    <Divider mt='5'/>
                    <ListItem mt='5'>
                        <h4>Pour toute demande ou problème relatif à l'utilisation du site</h4>
                        <ListIcon as={EmailIcon} color="orange.500"  />dev@mataviguette.fr
                    </ListItem>
                </List>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FooterContact;