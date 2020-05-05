import React, { Fragment } from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <Fragment>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </Fragment>
);

export default App;
