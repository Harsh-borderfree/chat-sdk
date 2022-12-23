import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography, IconButton } from '@mui/material'
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
import NewMessageToast from '../ChatMessageList/NewMessageToast'
import scrollIntoView from 'scroll-into-view-if-needed'

const ChatComponents = props => {
  const { eventID, isChatLoading, setCurrentComponent } = props
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  const EventPermission = useSelector(state => state.permission)
  const userRole = EventPermission?.event_permission[eventID]?.event_role
  const eventsState = useSelector(state => state.events)
  const { customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const [showReplyPopup, setShowReplyPopup] = useState(false)
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
  const [showChatPortrait, setShowChatPortrait] = useState(true)
  const [showNewMessageToast, setShowNewMessageToast] = useState(false)
  const mobilePortrait = window.innerWidth < 1025 && event_layout === 'portrait'

  //For position of chat accordian when close
  let pinnedElement = document.getElementsById('pin-msg-con')
  let pushedPollContainer = document.getElementsByClassName('RCPoll-Wrapper')
  let pushedBannerContainer = document.getElementsByClassName('parent_banner')
  let messageTextField = document.getElementsByClassName('message-textField')
  let newMessageToast = document.getElementsById('new-msg-toaster')
  let replyBox = document.getElementsById('reply-popup')

  let newMessageToastHeight = 0

  if (newMessageToast) {
    newMessageToastHeight = newMessageToast?.clientHeight
  }

  let messageTextFieldHeight = 99
  if (messageTextField?.length > 0 && messageTextField[0]) {
    messageTextFieldHeight = Math.max(messageTextField[0]?.clientHeight + 25, 99)
  }

  let replyBoxHeight = 0
  if (replyBox) {
    replyBoxHeight = replyBox?.clientHeight
  }

  let pinContainerHeight = 0
  if (pinnedElement) {
    pinContainerHeight = pinnedElement?.clientHeight
  }

  let pushedBannerContainerHeight = 0
  if (pushedBannerContainer?.length > 0 && pushedBannerContainer[0]) {
    pushedBannerContainerHeight = pushedBannerContainer[0]?.clientHeight
  }
  let pushedPollContainerHeight = 0
  if (pushedPollContainer?.length > 0 && pushedPollContainer[0]) {
    pushedPollContainerHeight = pushedPollContainer[0]?.clientHeight + 10
  }
  let largestHeight = Math.max(pinContainerHeight, pushedBannerContainerHeight, pushedPollContainerHeight)

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

  const makeChatHidden = () => {
    let mlist = document.getElementsByClassName('message-container')
    let chatTitle = document.getElementsByClassName('RCChat-PortraitView-Title-overflow')

    if (mlist && mlist) {
      mlist.style.visibility = 'hidden'
    }

    if (chatTitle?.length > 0 && chatTitle[0]) {
      chatTitle[0].style.top = `calc(100% - ${messageTextFieldHeight}px - ${largestHeight}px - ${newMessageToastHeight}px - ${replyBoxHeight}px)`
    }
  }

  const makeChatVisible = () => {
    let mlist = document.getElementsByClassName('Chat-message-list-container')
    let chatTitle = document.getElementsByClassName('RCChat-PortraitView-Title-overflow')

    if (mlist?.length > 0 && mlist[0]) {
      mlist[0].style.visibility = 'visible'
    }

    if (chatTitle?.length > 0 && chatTitle[0]) {
      chatTitle[0].style.top = '0px'
    }
  }

  useEffect(() => {
    if (showChatPortrait) {
      makeChatVisible()
    } else {
      makeChatHidden()
    }
  }, [showChatPortrait])

  return (
    <>
      <div className={`chat-elements-box RCChat-container ${userRole} ${event_layout}`}>
        {window.innerWidth > 1024 && (
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
              <div key={message.pin_id} className='pin-msg-box' id='pin-msg-con'>
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
            style={{
              top: showChatPortrait ? '0px' : `calc(100% - 99px)`,
            }}
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
          ) : !isChatLoading && allChatMessages?.length === 0 ? (
            <div className='chat-loading'>NO Messages</div>
          ) : (
            <ChatMessageList
              {...props}
              setShowReplyPopup={setShowReplyPopup}
              setRepliedMessageData={setRepliedMessageData}
              setIsOverflowingChat={setIsOverflowingChat}
              event_layout={event_layout}
              isOverFLowingChat={isOverFLowingChat}
              setShowNewMessageToast={setShowNewMessageToast}
            />
          )}
        </div>
        {showNewMessageToast && (
          <div
            className='new-message-btn-container'
            xid='4T'
            onClick={() => {
              const node = document.getElementById('end-div')
              scrollIntoView(node, {
                scrollMode: 'if-needed',
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              })
              setShowNewMessageToast(false)

              // if (props?.showChat) {
              //   scrollToBottom()
              //   setShowNewMessageToast(false)
              // } else {
              //   makeChatVisible()
              // }
            }}
            size='large'
          >
            <NewMessageToast size={25} className='new-messages-button' id='new-msg-toaster' />
          </div>
        )}
        {mobilePortrait &&
          adminPinnedMessages &&
          adminPinnedMessages?.length > 0 &&
          adminPinnedMessages?.map(message => {
            return (
              <div key={message.pin_id} className='pin-msg-box' id='pin-msg-con'>
                <ChatPinnedMessage messageData={message} {...props} event_layout={event_layout} />
              </div>
            )
          })}
        {showReplyPopup && <ChatReplyPop messageData={repliedMessagesData} {...props} setShowReplyPopup={setShowReplyPopup} />}

        {window.innerWidth > 1024 ? (
          <ChatInput
            {...props}
            showReplyPopup={showReplyPopup}
            setShowReplyPopup={setShowReplyPopup}
            repliedMessagesData={repliedMessagesData}
          />
        ) : (
          <ChatInputMobile
            {...props}
            repliedMessagesData={repliedMessagesData}
            showReplyPopup={showReplyPopup}
            setShowReplyPopup={setShowReplyPopup}
            event_layout={event_layout}
          />
        )}
      </div>
    </>
  )
}

export default ChatComponents
