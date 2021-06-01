import React from 'react';
import { Box } from "@chakra-ui/react";

const Button2 = ({children, onClick}) => {
    return (
        <Box
            as="button"
            height="24px"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px"
            px="8px"
            borderRadius="2px"
            fontSize="14px"
            fontWeight="semibold"
            bg="#DC3545"
            borderColor="#ccd0d5"
            color="white"
            _hover={{ bg: "#ccd0d5" }}
            _active={{
              bg: "#dddfe2",
              transform: "scale(0.98)",
              borderColor: "#bec3c9",
            }}
            _focus={{
              boxShadow:
                "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
            onClick={onClick}
        >
        {children}
        </Box>
    )
}

export default Button2;