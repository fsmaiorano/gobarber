import React, { Fragment } from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <Fragment>
    <AuthContext.Provider value={{ name: 'Fábio' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </Fragment>
);

export default App;
