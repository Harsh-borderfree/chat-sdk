import React, { useState, useSelector } from 'react'
import AnonChatMessageBox from '../AnonChatMessageBox/AnonChatMessageBox'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'

const ChatMessageList = props => {
  const messagesList = props?.chatMessageList
  const { isOverFLowingChat, showChatPortrait, eventID, setShowChatPortrait, event_layout } = props
  const mobilePortrait = window.innerWidth < 1025 && event_layout === 'portrait'
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  let bottomInputElement = document.getElementsByClassName('RCChat-Input-Container')
  let bottomInputHeight = 50
  if (bottomInputElement) {
    bottomInputHeight = bottomInputElement[0]?.clientHeight
  }

  return (
    <>
      <div className='Chat-message-list-container'>
        {mobilePortrait && isOverFLowingChat && allChatMessages?.length > 0 && (
          <div
            xid='97'
            onClick={e => {
              e.stopPropagation()
              setShowChatPortrait(prev => !prev)
            }}
            className='RCChat-PortraitView-Title-overflow'
            // style={{
            //   top: props?.showChat
            //     ? '0px'
            //     : `calc(100% - ${messageTextFieldHeight}px - ${largestHeight}px - ${newMessageToastHeight}px - ${replyBoxHeight}px`,
            // }}
          >
            <span style={{ color: '#ffffff' }}>{t('preview.chat')}</span>
            {showChatPortrait ? (
              <IconButton>
                <KeyboardArrowDownIcon className='chat-accordian-icon' />
              </IconButton>
            ) : (
              <IconButton>
                <KeyboardArrowUpIcon className='chat-accordian-icon' />
              </IconButton>
            )}
          </div>
        )}
        {messagesList?.map(message => {
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
