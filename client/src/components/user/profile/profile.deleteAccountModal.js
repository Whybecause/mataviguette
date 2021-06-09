import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Icon, useToast, Modal, useDisclosure, Button, Spinner,  Input, FormControl, FormLabel, FormErrorMessage, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

import history from '../../../helpers/history';
import { CloseButton } from '../../styledComponents/Button-Wrapper';
import authService from "../../../services/auth.service";

const DeleteAccountModal = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);

    async function handleDeleteAccount(data) {
        setLoading(true);
        if (data.email !== props.email) {
            setLoading(false);
            return toast({
                position: 'top',
                title: "L'email est erronné",
                status: "error",
                duration: 3000,
                isClosable: true,
            })  
        }
        try {
            const res = await authService.deleteUser();
            setLoading(false);
            toast({
                position: 'top',
                title: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            authService.logout();
            // permet de ne plus afficher les infos de l'user dans la nav
            props.setUser(null); 
            history.push("/");
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
            <Button colorScheme="red" variant="outline" onClick={onOpen}>
                <Icon as={WarningTwoIcon} align="center" />
                Supprimer mon compte</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>La suppression du compte est définitive</ModalHeader>
                    <form onSubmit={handleSubmit(handleDeleteAccount)}>
                        <ModalBody>
                            <FormControl id="email">
                                <FormLabel htmlFor="email"></FormLabel>
                                <Input
                                    {...register("email", { required: true})}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Confirmez votre email"
                                    required
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button mr='2' colorScheme="teal" type="submit" variant="outline" disabled={loading} alignItems='center'>
                                {loading && (
                                    <Spinner size='xs'/>
                                    )}
                                Valider
                            </Button>
                            <CloseButton onClick={onClose} />
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteAccountModal;