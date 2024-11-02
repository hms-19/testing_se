'use client'
import { Button, Flex, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const NotFound = () => {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const bg = useColorModeValue('white', '#1B254B');

  return (
    <div>
        <Flex bgColor={bg} justifyContent={'center'} alignItems={'center'} w={'100%'} minH={'100vh'} flexDirection={'column'} gap={'20px'}>
            <Heading fontWeight={'bold'} color={textColor} fontSize={{ base: '30px', md: "60px", lg: '120px' }}>
              404
            </Heading>
            <Text color={textColor}>Dude ! You are looking for doesn't exist</Text>
            <Link href='/home/dashboard'>
              <Button variant='brand'>Go Back</Button>
            </Link>
        </Flex>
    </div>
  )
}

export default NotFound