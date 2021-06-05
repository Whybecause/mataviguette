import React, { useState } from 'react';
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

  const CustomModal = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, reset, formState: { errors },} = useForm()


    return (
      <>
              <Text>
            <a onClick={onOpen}>
            {props.buttonTitle}
            </a>
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
                <Button type="submit" disabled={props.loading}>
                    {props.loading && (
                        <Spinner size='xs' />
                    )}
                    Valider</Button>
                <Button onClick={onClose}>Fermer</Button>
            </ModalFooter>

                </form>
            </ModalContent>
        </Modal>

      </>
    )
  }

  export default CustomModal;