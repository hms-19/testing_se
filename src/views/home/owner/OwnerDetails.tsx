'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPost } from 'utils/axios';
import { useRouter } from 'next/navigation';
import TextField from 'components/inputs/TextField';
import SelectInputField from 'components/inputs/SelectInputField';
import { useAppSelector } from 'store/hooks';
import ShowDetailComponent from 'components/custom/ShowDetailComponent';

const OwnerDetails = ({ action = 'view', id = 0 }) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const [inputs, setInputs] = useState({ name: '', region_id: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const { data } = useAppSelector((state) => state.owner);

  const handlerForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!inputs.name) {
        throw new Error('Please enter the name');
      }

      if (inputs.region_id == 0) {
        throw new Error('Please enter the region');
      }

      const { ...params } = inputs;

      if (action == 'create') {
        await axiosPost(
          'township/create',
          params,
          (res) => {
            setLoading(false);

            if (res.status == 1) {
              setOpen(true);
            } else {
              toast.success('Township Created Successfully !');
              router.push('/home/township');
            }
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      } else {
        await axiosPost(
          'township/update',
          { ...params, id },
          (res) => {
            setLoading(false);
            toast.success('Township Updated Successfully !');
            router.push('/home/township');
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  const owner = data.find((item: any) => item.id == id);

  const handleOk = () => {
    setTimeout(() => {
      setOpen(!open);
    }, 500);
  };

  useEffect(() => {
    if (owner == undefined) {
      router.push('/home/owner');
    }
  }, [owner, router]);

  const handlerInputs = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box mt={24}>
        {owner && <ShowDetailComponent ownerDataForShowDetail={owner} />}
      </Box>
    </>
  );
};

export default OwnerDetails;
