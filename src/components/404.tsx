import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function Custom404() {
  const router = useHistory();
  const handleClick = () => router.push('/');

  return (
    <Result
      status="404"
      title="404"
      subTitle="当前页面未找到"
      style={{ width: '100%' }}
      extra={
        <Button type="primary" onClick={handleClick}>
          返回首页
        </Button>
      }
    />
  );
}
