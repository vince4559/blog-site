
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FireBase';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogin = async() => {
        
        try {
          const result =  await signInWithEmailAndPassword(auth, email, password);
          toast({
            title: `login successful ${result.user.email}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          navigate('/home')
        } catch (error:any) {
        toast({
            title: error.message,
            status: 'warning',
            duration: 3000,
            isClosable: true,
            }) 
        }
      setemail('')
      setpassword
    }
  return(
   <Box>
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type={'email'} 
            name='email' 
            value={email}
            placeholder='Enter your email'
            onChange={e => setemail(e.target.value)}
            />
        </FormControl>
        
        <FormControl isRequired>
            <FormLabel>password</FormLabel>
            <Input type={'password'} 
            name='password' 
            placeholder='Enter your password'
            value={password}
            onChange={e => setpassword(e.target.value)}
            />
        </FormControl>
        <Button colorScheme={'red'} p={2} m={2}
        onClick={handleLogin}
        type='submit'>
            Login
         </Button>
   </Box>
  )
  }

export default Login
