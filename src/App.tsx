import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

import Routes from './routes';
import store from './redux/store';

const REACT_APP_BACKEND_URL = 'https://sungazer-api.herokuapp.com';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
