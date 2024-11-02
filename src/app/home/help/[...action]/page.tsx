'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import HelpSupportDetail from 'views/home/help/HelpSupportDetails';
import TownshipForm from 'views/home/township/TownshipForm';

interface UsersActionProps {
  params: any;
}

const page = ({ params }: UsersActionProps) => {
  const [action = 'create', id = 0] = params.action;
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push('/404');
    }
  }, [id]);

  return (
    <>
      <Box>
        <HelpSupportDetail id={id} />
      </Box>
    </>
  );
};

export default page;
