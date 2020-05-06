import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Fragment>
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
    <GlobalStyle />
  </Fragment>
);

export default App;
