import React from 'react';
import { useForm } from "react-hook-form";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    useDisclosure,
    Text,
    Spinner
  } from "@chakra-ui/react";
  import { CloseButton } from '../styledComponents/Button-Wrapper';

  const CustomModal = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors },} = useForm()


    return (
      <React.Fragment>
              <Text>
            <Button variant="link" onClick={onOpen}>
            {props.buttonTitle}
            </Button>
            </Text>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{props.header}</ModalHeader>
            <form onSubmit={handleSubmit(props.handleConfirm)}>

            <ModalBody pb={6}>
                <FormControl id="email">
                  <FormLabel htmlFor="email"></FormLabel>
                  <Input
                    {...register("email", {
                        required: true
                    })}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Votre adresse email"
                    required
                    />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button mr='2' colorScheme="teal" variant="outline" type="submit" disabled={props.loading}>
                    {props.loading && (
                        <Spinner size='xs' />
                    )}
                    Valider</Button>
                <CloseButton onClick={onClose}/>
            </ModalFooter>

                </form>
            </ModalContent>
        </Modal>
        </React.Fragment>
    )
  }

  export default CustomModal;