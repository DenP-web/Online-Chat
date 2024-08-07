import React, { createContext, useState, useContext, ReactNode } from "react";
import { TUserData } from "../types";

type AuthContextType = {
  userData: TUserData | null;
  setUser: (data: TUserData) => void;
  logOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  userData: null,
  setUser: () => {},
  logOut: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const storedUser = localStorage.getItem("chat-user");
  
  const initialUserData: TUserData | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const [userData, setUserData] = useState<TUserData | null>(initialUserData);
  const setUser = (data: TUserData) => {
    setUserData(data);
    localStorage.setItem("chat-user", JSON.stringify(data));
  };

  const logOut = () => {
    setUserData(null);
    localStorage.removeItem('chat-user')
  };

  return (
    <AuthContext.Provider value={{ userData, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
