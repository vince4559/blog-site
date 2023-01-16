import { Flex, Heading, HStack, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/FireBase';
import { AuthModal } from '../auth/AuthModal';



const Navbar = () => {
const [user] = useAuthState(auth);

    return (
        <HStack w='100vw' px={'2rem'} bg='darkcyan' p={4} pos='sticky' top={0} zIndex={1}>
            <Flex alignSelf={'center'} justify='flex-start' w='100%' >
            <NavLink to={'/home'} style={({ isActive }) => isActive ? { color: 'white' } : { color: 'blue' }}>
                <Heading size={'md'} color='blackAlpha.800'>My Blog</Heading>
                </NavLink>
            </Flex>

                <HStack  justify={'space-evenly'} wrap='wrap' w='100%'>
                {/* <NavLink to={'/home'} style={({ isActive }) => isActive ? { color: 'white' } : { color: 'blue' }}>
                <Heading size={'md'} color='blackAlpha.800'>My Blog</Heading>
                </NavLink> */}

                
                       <AuthModal />
                </HStack>
        </HStack>
    )
}

export default Navbar
