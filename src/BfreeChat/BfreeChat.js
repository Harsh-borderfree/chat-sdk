import React from 'react'
import ChatComponents from '../ChatComponents/ChatComponents'
import { Provider } from 'react-redux'

const BfreeChat = props => {
  const { eventID, groupID, store } = props
  return (
    <Provider store={store}>
      <ChatComponents {...props} />
    </Provider>
  )
}

export default BfreeChat
