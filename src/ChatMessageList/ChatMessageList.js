import React, { useState } from 'react'
import AnonChatMessageBox from '../AnonChatMessageBox/AnonChatMessageBox'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'
import ChatReplyMessage from '../ChatReplyMessage/ChatReplyMessage'

const ChatMessageList = props => {
  const messagesList = props.chatMessageList

  let bottomInputElement = document.getElementsByClassName('RCChat-Input-Container')
  let bottomInputHeight = 50
  if (bottomInputElement) {
    bottomInputHeight = bottomInputElement[0]?.clientHeight
  }

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
                <AnonChatMessageBox messageData={message} key={message?.id} />
              </>
            )
          }
          // All Normal and replied message
          else {
            return (
              <>
                <ChatMessageBox messageData={message} {...props} key={message?.id} />
              </>
            )
          }
        })}
      </div>
    </>
  )
}

export default ChatMessageList
