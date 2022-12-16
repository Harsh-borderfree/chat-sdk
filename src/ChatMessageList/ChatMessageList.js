import React, { useState } from 'react'
import AnonChatMessageBox from '../AnonChatMessageBox/AnonChatMessageBox'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'

const ChatMessageList = props => {
  const messagesList = props.chatMessageList

  const [NormalMessage, setNormalMessages] = useState([])
  const [repliedMessages, setRepliedMessages] = useState([])

  return (
    <>
      <div className='Chat-message-list-container'>
        {messagesList.map(message => {
          if (
            message?.sender_id?.includes('anon_') &&
            message?.message_text?.includes('joined the chat') &&
            !message?.sender_name
          ) {
            return (
              <>
                <AnonChatMessageBox message={message} />
              </>
            )
          } else {
            return (
              <>
                <ChatMessageBox message={message} {...props} />
              </>
            )
          }
        })}
      </div>
    </>
  )
}

export default ChatMessageList
