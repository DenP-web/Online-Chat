import { create } from 'zustand'
import { TResponseSendMessageData, TUserData } from '../types'

type useConversationType = {
  selectedConversation: TUserData | null
  setSelectedConversation: (selectedConversation: TUserData | null) => void
  messages: TResponseSendMessageData[]
  setMessages: (messages: TResponseSendMessageData[]) => void
}


const useConversation = create<useConversationType>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages })
}))

export default useConversation
