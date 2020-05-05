import { createContext } from 'react';

interface IAuthContext {
  name?: string;
}

const AuthContext = createContext<IAuthContext>({});
//const AuthContext = createContext<AuthContext>({} as AuthContext);

export default AuthContext;
