'use client';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  Flex,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosGet, axiosPatch, axiosPost } from 'utils/axios';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { getCampaignStatus, getPurposeName } from 'utils/campaigns';
import { dateTimeDiffinDays, dateTimeFormat } from 'utils/date-format';
import { BiEdit } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { numberFormat } from 'utils/number-format';
import CustomGrid from 'components/datatables/CustomGrid';

const CampaignDetails = ({ id }: { id: number | string }) => {
  const [booking, setBooking] = useState<any>({});
  const [bookingStatistics, setBookingStatistics] = useState<any>([]);
  const auth = useSelector((state: any) => state.auth);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBooking = async () => {
    try {
      await axiosPost(`booking/detail`, { id: id }, (res: any) => {
        setBooking(res.data);
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const columnDefs = [
    { headerName: 'User', field: 'user.name' },
    { headerName: 'User Email', field: 'user.email' },
    { headerName: 'User Phone', field: 'user.phone' },
    { headerName: 'Booking Date', field: 'booking_date' },
    { headerName: 'Booking Time', field: 'booking_time' },

    { headerName: 'Owner', field: 'owner.name' },
    { headerName: 'User Email', field: 'owner.email' },
    { headerName: 'User Phone', field: 'owner.phone' },

    { headerName: 'Court', field: 'court.name' },
    { headerName: 'Court Phone', field: 'court.phone' },
  ];
  return (
    <Flex
      maxW={{ base: '100%', md: '95%' }}
      w="100%"
      mx={{ base: 'auto', lg: 'auto' }}
      me="auto"
      h="100%"
      alignItems="center"
      justifyContent="center"
      mb={{ base: '30px', md: '60px' }}
      px={{ base: '25px', md: '0px' }}
      mt={{ base: '14vh', md: '14vh' }}
      flexDirection="column"
    >
      <Card w={'100%'}>
        {/* <CardHeader>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={'10px'}>
              <Text fontWeight={'600'} fontSize={'20px'}>
                {booking?.name}
              </Text>
            </Flex>
            
          </Flex>
        </CardHeader> */}

        <CardBody w={'100%'}>
          <UnorderedList styleType="none" padding="0">
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  User Name:
                </strong>{' '}
                {booking.user?.name}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  User Phone:
                </strong>{' '}
                {booking.user?.phone}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  User Email:
                </strong>{' '}
                {booking.user?.email}
              </Text>
            </ListItem>

            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Booking Date:
                </strong>{' '}
                {booking?.booking_date}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  User Phone:
                </strong>{' '}
                {booking?.booking_time}
              </Text>
            </ListItem>

            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Owner Name:
                </strong>{' '}
                {booking?.owner?.name}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Owner Phone:
                </strong>{' '}
                {booking?.owner?.phone}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Owner Email:
                </strong>{' '}
                {booking?.owner?.email}
              </Text>
            </ListItem>

            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Employee Name:
                </strong>{' '}
                {booking?.employee?.name}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Employee Phone:
                </strong>{' '}
                {booking?.employee?.phone}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Employee Email:
                </strong>{' '}
                {booking?.employee?.email}
              </Text>
            </ListItem>

            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Booking Date:
                </strong>{' '}
                {booking?.booking_date}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  User Phone:
                </strong>{' '}
                {booking?.booking_time}
              </Text>
            </ListItem>

            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Total Price:
                </strong>{' '}
                {booking?.total_amount}
              </Text>
            </ListItem>
            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Discount Price:
                </strong>{' '}
                {booking?.discount_amount}
              </Text>
            </ListItem>
          </UnorderedList>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default CampaignDetails;
