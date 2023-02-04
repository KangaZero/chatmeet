import { Box, Flex } from "@chakra-ui/react";
import { Session } from "next-auth"
import { useRouter } from "next/router";


interface FeedWrapperProps {
    session: Session
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({session}) => {

  const router = useRouter();

  const {conversationId} = router.query;

  return (
    <Flex 
    // on mobile devices show nothing if no convo but always show for desktop
      display={{base: conversationId ? 'flex' : 'none', md: 'flex'}}
      width='100%'
      direction='column'
      border='1px solid orange'>

    {conversationId ? (
      <Flex
        mx='auto'>
        {conversationId}
        </Flex>
    ) : (
      <Box>
        <h1>Loading...</h1>
      </Box>
    )}
  </Flex>
  
  )
}

export default FeedWrapper