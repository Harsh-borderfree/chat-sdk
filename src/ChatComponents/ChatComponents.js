import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography, IconButton, ownerWindow } from '@mui/material'
import ChatInput from '../ChatInput/ChatInput'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import ChatMessageList from '../ChatMessageList/ChatMessageList'
import { CircularProgress } from '@mui/material'
import ChatPinnedMessage from '../ChatPinnedMessage/ChatPinnedMessage'
import ChatReplyPop from '../ChatReplyPopup/ChatReplyPopup'
import ChatInputMobile from '../ChatInputMobile/ChatInputMobile'
import './ChatComponents.css'

const ChatComponents = props => {
  const { eventID, isChatLoading } = props
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  const EventPermission = useSelector(state => state.permission)
  const userRole = EventPermission?.event_permission[eventID]?.event_role
  const replayMessages = useSelector(state => state?.chat?.replayMessages)
  const allReplayMessages = replayMessages ? replayMessages[eventID] : []

  const [chatMessageList, setChatMessageList] = useState([])
  const eventsState = useSelector(state => state.events)
  const { customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const [showReplyPopup, setShowReplyPopup] = useState()
  const [repliedMessagesData, setRepliedMessageData] = useState({})
  const { t } = useTranslation()

  const adminPinnedMessages = currentEvent?.chat_info?.pinned_message ? [...currentEvent?.chat_info?.pinned_message] : []

  //Five Types of messages
  // 1.Normal Messages
  // 2.Replied Messages
  // 3.Link Messages
  // 4.Tryon Messages
  // 5.Joined the chat messages

  // useEffect(() => {
  //   console.log('ADMIN PINNNED', adminPinnedMessages)
  // }, [adminPinnedMessages])

  useEffect(() => {
    if (allChatMessages.length > 0 || allReplayMessages.length > 0) {
      const isRecordedVideoPlaying =
        currentEvent.status == 'streaming_done' && global.mem.current.event.isRecordedVideoPlaying == true
      let tempMessageList = []
      if (isRecordedVideoPlaying == true) {
        tempMessageList = [...allReplayMessages]
        setChatMessageList(tempMessageList)
      } else {
        tempMessageList = [...allChatMessages]
        // tempMessageList = tempMessageList.reverse()
        setChatMessageList(tempMessageList)
      }
    }
  }, [allChatMessages, allReplayMessages])

  return (
    <>
      <div className={`chat-elements-box RCChat-container ${userRole}`}>
        {Window.innerWidth > 1024 && (
          <div className='RCChat-title-div'>
            <Typography variant='h6'>{t('preview.chat')}</Typography>
            <IconButton
              className='RCChat-title-close-iconbutton'
              xid='4M'
              // onClick={() => {
              //   props?.setCurrentComponent('RCProductsPanel')
              // }}
              size='large'
            >
              <CloseIcon className='RCChat-title-close-icon' />
            </IconButton>
          </div>
        )}

        {adminPinnedMessages &&
          adminPinnedMessages?.length > 0 &&
          adminPinnedMessages?.map(message => {
            return (
              <div key={message.pin_id} className='pin-msg-box'>
                <ChatPinnedMessage messageData={message} {...props} />
              </div>
            )
          })}

        <div className='RCChat-content-container' id='RCChat-OuterDiv'>
          {isChatLoading ? (
            <div className='chat-loading'>
              <CircularProgress />
            </div>
          ) : !isChatLoading && allChatMessages.length === 0 ? (
            <div className='chat-loading'>NO Messages</div>
          ) : (
            <ChatMessageList
              chatMessageList={chatMessageList}
              {...props}
              setShowReplyPopup={setShowReplyPopup}
              setRepliedMessageData={setRepliedMessageData}
            />
          )}
        </div>
        {showReplyPopup && <ChatReplyPop messageData={repliedMessagesData} {...props} />}

        {window.innerWidth > 1024 ? (
          <ChatInput {...props} showReplyPopup={showReplyPopup} setShowReplyPopu={setShowReplyPopup} />
        ) : (
          <ChatInput {...props} showReplyPopup={showReplyPopup} setShowReplyPopu={setShowReplyPopup} />
          // <ChatInputMobile {...props} showReplyPopup={showReplyPopup} setShowReplyPopu={setShowReplyPopup} />
        )}
      </div>
    </>
  )
}

export default ChatComponents
