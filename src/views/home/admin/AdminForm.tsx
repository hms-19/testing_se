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
  Select,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { axiosPost } from 'utils/axios';
import { useRouter } from 'next/navigation';
import TextField from 'components/inputs/TextField';

export enum AdminRoleEnum {
  Admin = 0,
  Moderator = 1,
}

export interface AdminFormData {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: AdminRoleEnum;
}

const AdminForm = ({ action = 'create', id = 0 }) => {
  const textColor = useColorModeValue('navy.700', 'white');
  const [inputs, setInputs] = useState<AdminFormData>({
    name: '',
    email: '',
    phone: '',
    password: null,
    role: 1,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { colorMode } = useColorMode();

  const handlerForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!inputs.name) {
        throw new Error('Please enter the name');
      }

      const { ...params } = inputs;

      // Remove password if it is null or does not exist
      if (params.password === null || params.password === undefined) {
        delete params.password; // Remove the password property
      }

      if (action == 'create') {
        await axiosPost(
          'admin/create',
          params,
          (res) => {
            setLoading(false);

            if (res.status == 1) {
              setOpen(true);
            } else {
              toast.success('Admin Created Successfully !');
              router.push('/home/admin');
            }
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      } else {
        await axiosPost(
          'admin/update',
          { ...params, id },
          (res) => {
            setLoading(false);
            toast.success('Admin Updated Successfully !');
            router.push('/home/admin');
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

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs((prevData) => ({
      ...prevData,
      role: parseInt(e.target.value, 10) as AdminRoleEnum,
    }));
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(!open);
    }, 500);
  };

  const handlerInputs = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchAdminInfo = async () => {
    await axiosPost(`admin/detail`, { id }, (res: any) => {
      setInputs({
        ...inputs,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role,
      });
    });
  };

  useEffect(() => {
    if (action === 'edit' || action === 'view') {
      fetchAdminInfo();
    }
  }, []);

  return (
    <>
      <Flex
        maxW={{ base: '100%', md: '50%' }}
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
          <Flex justifyContent={'flex-end'} my={3} mr={3}>
            <Button
              onClick={() => router.back()}
              colorScheme="facebook"
              variant="solid"
              size={'md'}
            >
              Go Back
            </Button>
          </Flex>
          <CardBody w={'100%'} mx={'auto'}>
            <Box me="auto">
              <Heading color={textColor} fontSize="20px" mb="24px">
                {action == 'create' ? 'Create' : 'Update'} Admin
              </Heading>
            </Box>

            <form onSubmit={handlerForm}>
              <Flex
                zIndex="2"
                direction="column"
                w={'100%'}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx={{ base: 'auto', lg: 'unset' }}
                me="auto"
                mb={{ base: '20px', md: 'auto' }}
              >
                <FormControl>
                  {/* Name */}
                  <TextField
                    name="name"
                    label="Name"
                    type="text"
                    isRequired={true}
                    placeholder="Name"
                    value={inputs?.name}
                    onChange={handlerInputs}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    name="email"
                    label="Email"
                    type="text"
                    isRequired={true}
                    placeholder="Email"
                    value={inputs?.email}
                    onChange={handlerInputs}
                  />
                </FormControl>
                <FormControl sx={{ mb: 4 }}>
                  <FormLabel sx={{ fontSize: '15px' }}>Role</FormLabel>
                  <Select
                    required
                    value={inputs?.role}
                    onChange={(e) => handleRoleChange(e)}
                  >
                    <option value={AdminRoleEnum.Admin}>Admin</option>
                    <option value={AdminRoleEnum.Moderator}>Moderator</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <TextField
                    name="phone"
                    label="Phone"
                    type="text"
                    isRequired={true}
                    placeholder="Phone"
                    value={inputs?.phone}
                    onChange={handlerInputs}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    isRequired={action === 'create' ? true : false}
                    placeholder="Password"
                    value={inputs?.password}
                    onChange={handlerInputs}
                  />
                </FormControl>

                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  type="submit"
                  disabled={loading}
                >
                  {action == 'create' ? 'Create' : 'Update'}
                </Button>
              </Flex>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default AdminForm;
