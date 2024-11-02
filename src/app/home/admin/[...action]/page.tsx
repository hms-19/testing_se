'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import AdminForm from 'views/home/admin/AdminForm';

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
        <AdminForm action={action} id={id} />
      </Box>
    </>
  );
};

export default page;
