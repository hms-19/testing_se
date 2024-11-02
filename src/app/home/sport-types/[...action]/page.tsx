'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SportTypesForm from 'views/home/sportTypes/SportTypesForm';

interface UsersActionProps {
  params: any;
}

const page = ({ params }: UsersActionProps) => {
  const [action = 'create', id = 0] = params.action;
  const isValidAction = action === 'create' || action === 'edit';
  const router = useRouter();

  useEffect(() => {
    if (!isValidAction) {
      router.push('/404');
    }
  }, [isValidAction]);

  return (
    <>
      <Box>
        <SportTypesForm action={action} id={id} />
      </Box>
    </>
  );
};

export default page;
