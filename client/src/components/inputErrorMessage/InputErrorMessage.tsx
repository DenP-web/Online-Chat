

import React from 'react'

type InputErrorMessageProps = {
  message: string
}


const InputErrorMessage: React.FC<InputErrorMessageProps> = ({message}) => {
  return (
    <span className="absolute bottom-[-10px] left-0 text-red-500 text-sm">
      {message}
    </span>
  )
}

export default InputErrorMessage
