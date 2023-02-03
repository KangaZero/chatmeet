import { Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { SearchedUsers } from '../../../../util/types'

import {MdOutlineCancel} from 'react-icons/md';

type ParticipantsProps = {
    participants: Array<SearchedUsers>;
    removeParticipant: (userId: string) => void
}

const Participants: React.FC<ParticipantsProps> = ({participants, removeParticipant}) => {


    const styles = {
        cardBg: useColorModeValue('teal.50', 'whiteAlpha.50'),
        inputField: useColorModeValue('cyan.100', 'gray.700'),
        inputFieldFocus: useColorModeValue('orange.50','blackAlpha.300'),
        text: useColorModeValue('teal.900','yellow.50'),
        title: useColorModeValue('teal.900','yellow.50'),
        border: useColorModeValue('teal.900', 'yellow.50'),
        button: useColorModeValue('yellow.50', 'teal.900'),
        link: useColorModeValue('blue.500', 'blue.600'),
        user: useColorModeValue('yellow.100', 'blue.600'),
        linkHover: {color: useColorModeValue('blue.300', 'blue.700')},
        buttonHoverBg: {bg: useColorModeValue('teal.200', 'teal.700')},
        userHoverbg: {bg: useColorModeValue('cyan.200', 'cyan.600')},
        googleButtonBg: useColorModeValue('blue.200', 'blue.600'),
        googleButtonHoverBg:{bg:useColorModeValue('blue.500','blue.800')},
        facebookButtonBg: useColorModeValue('gray.300', 'gray.600'),
        facebookButtonHoverBg:{bg:useColorModeValue('gray.500','gray.800')}
    } 

  return (
    <Flex gap='10px' flexWrap='wrap'>
        {participants.map((participant) => {
            return (
                <Stack
                key={participant.id}
                bg={styles.button}
                _hover={styles.buttonHoverBg}
                mt={5}
                py={2}
                px={3}
                borderRadius='20px'
                direction="row"
                align='center'
                >
                    <Text>{participant.username}</Text>
                    <MdOutlineCancel 
                    size={20}
                    cursor='pointer'
                    onClick={() => removeParticipant(participant.id)}/>
                </Stack>
            );
        }) }
        
    </Flex>
  )
}

export default Participants;