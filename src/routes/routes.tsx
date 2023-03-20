import { ShoppingCartOutlined } from '@ant-design/icons';
import { IRoute } from '../types/RouteType';

export const Routes: Array<IRoute> = [
  {
    path: '/',
    sidebar: {
      icon: <ShoppingCartOutlined />,
      label: '주문 목록',
    },
  },
];
