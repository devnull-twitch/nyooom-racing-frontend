import React, { createContext, useState, FC, PropsWithChildren, useContext } from "react";

export interface IUserContext {
  username: string;
  password: string;
  set: (username: string, password: string) => void;
}

const ctx = createContext<IUserContext | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const set = (newUsername: string, newPassword: string) => {
    setUsername(newUsername);
    setPassword(newPassword);
  };

  return (
    <ctx.Provider value={{
      username,
      password,
      set
    }}>
      {children}
    </ctx.Provider>
  );
};

export const useSetUser = (): (username: string, password: string) => void => {
  const currentCtx = useContext(ctx);
  return currentCtx!.set;
};

export const useCredentials = (): [string, string] => {
  const currentCtx = useContext(ctx);
  return [currentCtx!.username, currentCtx!.password];
};