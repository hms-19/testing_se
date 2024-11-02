'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { axiosPost } from 'utils/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AddNewButton from 'components/buttons/AddNewButton';
import { FaEye } from 'react-icons/fa6';
import { useAppDispatch } from 'store/hooks';
import { setHelpDatas } from 'store/slices/helpSlice';

const page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await axiosPost(`contact/list`, { page, per_page: limit }, (res) => {
      const { data, total_count } = res;
      setData(data);
      dispatch(setHelpDatas(data));
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
          `contact/delete`,
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
    {
      title: 'Name',
      key: 'name',
      render: (text: any, record: any) => {
        if (record.user) {
          return record.user.name;
        } else if (record.owner) {
          return record.owner.name;
        } else if (record.employee) {
          return record.employee.name;
        } else {
          return null;
        }
      },
    },
    { title: 'User Type', dataIndex: 'type' },
    { title: 'Message', dataIndex: 'message' },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any, index: number) => {
        return (
          <Flex>
            <ActionCell
              item={record}
              isEdit={false}
              isView={true}
              viewLink={'/home/help/view/' + record.id}
              isDelete={true}
              handleDelete={handleDelete}
            />
          </Flex>
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
