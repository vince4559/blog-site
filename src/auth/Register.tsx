import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/FireBase';


const Register = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    let navigate =  useNavigate();
    const toast = useToast()


    const handleReg = async(e:React.FormEvent) => {
         try {
         await createUserWithEmailAndPassword(auth, email, password);
          
            toast({
                title: `Registration Succesfull. welcome ${name}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
            
            navigate('/home');
         } catch (error:any) {
            toast({
                title: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
         }
         setname('')
         setemail('')
      setpassword('')
    }

  return (
    <Box>
            <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type={'text'} 
                    name='name' 
                    placeholder='Enter your name'
                    value={name}
                    onChange={e => setname(e.target.value)}
                    />
                </FormControl>
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
                onClick={ handleReg}
                type='submit'>
                    Register
                </Button>
    </Box>
  )
}

export default Register
