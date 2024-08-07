import React from "react";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { userData } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path={"/"} element={userData ? <Home /> : <Login />} />
        <Route
          path={"/login"}
          element={userData ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path={"/signup"}
          element={userData ? <Navigate to={"/"} /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
