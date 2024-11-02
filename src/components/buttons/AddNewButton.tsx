'use client'

import { Button, Link } from '@chakra-ui/react'
import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const AddNewButton = ({link}: {link: string}) => {
    // const auth = useSelector((state: any) => state.auth)
    
    // if(auth.role_type != 0){
    //     return (<></>)
    // }

    
  return (
    <Link href={link}>
        <Button rightIcon={<BiPlus />} variant='brand'>
            Add New
        </Button>
    </Link>
  )
}

export default AddNewButton