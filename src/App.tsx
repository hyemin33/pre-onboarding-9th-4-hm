import { Table, Badge, Tag, Space, Input, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
} from 'antd/es/table/interface';
import type { InputRef } from 'antd';
import Highlighter from 'react-highlight-words';

import { SearchOutlined } from '@ant-design/icons';
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

type DataIndex = keyof DataType;
export function App() {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    setData(mockData);
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchName(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchName('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            검색
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            초기화
          </Button>

          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            닫기
          </Button>
        </Space>
      </div>
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchName]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
        new Date(a.transaction_time) - new Date(b.transaction_time),
    },
    {
      title: '주문처리상태',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status: boolean) => (
        <Space size='middle'>
          <Badge
            status={status ? 'success' : 'error'}
            text={status ? '완료' : '미완료'}
          />
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
      ...getColumnSearchProps('customer_name'),
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

  return (
    <ServiceWrapper>
      <Box>
        <Table
          columns={columns}
          dataSource={data}
          rowKey='id'
          pagination={{
            showSizeChanger: false,
            pageSize: 50,
          }}
        />
      </Box>
    </ServiceWrapper>
  );
}
