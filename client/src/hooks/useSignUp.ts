import { useState } from "react"
import { TSignUpInputs } from "../pages/signup/SignUp"
import toast from "react-hot-toast"
import { hasErrorMessage } from "../utils/hasErrorMessage"
import { TSingUpData } from "../types"
import { useAuthContext } from "../context/AuthContext"

const useSingUp = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const {setUser} = useAuthContext()

  const signUp = async (signUpData: TSignUpInputs) => {

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data : TSingUpData  = await response.json()
      setUser(data)
      setIsSuccess(true)
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