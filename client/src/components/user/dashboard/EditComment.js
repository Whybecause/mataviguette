import React, { useState, useEffect } from 'react';
import {
    useToast,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Textarea,
    Spinner
} from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons';

import commentService from '../../../services/comment.service';

const EditComment = (props) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ loading, setLoading ] = useState(false);
    const [ text, setText ] = useState('');

    useEffect( () => {
        commentService.getUserComment(props.commentId)
        .then(res => {
            setText(res.data.text)
        })
        .catch(err => console.log(err))
    }, []);

    async function editComment(e) {
        e.preventDefault();
        setLoading(true);
        await commentService.updateUserComment(props.commentId, text)
        .then(
            res => {
                setLoading(false);
                props.setRefresh('edit')
                onClose();
                toast({
                    title: res.data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            },
            error => {
                setLoading(false);
                toast({
                    title: error.response.data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            }
        )
        .catch(err => console.log(err), setLoading(false))
    }

    return (
        <>
        <Button colorScheme='teal' size='xs' onClick={onOpen}  variant='solid' leftIcon={<ChatIcon/>}>Modifier commentaire
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <form>
                <ModalContent>
                    <ModalHeader>Modifiez votre commentaire sur ce séjour</ModalHeader>
                    <ModalBody>
                        <Textarea
                        value={text}
                        onChange={(e) => setText((e.target.value))}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' colorScheme='teal' disabled={loading} onClick={(e) => editComment(e)}>
                            {loading && (
                                <Spinner size='xs' />
                            )}
                            Envoyer
                        </Button>
                        <Button onClick={onClose}>Fermer</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
        </>
    )
}

export default EditComment;