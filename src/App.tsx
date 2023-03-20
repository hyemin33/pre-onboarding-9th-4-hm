import { Table } from 'antd';
import { useEffect, useState } from 'react';

import mockData from '../public/mock_data.json';
import Box from './components/Box';
import ServiceWrapper from './layouts/ServiceWrapper';
import ProductTableColumns from './columns/ProductTableColumns';

const YSCROLL = 'calc(100vh - 300px)';
const TODAY = '2023-03-08';

export function App() {
  const [data, setData] = useState([]);

  // 데이터 불러오기 + 필터링 임시로..
  useEffect(() => {
    let result: object[] = [];
    if (mockData) {
      result = mockData.filter(
        (data) => data.transaction_time.split(' ')[0] === TODAY
      );
    }
    setData(result);
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
