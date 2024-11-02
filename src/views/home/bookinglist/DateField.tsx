'use client';

import { FormLabel, Input, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import React, { ChangeEvent } from 'react';

interface DateFieldInputProps {
  placeholder: string;
  type: string;
  name: string;
  label?: string;
  isRequired?: boolean;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateField = ({
  placeholder,
  type,
  name,
  label = '',
  isRequired = false,
  value = '',
  onChange,
}: DateFieldInputProps) => {
  const textColor = useColorModeValue('navy.700', 'white');

  return (
    <>
      <FormLabel
        display="flex"
        ms="4px"
        fontSize="sm"
        fontWeight="500"
        color={textColor}
        mb="8px"
      >
        {label}
      </FormLabel>

      <Input
        isRequired={isRequired}
        variant="auth"
        fontSize="sm"
        ms={{ base: '0px', md: '0px' }}
        type={type}
        name={name}
        placeholder={placeholder}
        mb="24px"
        fontWeight="500"
        size="lg"
        value={value ? moment(value).format('YYYY-MM-DD') : ''}
        onChange={onChange}
      />
    </>
  );
};

export default DateField;
