import React, { useState } from 'react';
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

const AddComment = (props) => {
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState('');

    async function submitComment(e) {
        e.preventDefault();
        setLoading(true);
        await commentService.submitComment(props.id, message)
        .then(
            res => {
                setLoading(false);
                props.setRefresh('add')
                toast({
                    title: res.data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            },
            error => {
                setLoading(false);
                toast({
                    title: error.response.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
        )
        .catch(err => console.log(err), setLoading(false))
    }

    return (
        <>
        <Button colorScheme='teal' size='md' onClick={onOpen}  variant='solid' leftIcon={<ChatIcon/>}>Commenter
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <form>
                <ModalContent>
                    <ModalHeader>Laissez vos impresions sur votre séjour</ModalHeader>
                    <ModalBody>
                        <Textarea
                        value={message}
                        onChange={(e) => setMessage((e.target.value))}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' colorScheme='teal' disabled={loading} onClick={(e) => submitComment(e)}>
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

export default AddComment;