'use client'

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import RegionForm from 'views/home/region/RegionForm';

interface UsersActionProps {
    params : any
}

const page = ({params}: UsersActionProps) => {

  const [action = "create", id = 0] = params.action;
  const isValidAction = action === "create" || action === "edit";
  const router = useRouter();
  
  useEffect(() => {
      if (!isValidAction) {
          router.push('/404'); 
      }
  }, [isValidAction]);

  return (
    <>
        <Box>
            <RegionForm action={action} id={id} />
        </Box>
    </>
  )
}

export default page