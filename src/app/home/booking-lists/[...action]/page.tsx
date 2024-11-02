'use client';

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { axiosPost } from 'utils/axios';
import CampaignDetails from 'views/home/bookinglist/BookingDetails';
import TownshipForm from 'views/home/township/TownshipForm';

interface UsersActionProps {
  params: any;
}

const page = ({ params }: UsersActionProps) => {
  const [action = 'create', id = 0] = params.action;
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

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
        <CampaignDetails id={id} />
      </Box>
    </>
  );
};

export default page;
