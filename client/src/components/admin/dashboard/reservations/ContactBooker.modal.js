import React, { useState } from 'react';

import {
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Icon,
    Button,
    FormControl,
    FormLabel,
    Textarea
  } from "@chakra-ui/react";
import { EmailIcon } from '@chakra-ui/icons';

import { CloseButton } from '../../../styledComponents/Button-Wrapper';
import formContactService from '../../../../services/formContact.service';

const ContactBooker = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState('');

    function resetForm() { setMessage('');}

    async function contactBooker(e) {
        e.preventDefault();
        setLoading(true);
        await formContactService.sendEmailToBooker(message, props.id)
        .then(res => {
            setLoading(false);
            resetForm();
            onClose();
            toast({
                position: 'top',
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
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <Button colorScheme="teal" onClick={onOpen}>
                <Icon as={EmailIcon}/>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                <form>
                    <ModalContent>
                        <ModalHeader>Contacter le locataire</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor="message">Message</FormLabel>
                                <Textarea
                                    type="text"
                                    name="message"
                                    id='message'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message"
                                    required
                                    />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                onClick={(e) => contactBooker(e)}
                                colorScheme="teal"
                                variant="outline"
                                mr='2'
                                disabled={loading}
                                >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Envoyer</span>
                            </Button>
                            <CloseButton onClick={onClose} />
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </React.Fragment>
    )
}

export default ContactBooker;