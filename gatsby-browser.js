import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import createStore from "./src/state/store";

const replaceComponentRenderer = ({ history }) => {
  const store = createStore();

  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store} >
      <Router history={history} >{children}</Router >
    </Provider >
  );

  ConnectedRouterWrapper.propTypes = {
    children: PropTypes.object.isRequired
  };

  return ConnectedRouterWrapper;
};

export {
  replaceComponentRenderer
}
