import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Icon, useToast, Modal, useDisclosure, Button, Spinner,  Input, FormControl, FormLabel, FormErrorMessage, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import { CloseButton } from '../../styledComponents/Button-Wrapper';
import authService from "../../../services/auth.service";

const UpdateEmailModal = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);

    async function handleUpdateEmail(data) {
        setLoading(true);
        try {
            const res = await authService.updateEmail(data);
            setLoading(false);
            props.setUserEmail(data.email);
            onClose();
            reset();
            toast({
                position: 'top',
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })   
        } catch (error) {
            setLoading(false);
            toast({
                position: 'top',
                title: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <React.Fragment>
                <Icon as={EditIcon} onClick={onOpen} />
                <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modifier mon email</ModalHeader>
                            <form onSubmit={handleSubmit(handleUpdateEmail)}>
                        <ModalBody>
                                <FormControl id="email">
                                    <FormLabel htmlFor="email"></FormLabel>
                                    <Input
                                        {...register("email", {
                                            required: true
                                        })}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Nouvel email"
                                        required
                                    />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl id="confirmNewEmail">
                                    <FormLabel htmlFor="confirmNewEmail"></FormLabel>
                                    <Input
                                        {...register("confirmNewEmail", {
                                            required: true
                                        })}
                                        type="email"
                                        id="confirmNewEmail"
                                        name="confirmNewEmail"
                                        placeholder="Confirmer nouvel email"
                                        required
                                    />
                                    <FormErrorMessage>
                                        {errors.confirmNewEmail && errors.confirmNewEmail.message}
                                    </FormErrorMessage>
                                </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button mr='2' colorScheme="teal" type="submit" variant="outline" disabled={loading} alignItems='center'>
                                {loading && (
                                    <Spinner size='xs'/>
                                    )}
                                Valider</Button>
                            <CloseButton onClick={onClose} />
                        </ModalFooter>
                                    </form>
                    </ModalContent>
                </Modal>

        </React.Fragment>
    )
}

export default UpdateEmailModal;