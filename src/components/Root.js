import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from '../reducers';

const store = createStore(reducers, applyMiddleware(reduxThunk));

const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Root;
