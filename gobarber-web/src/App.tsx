import React, { Fragment } from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => (
  <Fragment>
    <AppProvider>
      <SignIn />
    </AppProvider>
    <GlobalStyle />
  </Fragment>
);

export default App;
