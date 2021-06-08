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
    Divider
  } from "@chakra-ui/react";
import dayjs from 'dayjs';
import { ChatIcon } from '@chakra-ui/icons';

import { CloseButton } from '../styledComponents/Button-Wrapper';
import commentService from '../../services/comment.service';  
import  authIcon  from '../../assets/auth-icon.png';
import airbnbComments from '../../airbnb-comments.json';

  const Comments = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        commentService.getAllComments(setComments);
    }, []);

    const commentsLength = comments.length + airbnbComments.length;

    return (
        <React.Fragment>
        <Button variant="link" className="pointer" onClick={onOpen} leftIcon={<ChatIcon/>}>Voir les commentaires ({commentsLength})</Button>
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size='full'>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Box d='flex' alignItems='center' justifyContent='space-between'>
                        Liste des commentaires
                        <CloseButton onClick={onClose} />
                    </Box>
                </ModalHeader>
                    <ModalBody>
                        <SimpleGrid columns={[1, 2, 2]}>
                            {comments.length ? (
                                comments.map( (comment) => (
                                    <Box as='article' mt='5' key={comment._id}>
                                        <Divider mb='5'/>
                                        <Stack direction='row'>
                                            <Avatar size='xs' src={authIcon} alt="cover" />
                                            <Text>{comment.author.username ? comment.author.username : 'Supprimé'}</Text>
                                        </Stack>
                                        <Stack>
                                            <p className="p-discret">{dayjs(comment.updatedAt).format('MM/YYYY ')}</p>
                                            <Text>{comment.text}</Text>
                                        </Stack>
                                    </Box>
                                ))
                            ) : null}
                            {airbnbComments.map( (airbnb) => (
                                <Box mt='5' key={airbnb.id}>
                                    <Divider mb='5'/>
                                    <Stack direction='row'>
                                        <Avatar size='xs' src={authIcon} alt="cover" />
                                        <Text>{airbnb.author}</Text>
                                    </Stack>
                                    <Stack>
                                        <p className="p-discret">{airbnb.createdAt}</p>
                                        <Text>{airbnb.text}</Text>
                                    </Stack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <CloseButton/>
                    </ModalFooter>
            </ModalContent>
        </Modal>
        </React.Fragment>
    )
}

export default Comments;