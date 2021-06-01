import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import emailEdit from '@iconify/icons-mdi/email-edit';
import { Button1, Button2 } from '../../../styledComponents/Button-Wrapper';

import {
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure
  } from "@chakra-ui/react";

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
            <Button1 onClick={onOpen}>
                <Icon icon={emailEdit} />
            </Button1>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                <form>
                    <ModalContent>
                        <ModalHeader>Contacter le locataire</ModalHeader>
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
                                onClick={(e) => contactBooker(e)}
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

export default ContactBooker;