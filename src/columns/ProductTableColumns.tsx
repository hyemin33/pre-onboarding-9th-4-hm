import type { ColumnsType } from 'antd/es/table/interface';
import { Tag, Space } from 'antd';
import DataType from '../types/DataType';
import useSearch from '../hooks/useSearch';

const ProductTableColumns = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '주문번호',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '거래시간',
      dataIndex: 'transaction_time',
      key: 'transaction_time',
      width: 200,
      sorter: (a, b) =>
        new Date(a.transaction_time).getTime() -
        new Date(b.transaction_time).getTime(),
    },
    {
      title: '주문처리상태',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status: boolean) => (
        <Space size='middle'>
          <Tag color={status ? 'success' : 'error'}>
            {status ? '완료' : '미완료'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '고객이름',
      dataIndex: 'customer_name',
      key: 'customer_name',
      ...useSearch('customer_name'),
    },
    {
      title: '고객번호',
      width: 150,
      dataIndex: 'customer_id',
      key: 'customer_id',
    },
    {
      title: '가격',
      width: 150,
      dataIndex: 'currency',
      key: 'currency',
    },
  ];

  return columns;
};

export default ProductTableColumns;
