import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import history from '../../helpers/history';
import {
  useToast,
  Button,
  Spinner,
  Box,
  Center,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import authService from "../../services/auth.service";

const ResetPassForm = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function handleResetPass(data) {
      setLoading(true);
      try {
        const res = await authService.resetPass(token, data.email, data.password, data.password2)
        setLoading(false);
        history.push("/login")
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
      <Box className="small-container small-page-height" p="5">
        <form onSubmit={handleSubmit(handleResetPass)}>
          <Center>
            <h3>Changez votre mot de passe</h3>
          </Center>
          <FormControl id="email" mt="10">
            <FormLabel htmlFor="email"></FormLabel>
            <Input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              placeholder="Votre adresse email"
              required
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password">
            <FormLabel htmlFor="password"></FormLabel>
            <Input
              {...register("password", { required: true })}
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
          <FormControl id="password2">
            <FormLabel htmlFor="password2"></FormLabel>
            <Input
              {...register("password2", { required: true })}
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirmez votre nouveau mot de passe"
              required
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            variant="outline"
            colorScheme="teal"
            w="100%"
            type="submit"
            disabled={loading}
            mt="5"
          >
            {loading && <Spinner size="xs" />}
            Confirmer
          </Button>
        </form>
      </Box>
  );
};

export default ResetPassForm;