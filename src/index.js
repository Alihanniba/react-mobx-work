import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import { rehydrate, hotRehydrate } from "rfx-core";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { isProduction } from "./utils/constants";
// import stores from "./stores/stores";
import './index.css';

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

renderApp(App);

if (module.hot) {
  module.hot.accept(() => renderApp(App));
}

registerServiceWorker();
