'use client';

import { Box, Button, Flex } from '@chakra-ui/react';
import ActionCell from 'components/datatables/ActionCell';
import CustomGrid from 'components/datatables/CustomGrid';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { axiosPost } from 'utils/axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AddNewButton from 'components/buttons/AddNewButton';
import TownshipFilter from 'views/home/township/TownshipFilter';
import DateField from 'views/home/bookinglist/DateField';
import DateRangeField from 'components/inputs/DateRangeField';
import { badgeColorChange } from 'utils/checkStatus';
import BookingFilter from 'views/home/bookinglist/BookingFilter';

const today = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);

const sevenDaysLater = new Date();
sevenDaysLater.setDate(today.getDate() + 7);

const page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [inputs, setInputs] = useState({
    start_date: sevenDaysAgo.toISOString().split('T')[0],
    end_date: today.toISOString().split('T')[0],
    exportcsv: false,
    status: 'all',
  });

  const fetchData = async () => {
    if (inputs.exportcsv) {
      await axiosPost(
        `booking/admin/list`,
        {
          page,
          per_page: limit,
          from: inputs.start_date,
          to: inputs.end_date,
          exportcsv: inputs.exportcsv,
          status: inputs.status,
        },
        (res) => {
          const blob = new Blob([res], {
            type: 'data:text/csv;charset=utf-8,',
          });
          const blobURL = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.download = 'bookingLists.csv';
          anchor.href = blobURL;
          anchor.dataset.downloadurl = [
            'text/csv',
            anchor.download,
            anchor.href,
          ].join(':');
          anchor.click();
          setInputs((prevInputs) => ({
            ...prevInputs,
            exportcsv: false,
          }));
        },
      );
    } else {
      await axiosPost(
        `booking/admin/list`,
        {
          page,
          per_page: limit,
          from: inputs.start_date,
          to: inputs.end_date,
          exportcsv: inputs.exportcsv,
          status: inputs.status,
        },
        (res) => {
          const { data, total_count } = res;
          setData(data);
          setTotalCount(total_count);
        },
      );
    }
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
          `booking/admin/delete`,
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
      title: 'User Name',
      dataIndex: 'user.name',
      render: (text: any, record: any) =>
        record.user ? record.user.name : '-',
    },
    { title: 'Booking Date', dataIndex: 'booking_date' },
    { title: 'Booking Time', dataIndex: 'booking_time' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: any) => {
        const color = badgeColorChange(status);
        const statusText = (() => {
          switch (status) {
            case 0:
              return 'Booked';
            case 1:
              return 'Played';
            case 2:
              return 'Canceled';
            case 4:
              return 'Refund';
            default:
              return 'Unknown';
          }
        })();

        return (
          <span
            style={{
              backgroundColor: color,
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {statusText}
          </span>
        );
      },
    },

    {
      title: 'Court Name',
      dataIndex: 'court.name',
      render: (text: any, record: any) =>
        record.court ? record.court.name : '-',
    },
    {
      title: 'Owner',
      dataIndex: 'owner.name',
      render: (text: any, record: any) =>
        record.owner ? record.owner.name : '-',
    },
    { title: 'Total Price', dataIndex: 'total_amount' },
    { title: 'Discount Price', dataIndex: 'discount_amount' },

    // { title: 'Region Name', dataIndex: ['region', 'name'] },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any, index: number) => {
        return (
          <ActionCell
            item={record}
            isView={true}
            viewLink={'/home/booking-lists/view/' + record.id}
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

  const handleClick = () => {
    setInputs({ ...inputs, exportcsv: true });
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex justifyContent={'space-between'}>
        <Flex>
          <Flex
            my={'10px'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <DateRangeField inputs={inputs} setInputs={setInputs} />
          </Flex>
          <Flex
            my={'10px'}
            ml={'10px'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <BookingFilter
              inputs={inputs}
              setInputs={setInputs}
              handleSelectChange={handleSelectChange}
            />
          </Flex>
        </Flex>
        <Flex my={'10px'} alignItems={'center'} justifyContent={'end'}>
          {/* <AddNewButton link="/home/admin/create" /> */}
          <Button variant="brand" onClick={handleClick}>
            Excel Export
          </Button>
        </Flex>
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
