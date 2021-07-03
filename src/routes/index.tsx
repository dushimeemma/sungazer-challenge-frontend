import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Transactions from '../pages/Transactions';

const index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/transactions' component={Transactions} />
      </Switch>
    </Router>
  );
};

export default index;
