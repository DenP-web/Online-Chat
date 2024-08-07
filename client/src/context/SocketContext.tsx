import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

type OnlineUsers = string[]

type SocketContextType = {
  socket: Socket | null;
  onlineUsers: OnlineUsers;
};

type SocketContextProviderProps = {
  children: ReactNode;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});


export const useSocketContext = () => {
  return useContext(SocketContext)
}


export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers>([]);
  const { userData } = useAuthContext();

  

  useEffect(() => {
    if (userData) {
      const newSocket:Socket = io("http://localhost:5000", {
        query: {
          userId: userData._id
        }
      });
      setSocket(newSocket);

      newSocket.on('getOnlineUsers', (users: OnlineUsers) => {
        setOnlineUsers(users)
      })

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
