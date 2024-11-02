'use client'

import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosPost } from 'utils/axios';
import { useRouter } from "next/navigation";
import TextField from 'components/inputs/TextField';
import SelectInputField from 'components/inputs/SelectInputField';

const TownshipForm = ({action = 'create', id = 0}) => {

  const textColor = useColorModeValue('navy.700', 'white');
  const [inputs, setInputs] = useState({ name: "", region_id: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [regions, setRegions] = useState([]);

  const handlerForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!inputs.name) {
        throw new Error("Please enter the name");
      }

      if (inputs.region_id == 0) {
        throw new Error("Please enter the region");
      }

      const { ...params } = inputs;

      if(action == 'create'){
        await axiosPost(
          "township/create",
          params,
          (res) => {
            setLoading(false);

            if(res.status == 1){
              setOpen(true);
            }
            else{
              toast.success("Township Created Successfully !");
              router.push("/home/township");
            }
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      }
      else{
        await axiosPost(
          "township/update",
          {...params, id},
          (res) => {
            setLoading(false);
            toast.success("Township Updated Successfully !");
            router.push("/home/township");
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      }
    } catch (err : any) {
      setLoading(false);
      toast.error(err?.message);
    }
  }

  const handleOk = () => {
    setTimeout(() => {
      setOpen(!open);
    }, 500);
  };


  const fetchRegions = async () => {
    await axiosPost(`region/list`,{page: 1, per_page: 'all'}, (res: any) => {
      const transformedData = res.data.map((region: any) => ({
        ...region,
        name: region.name 
      }));
      setRegions(transformedData);
    });
  };

  const handlerInputs = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchTownshipInfo = async () => {
    await axiosPost(`township/detail`,{id}, (res: any) => {
      setInputs({ ...inputs, name: res.data.name, region_id: res.data.region.region_id});
    });
  };

  useEffect(() => {
    fetchRegions()
    if (action === "edit" || action === "view") {
      fetchTownshipInfo();
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
            flexDirection="column">

              <Card w={'100%'}>
                <CardBody w={'100%'} mx={'auto'}>
                  <Box me="auto">
                    <Heading color={textColor} fontSize="20px" mb="10px">
                        {action == 'create' ? 'Create' : 'Update'} Township
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
                          mb={{ base: '20px', md: 'auto' }}>
                          
                          <FormControl>

                              {/* Name */}
                              <TextField
                                name='name'
                                label='Name'
                                type='text'
                                isRequired={true}
                                placeholder='Name'
                                value={inputs?.name} 
                                onChange={handlerInputs}
                              />

                              {/* Region ID */}
                              <SelectInputField
                                  name='region_id'
                                  value={inputs.region_id}
                                  label='Select Region'
                                  placeholder='Select Region'
                                  onChange={handleSelectChange}
                                  options={regions}
                                />

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
                              
                          </FormControl>
                      </Flex>
                  </form>
                </CardBody>
              </Card>
              
        </Flex>
    </>
  )
}

export default TownshipForm