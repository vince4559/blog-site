import React from 'react'
import { Button, Grid, GridItem, HStack } from "@chakra-ui/react"
import ArticleForm from '../components/ArticleForm'
import Blog from '../components/Blog'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/FireBase';
import { signOut } from 'firebase/auth'

const Home = () => {
  const [user] = useAuthState(auth);
  return (

    <section>
       {
          user && (
              <HStack p={1} bg='blackAlpha.100' justify={'space-around'}>
                <span>signed in as {user.displayName || user.email}</span>
                <Button colorScheme={'none'} color='red'
                onClick={() => signOut(auth)}
                >
                  LogOut
                </Button>
              </HStack>
          )
      }
       
    <Grid templateColumns="repeat(4, 1fr)">
      <GridItem colSpan={[4,4,3,3]}>
        <Blog />
      </GridItem>
      <GridItem colSpan={[4,4,1,1]}>
        <ArticleForm />
      </GridItem>
    </Grid>
   </section>
  )
}

export default Home
