import { useEffect, useState } from 'react';
import Button from 'antd';
import getData from './apis/api';

export function App() {
  const [data, setData] = useState();

  useEffect(() => {
    getData().then((res: any) => {
      const chartData = res;

      setData(chartData);
    });
  }, []);

  return (
    <div>
      스위치원<Button>antd 사용하고싶은사람</Button>
    </div>
  );
}
