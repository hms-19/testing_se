import { useColorMode } from '@chakra-ui/system';
import React from 'react'
import { DateRangePicker } from 'rsuite';
const DateRangeField = ({inputs, setInputs}:any) => {
    const { colorMode } = useColorMode();

    const handleDateRangeSelect = (dates:  any) => {
      if(dates == null){
        setInputs({...inputs, start_date:null , end_date: null})
      }
      else{
        setInputs({...inputs, start_date: dates[0] , end_date: dates[1]})
      }
    };

    const startDate = inputs.start_date ? new Date(inputs.start_date) : null;
    const endDate = inputs.end_date ? new Date(inputs.end_date) : null;

  return (
    <DateRangePicker
        onChange={handleDateRangeSelect}
        style={{ width: 300 }}
        placeholder={'Start Date - End Date'}
        className={colorMode === 'dark' ? '' : 'rsuite-dark' }
        value={startDate && endDate ? [startDate, endDate] : null}
    />
  )
}

export default DateRangeField