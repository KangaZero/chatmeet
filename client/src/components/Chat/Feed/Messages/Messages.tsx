import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MessagesData, MessagesVariables } from "../../../../util/types";
import Messageoperations from "../../../../graphql/operations/message";
import toast from "react-hot-toast";


interface MessagesProps {
    userId: string;
    conversationId: string; 
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {

    const { data, loading, error } = useQuery<MessagesData, MessagesVariables>(
        Messageoperations.Queries.messages,
        {
            variables: {
                conversationId
            },
            onError: ({ message }) => {
                toast.error(message)
            },
            onCompleted: () => {
                console.log('completed')
            }
        }
    )

    console.log("messages", data)

    return (
        <Flex
        direction='column'
        justify='flex-end'
        overflow='hidden'
        >
            {loading && (
                <Stack>
                    <h1>Loading...</h1>   
                </Stack>
            )}
            {data?.messages && (
                <Flex
                direction="column-reverse"
                overflow="scroll"
                height="100%"
                >
                    {data.messages.map(message => (
                        <Stack
                        key={message.id}
                        direction={message.senderId === userId ? 'row-reverse' : 'row'}
                        >
                            {/* <h1>{message.senderId}</h1> */}
                            <h1>{message.body}</h1>
                        </Stack>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}

export default Messages;