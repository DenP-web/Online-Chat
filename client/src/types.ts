export type TUserData = {
  _id: string
  fullName: string
  username: string
  profilePic: string
  gender?: string,
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

export type TUserErrorData = {
  error: string
}

export type TServerErrorData = {
  error: string
}

export type TResponseSendMessageData = {
  senderId: string
  receiverId: string
  message: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}