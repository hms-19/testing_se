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
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setHelpDatas } from 'store/slices/helpSlice';

const HelpSupportDetail = ({ id }: { id: number | string }) => {
  const [helpAndSupport, setHelpAndSupport] = useState<any>({});
  const [bookingStatistics, setBookingStatistics] = useState<any>([]);
  const auth = useSelector((state: any) => state.auth);
  const [totalCount, setTotalCount] = useState(0);
  const { data } = useAppSelector((state) => state.help);

  useEffect(() => {
    // Find the item that matches the given id
    const matchedItem = data.find((item: any) => item?.id == id);

    // Set the matched item in helpAndSupport state
    if (matchedItem) {
      setHelpAndSupport(matchedItem);
    }
  }, [data, id]);

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
            {helpAndSupport.user && (
              <>
                <ListItem
                  borderBottom="1px solid #ccc"
                  paddingBottom="10px"
                  marginBottom="10px"
                >
                  <Text display="flex">
                    <strong style={{ width: '200px', fontWeight: 'bold' }}>
                      User Name:
                    </strong>{' '}
                    {helpAndSupport.user?.name}
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
                    {helpAndSupport.user?.phone}
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
                    {helpAndSupport.user?.email}
                  </Text>
                </ListItem>
              </>
            )}

            {helpAndSupport.owner && (
              <>
                <ListItem
                  borderBottom="1px solid #ccc"
                  paddingBottom="10px"
                  marginBottom="10px"
                >
                  <Text display="flex">
                    <strong style={{ width: '200px', fontWeight: 'bold' }}>
                      Owner Name:
                    </strong>{' '}
                    {helpAndSupport?.owner?.name}
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
                    {helpAndSupport?.owner?.phone}
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
                    {helpAndSupport?.owner?.email}
                  </Text>
                </ListItem>
              </>
            )}

            {helpAndSupport.employee && (
              <>
                <ListItem
                  borderBottom="1px solid #ccc"
                  paddingBottom="10px"
                  marginBottom="10px"
                >
                  <Text display="flex">
                    <strong style={{ width: '200px', fontWeight: 'bold' }}>
                      Employee Name:
                    </strong>{' '}
                    {helpAndSupport?.employee?.name}
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
                    {helpAndSupport?.employee?.phone}
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
                    {helpAndSupport?.employee?.email}
                  </Text>
                </ListItem>
              </>
            )}

            <ListItem
              borderBottom="1px solid #ccc"
              paddingBottom="10px"
              marginBottom="10px"
            >
              <Text display="flex">
                <strong style={{ width: '200px', fontWeight: 'bold' }}>
                  Message:
                </strong>{' '}
                {helpAndSupport?.message}
              </Text>
            </ListItem>
          </UnorderedList>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default HelpSupportDetail;
