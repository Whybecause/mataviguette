import React, { useState } from 'react';
import { useForm } from "react-hook-form";
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
    Spinner,
    FormControl,
    FormLabel,
    FormErrorMessage
} from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons';

import { CloseButton } from '../../styledComponents/Button-Wrapper';
import commentService from '../../../services/comment.service';

const AddComment = (props) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ loading, setLoading ] = useState(false);

    async function submitComment(data) {
        setLoading(true);
        try {
            const res = await commentService.submitComment(props.id, data.message)
            props.setRefresh('add');
            setLoading(false);
            toast({
                position: 'top',
                title: res.data.message,
                status: "success",
                duration: 2000,
                isClosable: true
            })
            onClose();
            reset();
        }
        catch(error) {
            setLoading(false);
            toast({
                position: 'top',
                title: error.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true
            })
        }
    }

    return (
        <React.Fragment>
        <Button colorScheme='teal' size='md' onClick={onOpen}  variant='solid' leftIcon={<ChatIcon/>}>Commenter
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay/>
            <form onSubmit={handleSubmit(submitComment)}>
                <ModalContent>
                    <ModalHeader>Laissez vos impresions sur votre séjour</ModalHeader>
                    <ModalBody>
                        <FormControl id="message">
                            <FormLabel htmlFor="message"></FormLabel>
                            <Textarea
                            {...register("message", {required: true,})}
                            type="text"
                            id="message"
                            name="message"
                            placeholder="Entrez notre message"
                            required
                            />
                            <FormErrorMessage>
                                {errors.message && errors.message.message}
                            </FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr='2' type='submit' colorScheme='teal' variant="outline" disabled={loading}>
                            {loading && (
                                <Spinner size='xs' />
                            )}
                            Envoyer
                        </Button>
                        <CloseButton onClick={onClose} />
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    </React.Fragment>

    )
}

export default AddComment;