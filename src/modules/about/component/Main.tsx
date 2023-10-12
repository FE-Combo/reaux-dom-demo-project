import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AllState } from 'src/utils/state';
import { Button, Space } from 'antd';
import { actions } from '../index';
import styles from './index.module.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: AllState) => ({
    name: state.about.name
  }));

  const goHome = () => dispatch(actions.goHome());

  return (
    <div className={styles.container}>
      <Space>
        {name}
        <Button onClick={goHome}>go home</Button>
      </Space>
    </div>
  );
};

export default memo(Index);
