import { useState } from "react"
import { TSignUpInputs } from "../pages/signup/SignUp"
import toast from "react-hot-toast"
import { hasErrorMessage } from "../utils/hasErrorMessage"
import { TUserData, TUserErrorData } from "../types"
import { useAuthContext } from "../context/AuthContext"

const useSingUp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const {setUser} = useAuthContext()

  const signUp = async (signUpData: TSignUpInputs) => {

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data : TUserData | TUserErrorData  = await response.json()
      if('error' in data) {
        throw new Error(data.error)
      }
      setUser(data)
      setIsSuccess(true)
      toast.success('You successfully REGISTER')
    } catch (error) {
      if (hasErrorMessage(error)) {
        toast.error(error.message)
        setIsSuccess(false)
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading, signUp, isSuccess
  }
}

export default useSingUp