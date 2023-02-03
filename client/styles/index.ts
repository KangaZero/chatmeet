import { useContext } from 'react';
import { useColorModeValue } from "@chakra-ui/react";

export const customStyles = {
    cardBg: useColorModeValue('teal.50', 'whiteAlpha.50'),
    inputField: useColorModeValue('cyan.100', 'gray.700'),
    inputFieldFocus: useColorModeValue('orange.50','blackAlpha.300'),
    text: useColorModeValue('teal.900','yellow.50'),
    title: useColorModeValue('teal.900','yellow.50'),
    border: useColorModeValue('teal.900', 'yellow.50'),
    button: useColorModeValue('yellow.50', 'teal.900'),
    link: useColorModeValue('blue.500', 'blue.600'),
    linkHover: {color: useColorModeValue('blue.300', 'blue.700')},
    buttonHoverBg: {bg: useColorModeValue('teal.200', 'teal.700')},
    googleButtonBg: useColorModeValue('blue.200', 'blue.600'),
    googleButtonHoverBg:{bg:useColorModeValue('blue.500','blue.800')},
    facebookButtonBg: useColorModeValue('gray.300', 'gray.600'),
    facebookButtonHoverBg:{bg:useColorModeValue('gray.500','gray.800')}
} 

