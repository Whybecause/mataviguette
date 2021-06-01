import React, { useState } from 'react';

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
} from "@chakra-ui/react";

import { Button1, Button2 } from '../../styledComponents/Button-Wrapper';
import formContactService from '../../../services/formContact.service';

const ContactHost = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);
    const [ message, setMessage ] = useState('');

    function resetForm() { setMessage('');}

    async function contactHost(e) {
        e.preventDefault();
        setLoading(true);
        await formContactService.sendEmailToHost(message, props.id)
        .then(res => {
            setLoading(false);
            resetForm();
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
        })
        .catch(err => {
            console.log(err);
        })
    }



    
    return (
        <>
            <Button colorScheme='teal' size='md' onClick={onOpen} leftIcon={<EmailIcon/>} variant='solid'>Contact
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                <form>
                    <ModalContent>
                        <ModalHeader>Contactez moi pour plus d'informations</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="message"
                                    id='message'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message"
                                    required
                                    />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button1
                                type='submit'
                                onClick={(e) => contactHost(e)}
                                disabled={loading}
                                >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Envoyer</span>
                            </Button1>{' '}
                            <Button2 onClick={onClose}>Fermer</Button2>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>

        </>
    )
}

export default ContactHost;