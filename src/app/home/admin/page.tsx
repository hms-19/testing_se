'use client';

import { Badge, Box, Flex } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid';
import React, { useEffect, useState } from 'react';
import { axiosDelete, axiosGet, axiosPost } from 'utils/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AddNewButton from 'components/buttons/AddNewButton';

export const badgeColorChange = (value: string | number | undefined) => {
  if (value === 0) return '#b21515';
  if (value === 1) return '#334499';
};

const page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    await axiosPost(`/admin/list`, { page, per_page: limit }, (res) => {
      const { data, total_count } = res;
      setData(data);
      setTotalCount(total_count);
    });
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
          `admin/delete`,
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
      title: 'Role',
      dataIndex: 'role',
      render: (value: number) => (
        <Badge bg={badgeColorChange(value)} p="2" color={'#ffffff'}>
          {value === 0 ? 'Admin' : 'Moderator'}
        </Badge>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any, index: number) => {
        return (
          <ActionCell
            item={record}
            isEdit={true}
            isDelete={true}
            editLink={'/home/admin/edit/' + record.id}
            handleDelete={handleDelete}
          />
        );
      },
    },
  ];

  // Pagination part

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex my={'10px'} alignItems={'center'} justifyContent={'end'}>
        <AddNewButton link="/home/admin/create" />
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
