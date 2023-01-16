
import { Box, Button, FormControl, FormLabel, Heading, Input, Progress, useToast } from '@chakra-ui/react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { ChangeEvent, useState } from 'react'
import { db, storage } from '../config/FireBase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/FireBase';
import { Link } from 'react-router-dom'



type InitialProps = {
    title: string,
    description: string,
    image: any,
    createdAt: Date
}



const ArticleForm = () => {
    const [user] = useAuthState(auth);
    const initial = {
        title: '',
        description: '',
        image: '',
        createdAt: Timestamp.now().toDate()
    };

const [formData, formDataSet] = useState<InitialProps>(initial);
const [progres, setProgress] = useState(0);

const toast = useToast()

const handleChange = (event:React.FormEvent) => {
    const { name, value}:any = event.target;
    formDataSet({...formData,
    [name]:value
    })
}

const handleImageChange = (event:ChangeEvent<HTMLInputElement>, index:number) => {
   const {files}:any = event.target;
   formDataSet({...formData, image:files[index]})
}   

const onSubmit = (e:React.SyntheticEvent) => {
    const storageRef = ref(storage, `/images/${Date.now()}${formData.image}${formData.title}`)
   const uploadImage = uploadBytesResumable(storageRef, formData.image);
    uploadImage.on('state_changed' ,
    (snapshot) => {
        const progresPercent = 
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
        setProgress(progresPercent);
    },
    (err) => {
        console.log(err)
    },
    () => {
        // formDataSet({
        // title: '',
        // description: '',
        // })
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const articleref = collection(db, 'blog');
            addDoc(articleref, {
                title: formData.title,
                description: formData.description,
                imageUrl: url,
                createdAt: Timestamp.now().toDate()
            })
            .then(() => {
                toast({
                    title: 'Post created.',
                    description: "We've created your Post for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
                setProgress(0)
            })
            .catch((err) => {
                toast({
                    title: 'Error.',
                    description: "We've created your Post error.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                  })
            })
        })
        
    }
    )
    formDataSet(initial)
    e.preventDefault()
}

    return (
        <Box p={4} border='1px' rounded={'2xl'} m={4} >

        {
            user? 
             (<>
                 <Heading size={'md'} my={2} color='red.300'>
                Add Blog Post
            </Heading>
            <form onSubmit={onSubmit}>
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input type={'text'} placeholder='post title' 
                    name='title' 
                    value={formData.title}
                    onChange={handleChange}
                     />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input type={'text'} placeholder='post description' 
                    name='description' 
                    value={formData.description}
                    onChange={handleChange}
                    />
                </FormControl>
                  
                <FormControl isRequired>
                    <FormLabel>Post image</FormLabel>
                    <Input type={'file'} placeholder='post image'
                     name='image'
                     accept='image/*' 
                    //  value={formData.image}
                     onChange={event => handleImageChange(event, 0)}
                     />
                </FormControl>

                <Progress hasStripe value={progres} />
                <Button colorScheme={'green'} w='full' my={2} type={'submit'}>
                    Post
                </Button>
            </form>
             </>) :
              (<>
             <Heading size={'sm'} textAlign='center' color={'red'} >
                SignUp or Login To Create Post 
            </Heading>
             </>)
        }

           
        </Box >
    )
}

export default ArticleForm
