import React, { Fragment } from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Fragment>
    <SignIn />
    <GlobalStyle />
  </Fragment>
);

export default App;
