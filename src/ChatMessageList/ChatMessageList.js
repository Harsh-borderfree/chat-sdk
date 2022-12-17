import React, { useState } from 'react'
import AnonChatMessageBox from '../AnonChatMessageBox/AnonChatMessageBox'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'
import ChatReplyMessage from '../ChatReplyMessage/ChatReplyMessage'

const ChatMessageList = props => {
  const messagesList = props.chatMessageList

  return (
    <>
      <div className='Chat-message-list-container'>
        {messagesList.map(message => {
          // For anon joined the chat message
          if (
            message?.sender_id?.includes('anon_') &&
            message?.message_text?.includes('joined the chat') &&
            !message?.sender_name
          ) {
            return (
              <>
                <AnonChatMessageBox messageData={message} />
              </>
            )
          }
          // All Normal and replied message
          else {
            if (message?.reply_type) {
              return (
                <>
                  <ChatReplyMessage messageData={message} {...props} />
                </>
              )
            } else {
              return (
                <>
                  <ChatMessageBox messageData={message} {...props} />
                </>
              )
            }
          }
        })}
      </div>
    </>
  )
}

export default ChatMessageList
