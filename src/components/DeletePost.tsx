import { Box, Button, Toast, useToast } from '@chakra-ui/react'
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react'
import { db, storage } from '../config/FireBase';

interface DeleteProps {
    id: string;
    imageUrl: string
}


const DeletePost = ({ id, imageUrl }: DeleteProps) => {
    const toast = useToast();

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'blog', id));
            toast({
                title: 'Post deleted.',
                description: "We've deleted your Post for you.",
                status: 'warning',
                duration: 4000,
                isClosable: true,
            })
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef)
        } catch (error) {
            toast({
                title: 'error.',
                description: "error message.",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
        }
    };
    return (
        <Box>
            <Button
                colorScheme={'red'}
                onClick={handleDelete}
            >
                Delete
            </Button>
        </Box>
    )
}

export default DeletePost
