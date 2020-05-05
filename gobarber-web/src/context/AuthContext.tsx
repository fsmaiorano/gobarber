import React, { createContext, useCallback } from 'react';

interface IAuthContext {
  name?: string;
}

export const AuthContext = createContext<IAuthContext>({});
//const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={{ name: 'Fábio' }}>{children}</AuthContext.Provider>;
};
