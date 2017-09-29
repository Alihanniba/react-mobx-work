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
