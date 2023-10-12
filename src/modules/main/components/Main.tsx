import React, { FC, memo } from 'react';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import { useSelector, shallowEqual } from 'react-redux';
import { AllState } from 'src/utils/state';
import { Async } from 'reaux';
import { ConfigProvider, Space } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';
import NotFound from 'src/components/404';
import styles from './index.module.scss';

const HomeView = Async(() => import(/* webpackChunkName: "home" */ 'src/modules/home'), 'View');
const HomeDetailView = Async(() => import(/* webpackChunkName: "home-detail" */ '../../home'), 'ViewDetail');
const AboutView = Async(() => import(/* webpackChunkName: "about" */ '../../about'), 'View');

const Index: FC = () => {
  const { lang } = useSelector((state: AllState) => ({ lang: state.main.lang }), shallowEqual);

  return (
    <ConfigProvider locale={lang === 'zh' ? zhCN : enUS}>
      <div className={styles.container}>
        <img src="/react-icon.png" />
        <h1>Reaux integrates the React and Redux frameworks, strict in TypeScript.</h1>
        <br />
        <Space>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
        </Space>
        <br />
        <br />
        <Switch>
          <Route exact path="/" render={() => <></>} />
          <Route exact path="/home" render={() => <HomeView />} />
          <Route exact path="/home/detail" render={() => <HomeDetailView />} />
          <Route exact path="/about" render={() => <AboutView />} />
          <Route exact path="*" render={() => <NotFound />} />
        </Switch>
      </div>
    </ConfigProvider>
  );
};

export default memo(Index);
