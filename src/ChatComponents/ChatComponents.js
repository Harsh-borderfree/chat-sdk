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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ChatInputMobile from '../ChatInputMobile/ChatInputMobile'
import './ChatComponents.css'

const ChatComponents = props => {
  const { eventID, isChatLoading, setCurrentComponent } = props
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
  const [event_layout, setEventLayout] = useState(
    currentEvent?.event_type === 'call_1to1' && userRole === 'v2_1to1_customer' && window.innerWidth < 1025
      ? 'portrait'
      : currentEvent?.show_type
      ? currentEvent?.show_type
      : 'landscape'
  )
  const [isOverFLowingChat, setIsOverflowingChat] = useState(false)
  const [showChatPortrait, setShowChatPortrait] = useState(false)

  const mobilePortrait = window.innerWidth < 1025 && event_layout === 'portrait'

  useEffect(() => {
    if (currentEvent?.event_type === 'call_1to1' && userRole === 'v2_1to1_customer' && window.innerWidth < 1025) {
      setEventLayout('portrait')
    } else if (currentEvent?.show_type === 'portrait' && currentEvent?.event_type === 'live_stream') {
      setEventLayout('portrait')
    }
  }, [userRole, currentEvent?.show_type])

  //Five Types of messages
  // 1.Normal Messages
  // 2.Replied Messages
  // 3.Link Messages
  // 4.Tryon Messages
  // 5.Joined the chat messages

  useEffect(() => {
    if (allChatMessages?.length > 0 || allReplayMessages?.length > 0) {
      const isRecordedVideoPlaying =
        currentEvent.status == 'streaming_done' && global.mem.current.event.isRecordedVideoPlaying == true
      let tempMessageList = []
      if (isRecordedVideoPlaying == true) {
        tempMessageList = [...allReplayMessages]
        setChatMessageList(tempMessageList)
      } else {
        tempMessageList = [...allChatMessages]
        setChatMessageList(tempMessageList)
      }

      //Check for chat overflowing for mobile portrait only
      if (mobilePortrait) {
        let mlist = document.getElementsByClassName('Chat-message-list-container')
        let isOverflowing = false
        if (mlist && mlist[0]) {
          isOverflowing = mlist[0]?.clientWidth < mlist[0]?.scrollWidth || mlist[0]?.clientHeight < mlist[0]?.scrollHeight
          setIsOverflowingChat(isOverflowing)
        } else {
          setIsOverflowingChat(isOverflowing)
        }
      }
    }
  }, [allChatMessages, allReplayMessages])

  // useEffect(() => {
  //   if (showChatPortrait) {
  //   }
  // }, [showChatPortrait])

  return (
    <>
      <div className={`chat-elements-box RCChat-container ${userRole} ${event_layout}`}>
        {Window.innerWidth > 1024 && (
          <div className='RCChat-title-div'>
            <Typography variant='h6'>{t('preview.chat')}</Typography>
            <IconButton
              className='RCChat-title-close-iconbutton'
              xid='4M'
              onClick={() => {
                setCurrentComponent('RCProductsPanel')
              }}
              size='large'
            >
              <CloseIcon className='RCChat-title-close-icon' />
            </IconButton>
          </div>
        )}

        {!mobilePortrait &&
          adminPinnedMessages &&
          adminPinnedMessages?.length > 0 &&
          adminPinnedMessages?.map(message => {
            return (
              <div key={message.pin_id} className='pin-msg-box'>
                <ChatPinnedMessage messageData={message} {...props} event_layout={event_layout} />
              </div>
            )
          })}

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

        <div className={`RCChat-content-container`} id={`RCChat-OuterDiv`}>
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
              event_layout={event_layout}
              isOverFLowingChat={isOverFLowingChat}
              showChatPortrait={showChatPortrait}
              setShowChatPortrait={setShowChatPortrait}
            />
          )}
        </div>
        {mobilePortrait &&
          adminPinnedMessages &&
          adminPinnedMessages?.length > 0 &&
          adminPinnedMessages?.map(message => {
            return (
              <div key={message.pin_id} className='pin-msg-box'>
                <ChatPinnedMessage messageData={message} {...props} event_layout={event_layout} />
              </div>
            )
          })}
        {showReplyPopup && <ChatReplyPop messageData={repliedMessagesData} {...props} />}

        {window.innerWidth > 1024 ? (
          <ChatInput {...props} showReplyPopup={showReplyPopup} setShowReplyPopu={setShowReplyPopup} />
        ) : (
          <ChatInputMobile
            {...props}
            showReplyPopup={showReplyPopup}
            setShowReplyPopu={setShowReplyPopup}
            event_layout={event_layout}
          />
        )}
      </div>
    </>
  )
}

export default ChatComponents
