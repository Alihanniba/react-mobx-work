# react、react-router4、mobx初体验

### 使用create-react-app创建项目
```
    create-react-app react-mobx
    cd react-mobx && npm run eject
```
安装装饰器支持
```
    npm install --saveDev babel-plugin-transform-decorators-legacy
```
打开package.json文件，找到"babel"选项，替换如下:
```
    "babel": {
	   "plugins": [
	     "transform-decorators-legacy"
	   ],
	   "presets": [
	     "react-app"
	   ]
     },
```
使用 vscode 开发 mobx 搭配的 react 项目，es7 的 Decorators 预定义语法报错

![](https://static.notion-static.com/90794e80e5ed4bcdafbbf6d0d168f2ed/Untitled)

在项目根目录创建 jsconfig.json，可消除报错，记得重启一下。
```
    {
     "compilerOptions": {
     "experimentalDecorators": true,
     "emitDecoratorMetadata": true
     }
    }
```
![](https://static.notion-static.com/01fa739f5836413fbed968fd19cdfa44/Untitled)

项目入口文件
```
    import React from 'react';
    import { render } from "react-dom";
    import { BrowserRouter as Router } from "react-router-dom";
    import { Provider } from "mobx-react";
    import { AppContainer } from "react-hot-loader";
    import { rehydrate, hotRehydrate } from "rfx-core";
    import App from './App';
    import registerServiceWorker from './registerServiceWorker';
    
    import { isProduction } from "./utils/constants";
    import stores from "./stores/stores";
    
    const store = rehydrate();
    const renderApp = Component => {
     render(
     	<AppContainer>
     	<Router>
     		<Provider store={isProduction ? store : hotRehydrate()}>
     			<App />
     		</Provider>
     	</Router>
     </AppContainer>,
     document.getElementById("root")
     );
    };
```
页面展示文件
```
    import React, { Component } from "react";
    import { Route, Link, withRouter } from "react-router-dom";
    import { inject, observer } from "mobx-react";
    import DevTools from "mobx-react-devtools";
    
    @withRouter
    @inject("store")
    @observer
    export default class App extends Component {
     constructor(props) {
     	super(props);
     	this.store = this.props.store.appState;
     }
     
     // 点击方法
     onHandle = () => {
     	this.store.changeCount(this.store.count + 1)
     }
    
     render() {
     	const { count } = this.store;
     	const { onHandle } = this;
     	return (
     		<div className="wrapper">
     			<button onClick={onHandle}>点击我计数</button>
     			<h1>{count}</h1>
     		</div>
     	);
     }
    }
```
页面效果

![](https://static.notion-static.com/803317cd09e74fb0be06ced513bc1205/Untitled)