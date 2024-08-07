import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { hasErrorMessage } from "../utils/hasErrorMessage"
import { TUserData, TUserErrorData } from "../types"
import { useAuthContext } from "../context/AuthContext"


const useGetConversation = () => {
  const {logOut} = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [conversations, setConversations] = useState<TUserData[] | null>(null)

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/users')
        const data: TUserData[] | TUserErrorData = await res.json()

        if ('error' in data) {
          throw new Error(data.error)
        }
        setConversations(data)
      } catch (error) {
        if (hasErrorMessage(error)) {
          toast.error(error.message)
          logOut()
        }
      } finally {
        setLoading(false)
      }
    }
    getConversation()
  }, [])

  return {loading, conversations}

}

export default useGetConversation