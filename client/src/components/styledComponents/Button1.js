import React from 'react';
import { Box } from "@chakra-ui/react";

const Button1 = ({children, onClick, disabled}) => {
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
            bg="#FFCB2A"
            borderColor="#ccd0d5"
            color="#4b4f56"
            _hover={{ bg: "#ebedf0" }}
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
            disabled={disabled}
        >
        {children}
        </Box>
    )
}

export default Button1;