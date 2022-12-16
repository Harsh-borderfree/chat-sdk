import React from 'react'
import ChatComponents from '../ChatComponents/ChatComponents'
import { Provider } from 'react-redux'

const BfreeChat = ({ eventID, groupID, store }) => {
  console.log('+++STORRE', eventID, groupID, store)
  return (
    <Provider store={store}>
      <ChatComponents eventID={eventID} groupID={groupID} />
    </Provider>
  )
}

export default BfreeChat
