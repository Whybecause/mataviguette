import React, { useState, useEffect } from 'react';
import { useToast, Button, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react"

import rentalCRUDService from '../../../services/rentalCRUD.service';

const UpdateRental = () => {
    const [ dailyRate, setDailyRate ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const toast = useToast()

    const handleChangeDailyRate = (dailyRate) => setDailyRate(dailyRate);
    
    useEffect( () => {
        rentalCRUDService.getMataviguette()
        .then( res => {
            setDailyRate(res.data.dailyRate);
        })
        .catch(err => console.log(err))
    }, []);

    async function updateRental(e) {
        e.preventDefault();
        setLoading(true);
        await rentalCRUDService.update({dailyRate})
        .then( 
            res => {
                setLoading(false);
                toast({
                    title: res.data.message,
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                })
            },
            error => {
                setLoading(false);
                toast({
                    title: error.response.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
        )
        .catch(err => console.log(err))

    }
    return (
        <>
        <div className="small-container">
            <form onSubmit={updateRental}>
                <FormControl id="dailyRate">
                    <FormLabel>Prix</FormLabel>
                    <NumberInput 
                        min={1}
                        value={dailyRate}
                        onChange={handleChangeDailyRate} 
                        >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Button colorScheme="teal" type="submit" disabled={loading} mt='5'>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                            )}
                        <span>Valider</span>
                    </Button>
                </FormControl>
            </form>
        </div>
        </>
    )
}

export default UpdateRental;