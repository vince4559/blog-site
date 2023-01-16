import { Box, HStack, Image, Progress, Stack, Text } from '@chakra-ui/react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../config/FireBase';
import DeletePost from './DeletePost';

interface BlogProps {
    createdAt: string | any,
    description: string
    imageUrl: string
    title: string
    id: string
}



const Blog = () => {
    const [blog, setBlog] = useState<BlogProps[]>([]);
    useEffect(() => {
        const blogref = collection(db, 'blog');
        const blogQuerry = query(blogref, orderBy('createdAt', 'desc'));

        onSnapshot(blogQuerry, (snapshot) => {
            const blogPost:any = snapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            setBlog(blogPost)

        })
    }, [])
    return (
        <section>
            <Box p={4}>
                {
                    blog.length === 0 ?
                    (<Progress size='xs' isIndeterminate />)
                    :
                    (
                        blog.map(({id, imageUrl ,title,description,createdAt}) => (
                            <HStack key={id} border='1px' rounded={'2xl'} p={2} spacing={'2rem'}>
                                <Image alt='blog_img' src={imageUrl} w='200px' />
                                <Stack>
                                    <Text fontSize={'3xl'}>{title}</Text>
                                    <Text fontSize={'xl'}>{createdAt.toDate().toDateString()}</Text>
                                    <Text fontSize={'xl'}>{description}</Text>
                                    <DeletePost id={id} imageUrl={imageUrl} />
                                </Stack>
                            </HStack>
                        ))
                    )
                }
            </Box>
        </section>
    )
}

export default Blog
