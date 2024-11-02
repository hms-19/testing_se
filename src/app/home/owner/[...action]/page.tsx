'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import OwnerDetails from 'views/home/owner/OwnerDetails';

interface UsersActionProps {
  params: any;
  item: any;
}

const page = ({ params, item }: UsersActionProps) => {
  const [action = 'create', id = 0] = params.action;

  const isValidAction =
    action === 'create' || action === 'edit' || action === 'view';
  const router = useRouter();

  useEffect(() => {
    if (!isValidAction) {
      router.push('/404');
    }
  }, [isValidAction]);

  return (
    <>
      <Box>
        <OwnerDetails action={action} id={id} />
      </Box>
    </>
  );
};

export default page;
