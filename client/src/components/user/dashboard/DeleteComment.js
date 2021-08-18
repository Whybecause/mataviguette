import React, { useState } from "react";
import { Button2 } from '../../styledComponents/Button-Wrapper';
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Button,
  Spinner
} from "@chakra-ui/react";
import commentService from '../../../services/comment.service';

const DeleteComment = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [ loading, setLoading ] = useState(false);

  async function deleteComment(commentId) {
    setLoading(true);
    try {
      const res = await commentService.deleteUserComment(commentId)
      props.setRefresh('delete');
      setLoading(false);
      onClose();
      toast({
          position: 'top',
          title: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
      })
    }
    catch(error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Button2 onClick={onOpen}>
        Supprimer commentaire
      </Button2>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader >Êtes  vous sur de supprimer votre commentaire?</ModalHeader>
            <ModalFooter>
              <Button
              colorScheme="red"
                mr='2'
                onClick={ () => deleteComment(props.commentId)}
                >
                {loading && (
                    <Spinner size='xs' />
                )}
                  Oui
              </Button>
              <Button onClick={onClose}>
                Non
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
      </React.Fragment>
  );
};

export default DeleteComment;
