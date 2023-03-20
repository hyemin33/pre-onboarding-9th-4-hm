import { Table } from 'antd';
import { useEffect, useState } from 'react';

import mockData from '../public/mock_data.json';
import Box from './components/Box';
import ServiceWrapper from './layouts/ServiceWrapper';
import ProductTableColumns from './components/tables/ProductTableColumns';

const YSCROLL = 'calc(100vh - 300px)';

export function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(mockData);
  }, []);

  return (
    <ServiceWrapper>
      <Box>
        <Table
          columns={ProductTableColumns()}
          dataSource={data}
          rowKey='id'
          pagination={{
            showSizeChanger: false,
            pageSize: 50,
          }}
          scroll={{ y: YSCROLL }}
        />
      </Box>
    </ServiceWrapper>
  );
}
