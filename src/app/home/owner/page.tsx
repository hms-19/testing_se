'use client';

import { Badge, Box, Flex } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { axiosPost } from 'utils/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AddNewButton from 'components/buttons/AddNewButton';
import TownshipFilter from 'views/home/township/TownshipFilter';
import { useAppDispatch } from 'store/hooks';
import { setOwnerDatas } from 'store/slices/ownerSlice';
import { badgeColorChange } from 'utils/checkStatus';
import OwnerFilter from 'views/home/owner/OwnerFilter';

const statusLabels = {
  0: 'Pending',
  1: 'Approved',
  2: 'Blocked',
  3: 'Failed',
} as const;

const page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [inputs, setInputs] = useState({
    status: 'all',
  });
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await axiosPost(
      `owner/list`,
      { page, per_page: limit, status: inputs.status },
      (res) => {
        const { data, total_count } = res;
        setData(data);
        dispatch(setOwnerDatas(data));
        setTotalCount(total_count);
      },
    );
  };

  const handleDelete = async (id: number | string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosPost(
          `owner/delete`,
          { id },
          (res: any) => {
            fetchData();
            toast.success(res.message);
          },
          (res) => {
            fetchData();
            toast.success(res.message);
          },
        );
      }
    });
  };

  const columnDefs = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: number) => (
        <Badge bg={badgeColorChange(status)} p="2" color={'#ffff'}>
          {statusLabels[status as keyof typeof statusLabels]}
        </Badge>
      ),
    },
    { title: 'Business Name', dataIndex: 'business_name' },
    { title: 'Address', dataIndex: 'address' },

    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any, index: number) => {
        return (
          <ActionCell
            item={record}
            isEdit={false}
            isDelete={true}
            isView={true}
            viewLink={'/home/owner/view/' + record.id}
            handleDelete={handleDelete}
          />
        );
      },
    },
  ];

  // Pagination part

  useEffect(() => {
    fetchData();
  }, [page, limit, inputs]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex my={'10px'} alignItems={'center'} justifyContent={'space-between'}>
        <OwnerFilter
          inputs={inputs}
          setInputs={setInputs}
          handleSelectChange={handleSelectChange}
        />
      </Flex>

      {/* Data Tables */}
      <CustomGrid
        rowData={data}
        columnDefs={columnDefs}
        page={page}
        perPage={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        totalCount={totalCount}
      />
    </Box>
  );
};

export default page;
