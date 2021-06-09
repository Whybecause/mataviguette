import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';
import {
  Stack,
  useToast,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Center,
  Divider,
  Spinner
} from "@chakra-ui/react";

import history from '../../helpers/history';
import authService from "../../services/auth.service";
import CustomModal from './CustomModal.component';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm()
  const toast = useToast()
  const [ loading, setLoading ] = useState(false);

  async function handleLogin(data) {
    setLoading(true);
    try {
      await authService.login(data)
      history.push('/')
      window.location.reload();
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

  async function handleSendResetPassword(data) {
    setLoading(true);
    try {
      const res = await authService.sendMailResetPass(data)
      setLoading(false);
      reset();
      toast({
          position: 'top',
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
      })
    }
    catch(error) {
        setLoading(false);
        reset();
        toast({
          position: 'top',
          title: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
      })
    }
}

  async function handleResendConfirm(data) {
    setLoading(true);
    try {
      const res = await authService.resendConfirmAccount(data)
      setLoading(false);
      reset();
      toast({
          position: 'top',
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
      })
    }
    catch(error) {
        setLoading(false);
        reset();
        toast({
          position: 'top',
          title: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
      })
    }
}

  return (
    <Box className="small-container small-page-height" mt='5' p='5'>
      <Box borderWidth="1px" borderRadius="xl" p='5' d='flex' alignItems="center" justifyContent="center">
        <form onSubmit={handleSubmit(handleLogin)}>
                <Center mb='5'>
                  <h2>Se connecter</h2>
                  </Center>
                <FormControl id="email">
                  <FormLabel htmlFor="email"></FormLabel>
                  <Input
                    {...register("email", {
                      required: true,
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
                <Button
                colorScheme="orange"
                variant="outline"
                disabled={loading}
                mt='5'
                type="submit"
                width="100%">
                  {loading && (
                    <Spinner size='xs' />
                  )}
                  Connexion
                </Button>
                <Divider />
                
                <Box d='flex'mt='5'>
                  <Stack>
                    <CustomModal 
                    buttonTitle='Mot de passe oublié?' 
                    header='Réinitialisez votre mot de passe'
                    loading={loading}
                    handleConfirm={handleSendResetPassword}
                    />
                    <CustomModal 
                    buttonTitle='Renvoi de la validation du compte' 
                    header='Recevez un nouveau mail de validation'
                    loading={loading}
                    handleConfirm={handleResendConfirm}
                    />
                    <Link to="/register">                  
                    < Button variant="outline">
                        <p>
                          Créer un compte
                        </p>
                      </Button>
                    </Link>
                  </Stack>
                </Box>
            </form>


      </Box>
    </Box>
  )
}

export default Login;
