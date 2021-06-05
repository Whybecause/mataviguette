import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = () => {
    return (
        <>
        <Box bgGradient="linear(to-r,gray.300,yellow.400,pink.200)" className="footer-height">
            <Box p='5' d='flex' alignItems='center' justifyContent='space-around'>
                <p>Mentions légales</p>
                <p>Contact</p>
            </Box>
        </Box>
        </>
    )
}

export default Footer;