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
    Center,
    Textarea
  } from "@chakra-ui/react";
  import { EmailIcon } from '@chakra-ui/icons';

  import { CloseButton } from '../styledComponents/Button-Wrapper';
  import formContactService from '../../services/formContact.service';

  const ContactModal = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [ loading, setLoading ] = useState(false);

    async function handleFormContact(data) {
      setLoading(true);
      try {
        const emailObject = 'Nouveau message depuis le formulaire de contact';
        const res = await formContactService.sendFormContact(data, emailObject);
        setLoading(false);
        toast({
            position: 'top',
            title: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        onClose();
        reset();
      }
      catch(error) {
        setLoading(false);
        onClose();
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
      <Center>
        <Button colorScheme="" variant="outline" onClick={onOpen} leftIcon={<EmailIcon/>}>Contacter Valérie</Button>
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
                            <Textarea
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
                                colorScheme="teal"
                                variant="outline"
                                >
                                {loading && (
                                    <Spinner size='xs'/>
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

  export default ContactModal;