import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AllState } from 'src/state';
import { Button, Space } from 'antd';
import { actions } from '../index';
import styles from './index.module.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: AllState) => ({
    name: state.home.name
  }));

  const goDetail = () => dispatch(actions.goDetail());

  const updateName = () => dispatch(actions.setState({ name: 'new name' }));

  return (
    <div className={styles.container}>
      <Space>
        {name}
        <Button onClick={goDetail}>go detail</Button>
        <Button onClick={updateName}>update name</Button>
      </Space>
    </div>
  );
};

export default memo(Index);
