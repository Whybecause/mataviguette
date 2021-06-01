import React from "react";
import { Button1, Button2 } from '../../styledComponents/Button-Wrapper';
import {
    useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/react";
import commentService from '../../../services/comment.service';

const DeleteComment = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  async function deleteComment(commentId) {
    await commentService.deleteUserComment(commentId)
    .then(
        res => {
            props.setRefresh('delete');
            onClose();
            toast({
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        },
        error => {
            toast({
                title: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    )
    .catch(err => console.log(err))
  }

  return (
    <>
      <Button2 onClick={onOpen}>
        Supprimer commentaire
      </Button2>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader >Êtes  vous sur de supprimer ce commentaire?</ModalHeader>
            <ModalFooter>
              <Button2
                onClick={ () => deleteComment(props.commentId)}
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

export default DeleteComment;
