import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import Pagination from './Pagination';
import { Table } from 'antd';

interface CustomGridProps {
  rowData: any[];
  columnDefs: any[];
  page: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  perPage?: number;
  totalCount?: number;
}

const CustomGrid: React.FC<CustomGridProps> = ({
  rowData,
  columnDefs,
  page,
  onPageChange,
  onLimitChange,
  perPage = 10,
  totalCount = 0,
}) => {
  const { colorMode } = useColorMode();

  const handlePaginationChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const handlePageSizeChange = (pageSize: number) => {
    onLimitChange(pageSize);
  };

  return (
    <div
      className={`${colorMode == 'dark' ? 'dark-mode' : ''}`}
      style={{ maxHeight: '80vh', width: '100%' }}
    >
      <Table
        columns={columnDefs}
        dataSource={rowData?.map((row, index) => ({
          ...row,
          key: row.id || index,
        }))}
        rowHoverable={false}
        pagination={false}
      />

      <div
        style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}
      >
        <div>
          <Pagination
            currentPage={totalCount == 0 ? 0 : page}
            totalPages={totalCount == 0 ? 0 : Math.ceil(totalCount / perPage)}
            onPageChange={handlePaginationChange}
            perPage={perPage}
            handlePageSizeChange={handlePageSizeChange}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomGrid;
