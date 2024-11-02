'use client';

import { Box, Flex } from '@chakra-ui/react';
import SelectInputField from 'components/inputs/SelectInputField';
import React, { useEffect, useState } from 'react';
import { axiosPost } from 'utils/axios';

const TownshipFilter = ({ inputs, setInputs, handleSelectChange }: any) => {
  const [regions, setRegions] = useState([]);
  const [page, setPage] = useState(1);

  const fetchRegions = async () => {
    await axiosPost(`region/list`, { page: 1, per_page: 'all' }, (res: any) => {
      const transformedData = [
        { id: 'all', name: 'All' }, // Add "All" option here
        ...res.data.map((region: any) => ({
          ...region,
          name: region.name,
        })),
      ];
      setRegions(transformedData);
    });
  };

  useEffect(() => {
    fetchRegions();
  }, []);

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
            name="region_id"
            value={inputs.region_id}
            placeholder="Select Region"
            onChange={handleSelectChange}
            options={regions}
          />
        </Box>
      </Flex>
    </>
  );
};

export default TownshipFilter;
