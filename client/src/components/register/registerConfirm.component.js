import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useToast, Button, Spinner, Box, Center, Input, FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react';

import history from "../../helpers/history";
import authService from "../../services/auth.service";

const RegisterConfirm = () => {
    const { token } = useParams();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const toast = useToast()
    const [ loading, setLoading ] = useState(false);

    async function handleConfirmAccount(data) {
        setLoading(true);
        try {
            const res = await authService.confirmAccount(token, data.email)
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
            reset();
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
            <Box className="small-container small-page-height" p='5'>
                <form onSubmit={handleSubmit(handleConfirmAccount)}>
                    <Center><h3>Confirmez votre compte</h3></Center>
                    <FormControl id="email" mt='10'>
                        <FormLabel htmlFor="email"></FormLabel>
                        <Input
                            {...register("email", { required: true})}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Indiquez l'adresse email du compte à valider"
                            required
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button variant="outline" colorScheme="teal" w='100%' type="submit" disabled={loading} mt='5'>
                        {loading && (
                        <Spinner size='xs' />
                        )}
                        Confirmer
                    </Button>
                </form>
            </Box>
    )
}

export default RegisterConfirm;