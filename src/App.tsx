import { Table, Badge } from 'antd';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table/interface';
import mockData from '../public/mock_data.json';
import Box from './components/Box';
import ServiceWrapper from './layouts/ServiceWrapper';

interface DataType {
  id: number;
  transaction_time: string;
  status: boolean;
  customer_id: number;
  customer_name: string;
  currency: string;
}

export function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(mockData);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: '주문번호',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '거래시간',
      dataIndex: 'transaction_time',
      key: 'transaction_time',
      // sorter: (a, b) => a < b,
    },
    {
      title: '주문처리상태',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Badge
          status={status ? 'success' : 'error'}
          text={status ? '완료' : '미완료'}
        />
      ),
    },
    {
      title: '고객이름',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: '고객번호',
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: '가격',
      dataIndex: 'currency',
      key: 'currency',
    },
  ];

  return (
    <ServiceWrapper>
      <Box>
        <Table columns={columns} dataSource={data} rowKey='id' />
      </Box>
    </ServiceWrapper>
  );
}
