import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const CloseButton = (props) => {
    return (
        <Button 
            onClick={props.onClick} 
            variant="outline" 
            colorScheme="red">
                <Icon as={CloseIcon}/>
        </Button>
    )
}

export default CloseButton;