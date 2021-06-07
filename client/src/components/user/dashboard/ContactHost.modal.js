import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { EmailIcon } from '@chakra-ui/icons';
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
    FormControl,
    FormLabel,
    FormErrorMessage,
    Spinner,
    Textarea
} from "@chakra-ui/react";

import { CloseButton } from '../../styledComponents/Button-Wrapper';
import formContactService from '../../../services/formContact.service';

const ContactHost = (props) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);

    async function contactHost(data) {
        setLoading(true);
        try {
            const res = await formContactService.sendEmailToHost(data.message, props.id)
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
        catch (error) {
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
        <>
            <Button colorScheme='teal' size='md' onClick={onOpen} leftIcon={<EmailIcon/>} variant='solid'>Contact
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                <form onSubmit={handleSubmit(contactHost)}>
                    <ModalContent>
                        <ModalHeader>Contactez moi pour plus d'informations</ModalHeader>
                        <ModalBody>
                            <FormControl id="message">
                                <FormLabel htmlFor="message"></FormLabel>
                                <Textarea 
                                    {...register("message", {
                                    required: true,
                                    })}
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
                            <Button
                                mr="2"
                                type='submit'
                                variant="outline"
                                colorScheme="teal"
                                disabled={loading}
                                >
                                {loading && (
                                    <Spinner size='xs' />
                                    )}
                                <span>Envoyer</span>
                            </Button>
                            <CloseButton onClick={onClose} />
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>

        </>
    )
}

export default ContactHost;