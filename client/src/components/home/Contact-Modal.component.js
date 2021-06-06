import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import {
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Spinner,
    Center
  } from "@chakra-ui/react";

  import formContactService from '../../services/formContact.service';

  const ContactModal = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);

    async function handleFormContact(data) {
      setLoading(true);
      try {
        const res = await formContactService.sendFormContact(data);
        setLoading(false);
        toast({
            position: 'top',
            title: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
        })
      }
      catch(error) {
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
      <>
      <Center>
        <Button onClick={onOpen}>Contacter Valérie</Button>
      </Center>
        <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay/>
                <form onSubmit={handleSubmit(handleFormContact)}>
                    <ModalContent>
                        <ModalHeader>Contacter Valérie</ModalHeader>
                        <ModalBody>
                          <FormControl id="name">
                            <FormLabel htmlFor="name"></FormLabel>
                            <Input
                              {...register("name", { required: true})}
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Votre nom"
                              required
                            />
                          <FormErrorMessage>
                          {errors.name && errors.name.message}
                        </FormErrorMessage>
                          </FormControl>

                          <FormControl id="email">
                            <FormLabel htmlFor="email"></FormLabel>
                            <Input
                              {...register("email", { required: true})}
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Votre email"
                              required
                            />
                          <FormErrorMessage>
                          {errors.email && errors.email.message}
                        </FormErrorMessage>
                          </FormControl>

                          <FormControl id="message">
                            <FormLabel htmlFor="message"></FormLabel>
                            <Input
                              {...register("message", { required: true})}
                              type="text"
                              id="message"
                              name="message"
                              placeholder="Votre message"
                              required
                            />
                          <FormErrorMessage>
                          {errors.message && errors.message.message}
                        </FormErrorMessage>
                          </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                mr='2'
                                disabled={loading}
                                >
                                {loading && (
                                    <Spinner size='xs'/>
                                    )}
                                    <span>Envoyer</span>
                            </Button>{' '}
                            <Button colorScheme='red' onClick={onClose}>Fermer</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>


      </>
    )
  }

  export default ContactModal;