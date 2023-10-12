# 项目介绍

基于 [reaux-dom](https://github.com/FE-Combo/reaux) 项目模板

## 项目结构

- src/modules：模块（业务代码模块，模块之前没有强依赖）
- src/components：共用组件
- src/services：API 集，可使用 yapi-ts-engine 自动生成
- src/utils：工具库
- public: 静态资源
- config: 项目脚本

## 项目启动

`yarn dev`

## 项目打包

`yarn build`

## 代码规范

- 禁止非法 any
- 代码 commit/push 禁止绕过检测，禁止使用--no-verify
- 变量使用小驼峰名 e.g: let myName = "xiaowang"
- 常量使用全大写字母与下划线 e.g: const MY_NAME ="xiaowang"
- 组件命名使用大驼峰命名 e.g: MyModal.tsx、MyModal/index.tsx
- 路由命名使用全小写字母与中划线 e.g：/account/bo-role
- 静态资源使用全小写字母与中划线 e.g：my-background.png
- css 类选择器使用全小写字母与中划线 e.g：.my-container {}

## 相关 API

- start：启动项目

  - Component：入口组件
  - onError：异常捕获

- register：注册模块

  - handler：模块实例
  - Component：模块组件

- helper：模块辅助函数

  - delay: 延迟执行
  - loading: 装饰器，统一管理加载状态
  - interval: 仅适用于 onTick()生命周期，指定以秒为单位的刻度间隔。

- Model：generate model instance

  - onReady: 在组件渲染之前执行，只执行一次
  - onLoad: 与 componentDidMount 类似
  - onUpdate: 类似于 componentDidUpdate
  - onUnLoad: 类似于 componentWillUnmount
  - onShow: 当前模块在视口中触发，无法使用于 proxyLifeCycle 组件
  - onHide: 当前模块未在视口中触发，无法使用于 proxyLifeCycle 组件
  - onTick: 周期性调用（默认 1s），可以使用@helper.interval 装饰器指定周期（以秒为单位）
  - state: 当前模块状态
  - rootState: 全局状态
  - resetState: 重置当前模块状态
  - setState: 更新当前模块状态

## 创建 Module

```typescript
// module-name/index.ts
import { Model } from 'reaux-dom';
import { State } from './type';
const initialState: State = {
  name: 'test'
};
class ActionHandler extends Model<State> {
  async test() {
    this.setState({ name: 'new test' });
  }
}

export const { actions, View } = register(new ActionHandler('test', initialState), Component);

// module-name/components/Main.tsx
import React from 'react';

const Index = () => {
  return <div>Test</div>;
};

export default Index;
```

## 执行项目

```typescript
// src/index.tsx
import { start } from 'reaux-dom';
import { View } from 'modules/test';

start({ Component: View, container: document.getElementById('framework-app-root') as HTMLDivElement });
```

## Q&A

- 相较于 dva 有什么优势？

  1.  状态按需加载

  2.  更加安全以及完善的 ts 校验

- 每个 action 都需要 dispatch，写法是否可以简化?

  - 其一：action 在 redux 中的定义本身就是一个对象，从官方定义可以看出每个 action 必须要 dispatch 才能生效；

  - 其二：这种方式可以通过同步方式实现异步逻辑，避免在视图层出现复杂的异步处理。
