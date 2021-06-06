import React, { useEffect, useState } from 'react';
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Avatar,
    Stack,
    Text,
    Box,
    SimpleGrid,
    Icon
  } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import commentService from '../../services/comment.service';  
import { authIcon } from '../../assets/auth-icon.png';
  const Comments = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        commentService.getAllComments(setComments);
    }, []);

    return (
        <>
        <Button variant="link" className="pointer" onClick={onOpen}>Voir les commentaires ({comments.length})</Button>
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size='full'>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Box d='flex' alignItems='center' justifyContent='space-around'>
                        Liste des commentaires
                        <Button onClick={onClose}><Icon as={CloseIcon}/></Button>
                    </Box>
                </ModalHeader>
                    <ModalBody>
                        <SimpleGrid columns={[1, 2, 2]}>
                            {comments?.length && (
                                comments.map( (comment) => (
                                    <Box as='article' mt='5' key={comment._id}>
                                        <Stack direction='row'>
                                            <Avatar size='xs' src={authIcon} alt="cover" />
                                            <Text>{comment.author.username ? comment.author.username : 'Supprimé'}</Text>
                                        </Stack>
                                        <Stack>
                                            <p className="p-discret">{dayjs(comment.updatedAt).format('DD/MM/YYYY ')}</p>
                                            <Text>{comment.text}</Text>
                                        </Stack>
                                    </Box>
                                ))
                            )}
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}><Icon as={CloseIcon}/></Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>

        </>
    )
}

export default Comments;