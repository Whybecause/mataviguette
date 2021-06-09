import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {
  useToast,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Center,
  Spinner,
} from "@chakra-ui/react";

import authService from "../../services/auth.service";

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors },} = useForm();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const mailRegex = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );

  async function handleRegister(data) {
    setLoading(true)
    try {
      const res = await authService.register(data)
      setLoading(false);
      reset();
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
      <Box className="small-container small-page-height" mt="5" p="5">
        <Box borderWidth="1px" borderRadius="xl" p='5' >
          <form onSubmit={handleSubmit(handleRegister)}>

            <Center mb='5'>
              <h2>Créer un compte</h2>
            </Center>

            <FormControl id="username">
              <FormLabel htmlFor="username"></FormLabel>
              <Input
                {...register("username", {
                  required: true,
                })}
                type="text"
                id="username"
                name="username"
                placeholder="Nom d'utilisateur"
                required
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="email">
              <FormLabel htmlFor="email"></FormLabel>
              <Input
                {...register("email", {
                  required: true,
                  pattern: mailRegex,
                })}
                type="email"
                id="email"
                name="email"
                placeholder="Adresse email"
                required
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="password" mt={4}>
              <FormLabel htmlFor="password"></FormLabel>
              <Input
                {...register("password", { required: true, minLength: 5 })}
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                minLength={5}
                placeholder="Mot de passe"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="password2" mt={4}>
              <FormLabel htmlFor="password2"></FormLabel>
              <Input
                {...register("password2", { required: true, minLength: 5 })}
                type="password"
                id="password2"
                name="password2"
                autoComplete="current-password"
                required
                minLength={5}
                placeholder="Confirmez votre mot de passe"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button disabled={loading} colorScheme="orange" variant="outline" mt="5" type="submit" width="100%">
              {loading && <Spinner size="xs" />}
              Valider
            </Button>
          </form>
        </Box>
        <Link to="login">
          <Button variant="outline" mt='5'>
              Déjà inscris ? Se connecter
          </Button>
        </Link>
      </Box>
  );
};

export default Register;
