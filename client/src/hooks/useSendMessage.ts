import { useState } from "react"
import { TResponseSendMessageData, TServerErrorData } from "../types"
import { hasErrorMessage } from "../utils/hasErrorMessage"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConvesation"
import { UseFormReset } from "react-hook-form"



const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { messages, setMessages ,selectedConversation} =  useConversation()
  

  const sendMessage = async (message: {message: string}, reset: UseFormReset<{message: string}>) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation?._id}`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
      })

      const data : TResponseSendMessageData | TServerErrorData  = await res.json()

      if('error' in data) {
        throw new Error(data.error)
      }
      setMessages([...messages, data])
      setIsSuccess(true)
      reset()
    } catch (error) {
      if(hasErrorMessage(error)) {
        toast.error(error.message)
      }
    }finally {
      setLoading(false)
    }
  }
  
  return {loading, sendMessage, isSuccess}


}

export default useSendMessage