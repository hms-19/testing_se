'use client';

import { Box, Flex } from '@chakra-ui/react';
import SelectInputField from 'components/inputs/SelectInputField';
import React, { useEffect, useState } from 'react';
import { axiosPost } from 'utils/axios';

const statusOptions = [
  { id: 'all', name: 'All' },
  { id: 0, name: 'Booked' },
  { id: 1, name: 'Played' },
  { id: 2, name: 'Canceled' },
];

const BookingFilter = ({ inputs, setInputs, handleSelectChange }: any) => {
  return (
    <>
      <Flex
        flexWrap={'wrap'}
        gap={'10px'}
        justifyContent={'start'}
        alignItems={'start'}
      >
        <Box>
          <SelectInputField
            name="status"
            value={inputs.status}
            placeholder="Select Status"
            onChange={handleSelectChange}
            options={statusOptions}
          />
        </Box>
      </Flex>
    </>
  );
};

export default BookingFilter;
