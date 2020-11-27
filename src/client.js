import App from './redux/containers/app';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./redux/containers/app', () => {
    hydrate(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  });
}
