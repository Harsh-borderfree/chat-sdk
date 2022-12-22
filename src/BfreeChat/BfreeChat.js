import React from 'react'
import ChatComponents from '../ChatComponents/ChatComponents'
import { Provider } from 'react-redux'

const BfreeChat = props => {
  const { eventID, groupID, store } = props
  console.log('++++BFREEE CHAT', props)

  return <ChatComponents {...props} />
}

export default BfreeChat
