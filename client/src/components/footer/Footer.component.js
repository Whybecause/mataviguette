import React from 'react';
import { Box } from '@chakra-ui/react';

import FooterContact from './Footer-Contact.component';
import FooterMentions from './Footer-Mentions.component';

const Footer = () => {
    return (
        <React.Fragment>
        <Box bgGradient="linear(to-r,gray.300,yellow.400,pink.200)" className="footer-height">
            <Box p='5' d='flex' alignItems='center' justifyContent='space-around'>
                <FooterMentions />
                <FooterContact/>
            </Box>
        </Box>
        </React.Fragment>

    )
}

export default Footer;