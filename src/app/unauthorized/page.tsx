'use client'
import { Button, Flex, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Unauthorized = () => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const bg = useColorModeValue('white', '#1B254B');
  return (
    <div>
        <Flex bgColor={bg} justifyContent={'center'} alignItems={'center'} w={'100%'} minH={'100vh'} flexDirection={'column'} gap={'20px'}>
            <Heading fontWeight={'bold'} fontSize={{ base: '30px', md: "60px", lg: '120px' }}>
                Unauthorized
            </Heading>
            <Text color={textColor}>Dude ! You don't have access to go this route.</Text>
            <Link href='/home/dashboard'>
              <Button variant='brand'>Go Back</Button>
            </Link>
        </Flex>
    </div>
  )
}

export default Unauthorized