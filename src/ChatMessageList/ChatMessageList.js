import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AnonChatMessageBox from '../AnonChatMessageBox/AnonChatMessageBox'
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox'
import { useTranslation } from 'react-i18next'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton, CircularProgress } from '@mui/material'
import scrollIntoView from 'scroll-into-view-if-needed'

const ChatMessageList = props => {
  const { t } = useTranslation()
  const {
    isOverFLowingChat,
    eventID,
    event_layout,
    setIsOverflowingChat,
    setShowNewMessageToast,
    lastChatKey,
    setLastChatKey,
    groupID,
    hasMoreChats,
    setHasMoreChats,
  } = props
  const eventsState = useSelector(state => state.events)
  const { customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const mobilePortrait = window.innerWidth < 1025 && event_layout === 'portrait'
  const [showChat, setShowChat] = useState(true)
  const allReduxMessages = useSelector(state => state?.chat?.allMessages)
  const allChatMessages = allReduxMessages[eventID] || []
  let bottomInputElement = document.getElementsByClassName('RCChat-Input-Container')
  let bottomInputHeight = 50
  if (bottomInputElement) {
    bottomInputHeight = bottomInputElement[0]?.clientHeight
  }
  const replayMessages = useSelector(state => state?.chat?.replayMessages)
  const allReplayMessages = replayMessages ? replayMessages[eventID] : []

  const [chatMessageList, setChatMessageList] = useState([])
  const allSingleMessage = useSelector(state => state?.chat?.singleMessage)
  const singleMessage = allSingleMessage && allSingleMessage[eventID] ? allSingleMessage[eventID] : []

  const scrollToBottom = () => {
    const node = document.getElementById('end-div')
    scrollIntoView(node, {
      scrollMode: 'if-needed',
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }

  useEffect(() => {
    setTimeout(() => {
      var chatHistory = document.getElementById('messageBody')
      if (chatHistory) chatHistory.scrollTop = chatHistory.scrollHeight
    }, 100)
  }, [])

  useEffect(() => {
    global.sdk.ResetChatCounter({ EventId: eventID })
  })

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
        tempMessageList.reverse()
        setChatMessageList(tempMessageList)
      }

      setTimeout(() => {
        let mlist = document.getElementsByClassName('Chat-message-list-container')
        let isOverflowing = false
        if (mlist && mlist[0]) {
          isOverflowing = mlist[0]?.clientWidth < mlist[0]?.scrollWidth || mlist[0]?.clientHeight < mlist[0]?.scrollHeight
          setIsOverflowingChat(isOverflowing)
        }
      }, 100)
    }
  }, [allChatMessages, allReplayMessages])

  useEffect(() => {
    let loggingUser = localStorage.getItem('user-email')

    if (singleMessage?.length != 0) {
      if (singleMessage[0]?.requestMsg && singleMessage[0]?.requestMsg?.requestMsg.status === 'added') {
        if (loggingUser === singleMessage[0]?.requestMsg?.requestMsg.sender_id) {
          console.log('===>CALLING SCROLL TO BOTTOM LINE NUMBER 32')
          setTimeout(() => {
            scrollToBottom()
          }, 300)
        } else {
          let mlist = document.getElementsByClassName('Chat-message-list-container')
          let endDiv = document.getElementById('end-div')
          let mlistH = 0
          let endDivH = 0
          if (mlist && mlist[0]) {
            mlistH = mlist[0].getBoundingClientRect().bottom
          }

          if (endDiv) {
            endDivH = endDiv.getBoundingClientRect().bottom
          }
          if (endDivH - mlistH <= 10) {
            console.log('===>CALLING SCROLL TO BOTTOM AND NEW MESSAGE TOASTE FALSE LINE NU 50')
            setTimeout(() => {
              scrollToBottom()
            }, 300)
            setShowNewMessageToast(false)
          } else {
            console.log('===>CALLING NEW MESSAGE TOASTE TRUE LINE NU 57')
            // SHOW NEW MESSAGE TOAST IF CHAT IS VISIBLE
            setShowNewMessageToast(true)
          }
        }
      }
    }
  }, [singleMessage])

  const makeChatHidden = () => {
    let mbox = document.getElementsByClassName('rce-container-mbox')
    let anonMBox = document.getElementsByClassName('anon-container-mbox')

    if (mbox && mbox[0]) {
      mbox[0].style.display = 'none'
    }

    if (anonMBox && anonMBox[0]) {
      anonMBox[0].style.display = 'none'
    }
  }

  const makeChatVisible = () => {
    let mbox = document.getElementsByClassName('rce-container-mbox')
    let anonMBox = document.getElementsByClassName('anon-container-mbox')

    if (mbox && mbox[0]) {
      mbox[0].style.display = 'block'
    }

    if (anonMBox && anonMBox[0]) {
      anonMBox[0].style.display = 'block'
    }
  }

  useEffect(() => {
    if (showChat) {
      makeChatVisible()
    } else {
      makeChatHidden()
    }
  }, [showChat])

  const [loading, setLoading] = useState(false)

  function handleLoadMore() {
    setLoading(true)

    global.sdk.FetchChatData(
      {
        streamID: eventID,
        groupID: groupID,
        lastChatKey: lastChatKey,
        insertLast: false,
        limit: 100,
      },

      res => {
        setLastChatKey(res.data.last_eval_key.id)
        setHasMoreChats(res.data.has_next)
        setLoading(false)
      },
      () => {}
    )
  }

  function isAtTop(currentTarget) {
    return currentTarget.scrollTop !== 0
  }

  return (
    <>
      <div
        className={`Chat-message-list-container ${loading ? 'loading' : ''}`}
        onScroll={e => {
          if (!hasMoreChats || isAtTop(e.currentTarget)) return
          handleLoadMore()
        }}
        id='messageBody'
      >
        {mobilePortrait && !isOverFLowingChat && allChatMessages?.length > 0 && (
          <div
            xid='97'
            onClick={e => {
              e.stopPropagation()
              setShowChat(prev => !prev)
            }}
            className='RCChat-PortraitView-Title'
          >
            <span style={{ color: '#ffffff' }}>{t('preview.chat')}</span>
            {showChat ? (
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
        {chatMessageList?.map(message => {
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
        <div id='end-div'></div>
        {loading && (
          <div className='RCChat-CircularProgress'>
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  )
}

export default ChatMessageList
