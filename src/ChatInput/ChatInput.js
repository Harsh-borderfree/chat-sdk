import {
  Button,
  IconButton,
  TextField,
  CircularProgress,
  Tooltip,
  Paper,
  Typography,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  InputAdornment,
} from '@mui/material'
import GraphemeSplitter from 'grapheme-splitter'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect, createRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { GetRole, showThreeDotsAfterNText, uuidv4, handleDisplayName, checkForBlockEmail } from '../ChatUtils/chatUtils'
import ChatToolTipDesc from './ChatToolTipDesc'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SettingsIcon from '@mui/icons-material/Settings'

const ChatInput = props => {
  let inputRef = createRef()
  const [maxLimitExceeds, setMaxLimitExceeds] = useState(false)
  const EventPermission = useSelector(state => state.permission)
  const splitter = new GraphemeSplitter()
  const [textfieldLineHeight, setTextfieldLineHeight] = useState(0)
  const [inputMessage, setInputMessage] = useState('')
  const { eventID, groupID, isAllowed, Permissions, Auth, repliedMessagesData, setShowReplyPopup } = props
  const { t } = useTranslation()
  const eventsState = useSelector(state => state.events)
  const { customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const allReduxHostChatAsBrand = useSelector(state => state?.chat?.hostChatAsBrand)
  const permissions = EventPermission?.event_permission[eventID]?.permission
  const loggedInEmail = localStorage.getItem('user-email')

  const userData = useSelector(state => state?.userdata?.userData)
  const hostChatAsBrand = allReduxHostChatAsBrand && allReduxHostChatAsBrand[eventID] ? allReduxHostChatAsBrand[eventID] : {}
  const [displayNameBox, setDisplayNameBox] = useState(false)
  const [displayName, setDisplayName] = useState(userData?.displayName ? userData?.displayName : '')
  const [showHelperText, setShowHelperText] = useState('')
  const [updatingDisplayName, setUpdatingDisplayName] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [editDisplayNameBox, setEditDisplayNameBox] = useState(false)
  const [selectedChatTitle, setSelectedChatTitle] = useState(
    hostChatAsBrand && hostChatAsBrand[loggedInEmail] ? sessionStorage.getItem('ORGNAME') : userData?.displayName
  )
  const [showChangeChatTitleBox, setShowChangeChatTitleBox] = useState(false)
  const userRole = EventPermission?.event_permission[eventID]?.event_role
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const TEXT_LIMIT = 200

  // Utils function
  const isHostAndPrimaryHost = email => {
    return (
      GetRole(customisedEvents[eventID]?.permissions, email) === 'v2_host' ||
      GetRole(customisedEvents[eventID]?.permissions, email) === 'v2_primary_host'
    )
  }

  const countTextfieldLines = e => {
    let lineHeight = e.target.clientHeight
    setTextfieldLineHeight(lineHeight)
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(res => {
        setUserEmail(res.attributes.email)
      })
      .catch(e => Logger.log('ERROR', `${fileName}` + ' Error fetching user :', e))
  }, [userData?.displayName])

  // ANON JOINED THE CHAT MESSAGE
  const sentAnonJoinedMessage = () => {
    setUpdatingDisplayName(true)
    let requestBody = {
      id: localStorage.getItem('fingerprint'),

      data: {
        email: userEmail,
        displayName: displayName.trim(),
      },
      group_id: 'null',
    }
    global.sdk.UpdateUser(
      requestBody,
      res => {
        setUpdatingDisplayName(false)
        setDisplayName('')
        setDisplayNameBox(false)
        setEditDisplayNameBox(false)
        if (userData?.displayName) {
          //not showing snackbar will do later
          //  props?.setShowSnackbar({
          //    show: true,
          //    message: t("preview.update_name"),
          //    type: "success",
          //  });
        }

        global.sdk.SetHostChatAsBrand({
          eventID: eventID,
          email: localStorage.getItem('user-email'),
          value: false,
        })

        //anon joined the chat messages after updating user json
        if (userEmail?.startsWith('anon_') && !userData?.displayName) {
          let anonMessageText = `${showThreeDotsAfterNText(displayName.trim(), 12)} joined the chat`

          let senderUserReqBody = {
            message_text: anonMessageText,
            sender_id: userEmail,
            user_type: 'consumer',
            push_time: new Date().getTime(),
            status: 'added',
            msg_id: uuidv4(),
            has_preview: false,
            group_id: `${groupID}_${eventID}_L0`,
            message_type: 'text',
          }
          global.sdk.SendChatMsgToAdmin(
            {
              streamID: eventID,
              groupID: groupID,
              data: {
                function: 'chat',
                requestMsg: {
                  ...senderUserReqBody,
                  ...{
                    reply_to_message: '',
                    reply_to_user: '',
                    reply_type: '',
                  },
                },
              },
            },
            response => {
              setInputMessage('')
            },
            () => {}
          )
        }
      },
      e => {
        setDisplayNameBox(false)
        setEditDisplayNameBox(false)
        setDisplayName('')
        setUpdatingDisplayName(false)
        console.log('error during updating displayname', e)
      }
    )
  }

  // Send Chat Function
  const sendChat = () => {
    setShowEmojiPicker(false)
    let message = inputMessage.trim()
    setInputMessage('')
    setShowReplyPopup(false)
    //req body for user type consumer
    let senderUserReqBody = {
      message_text: message,
      sender_id: userEmail,
      sender_name: userData?.displayName ?? deciderSenderId(userEmail),
      user_type: 'consumer',
      push_time: new Date().getTime(),
      status: 'added',
      msg_id: uuidv4(),
      has_preview: false,
      group_id: `${groupID}_${eventID}_L0`,
      message_type: 'text',
    }
    let senderAdminReqBody = {
      message_text: message,
      sender_id: userEmail,
      user_type: 'admin',
      push_time: new Date().getTime(),
      msg_id: uuidv4(),
      role: 'creator',
      sender_name: hostChatAsBrand && hostChatAsBrand[loggedInEmail] ? sessionStorage.getItem('ORGNAME') : userData?.displayName,
      status: 'added',
      has_preview: false,
      group_id: `${groupID}_${eventID}_L0`,
      message_type: 'text',
    }

    if (!isAllowed(permissions, Permissions.chat_admin_msg_unpin.index)) {
      global.sdk.SendChatMsgToAdmin(
        {
          streamID: eventID,
          groupID: groupID,

          data: {
            function: 'chat',
            requestMsg: !props?.showReplyPopup
              ? senderUserReqBody
              : {
                  ...senderUserReqBody,
                  ...{
                    reply_to_message: repliedMessagesData?.message_text,
                    reply_to_user: repliedMessagesData?.sender_name,
                    reply_type: repliedMessagesData?.user_type,
                  },
                },
          },
        },
        res => {
          console.log('SEND CHAT SUUUUU 214', res)
          props?.setShowReplyPopup(false)
        },

        err => {
          console.log(err, 'error in sending messages')
        }
      )
    } else {
      global.sdk.SendChatMsgToConsumer(
        {
          streamID: eventID,
          groupID: groupID,

          data: {
            function: 'chat',
            //req body for user type admin
            requestMsg: !props?.showReplyPopup
              ? senderAdminReqBody
              : {
                  ...senderAdminReqBody,
                  ...{
                    reply_to_message: repliedMessagesData?.message_text,
                    reply_to_user: repliedMessagesData?.sender_name,
                    reply_type: repliedMessagesData?.user_type,
                  },
                },
          },
        },
        res => {
          console.log('SEND CHAT SUUUUU 214', res)
          props?.setShowReplyPopup(false)
        },

        err => {
          console.log(err, 'error in sending messages')
        }
      )
    }
  }

  const sendChatOnKeyPress = e => {
    //it triggers by pressing the enter key
    var key = e.which || e.keyCode

    if (window.innerWidth > 1024)
      if (e.keyCode === 13 && !e.shiftKey) {
        //for tablets and laptops
        sendChat()
        setShowEmojiPicker(false)

        e.preventDefault()
      } else if (e.keyCode === 13 && !e.shiftKey && e.key !== 'Enter') {
        //for mobiles
        sendChat()
        setShowEmojiPicker(false)

        e.preventDefault()
      }
  }

  const updateInputValue = (inputMessage, emoji) => {
    return inputMessage + emoji
  }

  const setCaretPosition = (ctrl, pos) => {
    if (ctrl.setSelectionRange) {
      ctrl.setSelectionRange(pos, pos)
    }
    ctrl.style.caretColor = 'auto'
    ctrl.blur()
    ctrl.focus()
  }

  const DisplayNameBoxContent = () => (
    <Paper className='RCPaper-Display-Name'>
      <div>
        <div>
          <Typography className='RCDisplay-Name-Title' variant='h7'>
            {editDisplayNameBox ? t('preview.change_display') : t('login.display_name_message')}
          </Typography>

          <CloseIcon
            className='RCDisplay-Name-Close_Icon'
            xid='4U'
            onClick={() => {
              setDisplayNameBox(false)
              setEditDisplayNameBox(false)
            }}
          />
        </div>

        <div className='change-display-name-container'>
          <TextField
            id='outlined-basic'
            placeholder={t('login.Enter_display')}
            variant='outlined'
            onChange={e => {
              let validResponse = handleDisplayName(e?.target?.value, displayName, t)
              setDisplayName(validResponse.name)
              setShowHelperText(validResponse.helperText)
            }}
            size='small'
            value={displayName}
            helperText={showHelperText ? <span style={{ color: 'red' }}>{showHelperText}</span> : ''}
            InputProps={{
              autoFocus: true,
            }}
          />
          <Button
            className='save-display-name'
            style={{
              cursor: displayName !== userData?.displayName && displayName?.length !== 0 ? 'pointer' : 'default',
            }}
            disabled={displayName !== userData?.displayName && displayName?.length !== 0 ? false : true}
            xid='4V'
            onClick={() => {
              !updatingDisplayName && sentAnonJoinedMessage()
            }}
          >
            {updatingDisplayName ? (
              <CircularProgress color='inherit' className='changeDisplayNameBtn' />
            ) : (
              <Typography>{t('admintab.save')}</Typography>
            )}
          </Button>
        </div>
      </div>
    </Paper>
  )

  const ChangeChatTitle = () => (
    <div
      className='confirm-display-name-div'
      style={{
        border: '1px solid #1F498A',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1F498A',
          padding: '12px 16px 12px 16px',
          color: 'white',
        }}
      >
        <Typography
          variant='body1'
          color='inherit'
          style={{
            color: 'white',
          }}
        >
          {t('login.continue_as')}
        </Typography>
        <CloseIcon
          style={{
            height: '18px',
            width: '18px',
            cursor: 'pointer',
          }}
          xid='7s'
          onClick={e => {
            setShowChangeChatTitleBox(false)
          }}
        />
      </div>

      <FormControl
        style={{
          padding: '12px 16px 12px 16px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          value={selectedChatTitle}
          onChange={e => {
            setSelectedChatTitle(e.target.value)
          }}
        >
          <FormControlLabel
            style={{ width: '220px' }}
            value={userData?.displayName}
            control={<Radio />}
            label={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  <Typography
                    variant='body2'
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      marginRight: '5px',
                      display: 'inline',
                    }}
                  >
                    {showThreeDotsAfterNText(userData?.displayName, 12)}
                  </Typography>

                  <Typography
                    variant='body2'
                    style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                      display: 'inline',
                      color: 'rgba(0, 0, 0, 0.38)',
                    }}
                  >
                    ({t('login.profile_name')})
                  </Typography>
                </span>
              </div>
            }
          />
          <FormControlLabel
            style={{ marginBottom: '30px', width: '220px' }}
            value={sessionStorage.getItem('ORGNAME')}
            control={<Radio />}
            label={
              <span style={{ width: '220px' }}>
                <Typography
                  variant='body2'
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    display: 'inline',
                    marginRight: '5px',
                  }}
                >
                  {sessionStorage.getItem('ORGNAME')}
                </Typography>
                <Typography
                  variant='body2'
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    display: 'inline',
                    color: 'rgba(0, 0, 0, 0.38)',
                  }}
                >
                  ({t('login.brand_name')})
                </Typography>
              </span>
            }
          />
        </RadioGroup>
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '22px',
            display: 'flex',
            cursor: 'pointer',
          }}
        >
          <Typography
            variant='body2'
            style={{
              color: '#1F498A',
              textAlign: 'right',
              fontSize: '15px',
              lineHeight: '20px',
              display: 'inline',
              fontWeight: 'bold',
              marginRight: '5px',
            }}
            xid='7t'
            onClick={e => {
              setEditDisplayNameBox(true)
              setShowChangeChatTitleBox(false)
            }}
          >
            {t('login.edit')}
          </Typography>
          <Tooltip title={<span style={{ width: '80px' }}>{t('login.click_here')}</span>} placement={'top'} arrow>
            <div className='imageDescription-icon'>
              <ChatToolTipDesc color='#1F498A' />
            </div>
          </Tooltip>
        </div>
        <Button
          style={{
            backgroundColor: '#ECF3FD',
            borderRadius: '4px',
            maxWidth: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#1F498A',
            padding: '4px 14px 4px 14px',
            margin: 'auto',
            marginTop: '10px',
          }}
          xid='7u'
          onClick={e => {
            if (selectedChatTitle === sessionStorage.getItem('ORGNAME')) {
              global.sdk.SetHostChatAsBrand({
                eventID: eventID,
                email: localStorage.getItem('user-email'),
                value: true,
              })
            }

            if (selectedChatTitle === userData?.displayName) {
              global.sdk.SetHostChatAsBrand({
                eventID: eventID,
                email: localStorage.getItem('user-email'),
                value: false,
              })
            }

            setShowChangeChatTitleBox(false)
          }}
        >
          {t('login.confirm')}
        </Button>
      </FormControl>
    </div>
  )

  const EmojiPicker = () => (
    <Picker
      style={{ bottom: '0px' }}
      onSelect={emoji => {
        if (splitter.splitGraphemes(inputMessage + emoji.native).length > 200) {
          setMaxLimitExceeds(true)
        } else {
          setMaxLimitExceeds(false)
          let inputMessagePostUserTypesInEmoji = updateInputValue(inputMessage, emoji.native)
          setInputMessage(inputMessagePostUserTypesInEmoji)
        }
      }}
    />
  )

  return (
    <div className='RCChat-Input-Container RCInput-checkbox'>
      {userData?.displayName ? (
        <>
          {showEmojiPicker && <EmojiPicker />}
          {showChangeChatTitleBox && <ChangeChatTitle />}
          {editDisplayNameBox && <DisplayNameBoxContent />}
          <TextField
            style={{
              width: '100%',
              padding: '6px 0px',
              paddingBottom: maxLimitExceeds ? '0px' : '8px',
              transition: 'all 0.5s',
            }}
            ref={el => (inputRef = el)}
            disabled={checkForBlockEmail(loggedInEmail, currentEvent) >= 0}
            className={`${maxLimitExceeds ? 'error-textfield' : 'not-error'} message-textField`}
            id={textfieldLineHeight < 116 ? 'outlined-textarea' : 'outlined-textarea-scroll'}
            placeholder={
              checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                ? t('preview.admin_blocked')
                : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                  ? `Chat as ${showThreeDotsAfterNText(sessionStorage.getItem('ORGNAME'), 12)}`
                  : `Chat as ${showThreeDotsAfterNText(userData?.displayName, 12)}`
                : `Chat as ${showThreeDotsAfterNText(userData?.displayName, 12)}`
            }
            multiline
            helperText={maxLimitExceeds ? <span style={{ color: 'red' }}>{t('preview.character_limit_exceeded')}</span> : ''}
            value={inputMessage}
            onChange={e => {
              if (splitter.splitGraphemes(e.target.value).length > 200) {
                setMaxLimitExceeds(true)
              } else {
                setMaxLimitExceeds(false)
                setInputMessage(e.target.value)
                countTextfieldLines(e)
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' className='message-textfield-character-limit'>
                  <Typography>
                    <span>{inputMessage?.length}</span>/{TEXT_LIMIT}
                  </Typography>
                </InputAdornment>
              ),
            }}
            onKeyDown={e => {
              if (!maxLimitExceeds && inputMessage?.length > 0) {
                sendChatOnKeyPress(e)
              }
            }}
          />
          <div
            className='button-below-input'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                className={checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'emojiicon-blocked' : 'emojiicon'}
                disabled={checkForBlockEmail(loggedInEmail, currentEvent) >= 0}
                xid='4Y'
                onClick={() => {
                  setEditDisplayNameBox(false)
                  setShowChangeChatTitleBox(false)
                  setShowEmojiPicker(prev => !prev)
                }}
                size='large'
              >
                <TagFacesIcon
                  style={{
                    color: '#404040',
                  }}
                />
              </IconButton>
              {isAllowed(permissions, Permissions.show_changeName_icon.index) && (
                <Tooltip title={<span style={{ width: '70px' }}>{t('login.can_changes')}</span>} placement={'top'} arrow>
                  <IconButton
                    className={checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'emojiicon-blocked' : 'emojiicon'}
                    disabled={checkForBlockEmail(loggedInEmail, currentEvent) >= 0}
                    xid='Am'
                    onClick={() => {
                      setShowEmojiPicker(false)
                      if (userRole === 'consumer' || userRole === 'v2_1to1_customer') {
                        setEditDisplayNameBox(prev => !prev)
                      } else {
                        setShowChangeChatTitleBox(prev => !prev)
                      }
                    }}
                    size='large'
                  >
                    {displayNameBox || editDisplayNameBox || showChangeChatTitleBox ? (
                      <SettingsIcon
                        style={{
                          cursor: 'pointer',
                          color: '#1F498A',
                        }}
                      />
                    ) : (
                      <SettingsOutlinedIcon
                        style={{
                          cursor: 'pointer',
                          color: '#404040',
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              )}
              <div className='sendRequest_icon'>
                {isAllowed(permissions, Permissions.request_to_join_live.index) && !props?.showLoader && (
                  <Tooltip
                    title={
                      props?.invitationStatus === 'requestedByGuest' ? t('preview.cancel_request') : t('preview.send_request')
                    }
                    placement={'top'}
                    arrow
                  >
                    <IconButton
                      xid='7w'
                      // onClick={
                      //   props?.invitationStatus === "requestedByGuest"
                      //     ? () => props?.setRequestJoinLive("cancel_invite")
                      //     : (props?.invitationStatus === "accepted_byHost" ||
                      //         props?.invitationStatus === "accepted") &&
                      //       global.mem.current.event.room &&
                      //       global.mem.current.event.room?.myUserId()
                      //     ? () =>
                      //         props?.setShowSnackbar({
                      //           show: true,
                      //           message: t("preview.cant_send_invite"),
                      //           type: "success",
                      //         })
                      //     : () => props?.setRequestJoinLive("send_invite")
                      // }
                      className={checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'settings-icon-blocked' : 'settings-icon'}
                      disabled={checkForBlockEmail(loggedInEmail, currentEvent) >= 0 || currentEvent?.status === 'streaming_done'}
                      size='large'
                    >
                      <VideoCallOutlinedIcon
                        style={{
                          color: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'gray' : '#404040',
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
                {props?.showLoader && <CircularProgress size={20} className='loader-for-request-to-join-live' />}
              </div>
            </div>
            <Button
              variant='contained'
              color='primary'
              className={checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'sendicon-blocked' : 'sendicon'}
              disabled={checkForBlockEmail(loggedInEmail, currentEvent) >= 0}
              xid='4Z'
              onClick={() => {
                if (!maxLimitExceeds && inputMessage?.length > 0) {
                  sendChat()
                }
              }}
            >
              {t('login.Send')}
            </Button>
          </div>
        </>
      ) : (
        <>
          {displayNameBox && <DisplayNameBoxContent />}

          <Button style={{ minWidth: '60px' }} className='display-name-con-btn2' xid='4W' onClick={() => setDisplayNameBox(true)}>
            {t('login.Enter_display')}
          </Button>
        </>
      )}
    </div>
  )
}

export default ChatInput
