import { useState } from "react";
import { TLoginInputsValues } from "../pages/login/Login";
import toast from "react-hot-toast";
import { hasErrorMessage } from "../utils/hasErrorMessage";
import { TUserData, TUserErrorData } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuthContext();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const login = async (loginData: TLoginInputsValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data: TUserData | TUserErrorData = await res.json();
      if('error' in data) {
        throw new Error(data.error)
      }
      
      setUser(data);
      setIsSuccess(true);
      toast.success('You successfully LOGIN');

    } catch (error) {
      if (hasErrorMessage(error)) {
        toast.error(error.message);
        setIsSuccess(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, login, isSuccess
  };
};

export default useLogin;
