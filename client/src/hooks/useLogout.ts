import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { hasErrorMessage } from "../utils/hasErrorMessage"

const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { logOut } = useAuthContext()
  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if(data.error) {
        throw new Error(data.error)
      }
      localStorage.removeItem('chat-user')
      logOut()
    } catch (error) {
      if (hasErrorMessage(error)) {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return {
    logout, loading
  }
}

export default useLogout