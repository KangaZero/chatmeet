import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MessagesData, MessagesVariables } from "../../../../util/types";
import Messageoperations from "../../../../graphql/operations/message";
import toast from "react-hot-toast";
import SkeletonLoader from "../../../common/SkeletonLoader";


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

    if (error) {
        console.error(error)
        return null;
    }

    // console.log("messages", data?.messages)

    return (
        <Flex
        direction='column'
        justify='flex-end'
        overflow='hidden'
        >
            {loading && (
                <Stack spacing={4} px={3}>
                    <SkeletonLoader count={8} height='50px' width='270px' />
                </Stack>
            )}
            {data?.messages && (
                <Flex
                direction="column-reverse"
                overflow="auto"
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