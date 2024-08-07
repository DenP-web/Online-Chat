import { useEffect, useState } from "react"
import { hasErrorMessage } from "../utils/hasErrorMessage"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConvesation"
import { TResponseSendMessageData, TServerErrorData } from "../types"
import { useAuthContext } from "../context/AuthContext"



const useGetMessages = () => {
  const { logOut } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/messages/${selectedConversation?._id}`)
        const data: TResponseSendMessageData[] | TServerErrorData = await res.json()

        if ('error' in data) {
          throw new Error(data.error)
        }
        setMessages(data)
      } catch (error) {
        if (hasErrorMessage(error)) {
          toast.error(error.message)
          logOut()
        }
      } finally {
        setLoading(false)
      }
    }
    getMessages()
  }, [selectedConversation?._id, setMessages])


  return { loading, messages }
}

export default useGetMessages