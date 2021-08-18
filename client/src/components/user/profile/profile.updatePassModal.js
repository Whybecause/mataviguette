import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useToast, Modal, useDisclosure, Button, Spinner,  Input, FormControl, FormLabel, FormErrorMessage, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from '@chakra-ui/react';
import { CloseButton } from '../../styledComponents/Button-Wrapper';
import authService from "../../../services/auth.service";

const UpdatePassModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);

    async function handleUpdatePassword(data) {
        setLoading(true);
        try {
            const res = await authService.updatePassword(data);
            setLoading(false);
            onClose();
            reset();
            toast({
                position: 'top',
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })   
        }
        catch (error) {
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
            <Button onClick={onOpen}>Modifier mon mot de passe</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modifier mon mot de passe</ModalHeader>
                            <form onSubmit={handleSubmit(handleUpdatePassword)}>
                        <ModalBody>
                                <FormControl id="oldPass">
                                    <FormLabel htmlFor="oldPass"></FormLabel>
                                    <Input
                                        {...register("oldPass", {
                                            required: true
                                        })}
                                        type="password"
                                        id="oldPass"
                                        name="oldPass"
                                        placeholder="Mot de passe actuel"
                                        required
                                    />
                                    <FormErrorMessage>
                                        {errors.oldPass && errors.oldPass.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl id="password">
                                    <FormLabel htmlFor="password"></FormLabel>
                                    <Input
                                        {...register("password", {
                                            required: true
                                        })}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Nouveau mot de passe"
                                        required
                                    />
                                    <FormErrorMessage>
                                        {errors.password && errors.password.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl id="confirmNewPass">
                                    <FormLabel htmlFor="confirmNewPass"></FormLabel>
                                    <Input
                                        {...register("confirmNewPass", {
                                            required: true
                                        })}
                                        type="password"
                                        id="confirmNewPass"
                                        name="confirmNewPass"
                                        placeholder="Confirmer nouveau mot de passe"
                                        required
                                    />
                                    <FormErrorMessage>
                                        {errors.confirmNewPass && errors.confirmNewPass.message}
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

export default UpdatePassModal;