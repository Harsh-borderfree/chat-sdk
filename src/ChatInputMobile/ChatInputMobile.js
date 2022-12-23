import CloseIcon from '@mui/icons-material/Close'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Badge, Button, IconButton, InputAdornment, Radio, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import makeStyles from '@mui/styles/makeStyles'
import GraphemeSplitter from 'grapheme-splitter'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { GetRole, showThreeDotsAfterNText, uuidv4, handleDisplayName, checkForBlockEmail } from '../ChatUtils/chatUtils'

import SendIconMobile from './SendIconMobile'
import './ChatInputMobile.css'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
const useStyles = makeStyles(theme => ({
  customBadge: {
    color: 'red',
    backgroundColor: 'red',
  },
}))

const ChatInputMobile = props => {
  const {
    eventID,
    groupID,
    isAllowed,
    Permissions,
    Auth,
    setCurrentComponent,
    editDisplayNameMobile,
    setEditDisplayNameMobile,
    selectDisplayName,
    setSelectDisplayName,
    event_layout,
    setShowReplyPopup,
  } = props
  const classes = useStyles()
  const splitter = new GraphemeSplitter()
  const { t, i18n } = useTranslation()

  const eventsState = useSelector(state => state.events)
  const { customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const userData = useSelector(state => state?.userdata?.userData)

  const [maxLimitExceeds, setMaxLimitExceeds] = useState(false)

  let loggedInEmail = localStorage.getItem('user-email')
  let loggedInName = loggedInEmail?.includes('anon_') ? userData?.displayName : loggedInEmail
  const [textfieldLineHeight, setTextfieldLineHeight] = useState(0)
  const [focusTextfield, setFocusTextfield] = useState(false)

  const countTextfieldLines = e => {
    let lineHeight = e.target.clientHeight
    setTextfieldLineHeight(lineHeight)
  }
  const cartSize = currentEvent?.cart?.length
  const language = useSelector(state => state.language)
  const EventPermission = useSelector(state => state.permission)
  const [helperText, setHelperText] = useState(false)
  const user_role = EventPermission?.event_permission[eventID]?.event_role
  const shareLikeButtons = document.getElementsByClassName('fixed_share_button')
  if (shareLikeButtons?.length > 0 && shareLikeButtons[0]) {
    focusTextfield
      ? shareLikeButtons[0].classList.add('activeMessageBox')
      : shareLikeButtons[0].classList.remove('activeMessageBox')
  }
  const allReduxHostChatAsBrand = useSelector(state => state?.chat?.hostChatAsBrand)
  const hostChatAsBrand = allReduxHostChatAsBrand && allReduxHostChatAsBrand[eventID] ? allReduxHostChatAsBrand[eventID] : {}
  const [selectedName, setSeletedName] = useState(
    hostChatAsBrand && hostChatAsBrand[loggedInEmail] ? sessionStorage.getItem('ORGNAME') : userData?.displayName
  )
  const permissions = EventPermission?.event_permission[eventID]?.permission

  const [displayNameInput, setDisplayNameInput] = useState(userData?.displayName ? userData?.displayName : '')
  const [updatingDisplayName, setUpdatingDisplayName] = useState(false)
  const [showDisplayNameInput, setShowDisplayNameInput] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const userRole = EventPermission?.event_permission[eventID]?.event_role

  //   useEffect(() => {
  //     props?.setDisplayNameInput(userData?.displayName ? userData?.displayName : '')
  //   }, [props?.editDisplayNameMobile])

  const isHostAndPrimaryHost = email => {
    return (
      GetRole(customisedEvents[eventID]?.permissions, email) === 'v2_host' ||
      GetRole(customisedEvents[eventID]?.permissions, email) === 'v2_primary_host'
    )
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
        displayName: displayNameInput.trim(),
      },
      group_id: 'null',
    }
    global.sdk.UpdateUser(
      requestBody,
      res => {
        setUpdatingDisplayName(false)
        setDisplayNameInput('')
        setEditDisplayNameMobile(false)

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
          let anonMessageText = `${showThreeDotsAfterNText(displayNameInput.trim(), 12)} joined the chat`

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
        setEditDisplayNameMobile(false)
        setDisplayNameInput('')
        setUpdatingDisplayName(false)
        console.log('error during updating displayname', e)
      }
    )
  }

  // Send Chat Function
  const sendChat = () => {
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
                    reply_to_message: replyMessageData?.text,
                    reply_to_user: replyMessageData?.title,
                    reply_type: replyMessageData?.sender_type,
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
                    reply_to_message: replyMessageData.text,
                    reply_to_user: replyMessageData?.title,
                    reply_type: replyMessageData.sender_type,
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

  const showProductHighlightAndPin = () => {
    const productHighlight = document.getElementsByClassName('highlighter_panel_mobile')
    if (productHighlight?.length > 0 && productHighlight[0]) {
      productHighlight[0].style.display = 'flex'
    }
    const pinnedMes = document.getElementsById('pinned-messages')
    if (pinnedMes) {
      pinnedMes.style.display = 'flex'
    }
  }

  const hideProductHighlightAndPin = () => {
    const productHighlight = document.getElementsByClassName('highlighter_panel_mobile')
    if (productHighlight?.length > 0 && productHighlight[0]) {
      productHighlight[0].style.display = 'flex'
    }
    const pinnedMes = document.getElementsById('pinned-messages')
    if (pinnedMes) {
      pinnedMes.style.display = 'flex'
    }
  }

  const ChangeDisplayNameInput = () => (
    <div className='anon-joined'>
      <TextField
        className='displayNmaeTextField'
        style={{
          paddingBottom: helperText ? '0px' : '8px',
          transition: 'all 0.5s',
        }}
        id='outlined-adornment-anonName'
        value={displayNameInput}
        onClick={e => {
          e.stopPropagation()
        }}
        onChange={e => {
          let validResponse = handleDisplayName(e?.target?.value, displayNameInput, t)
          setDisplayNameInput(validResponse.name)
          setHelperText(validResponse.helperText)
        }}
        placeholder={t('login.Enter_display')}
        InputProps={{
          autoFocus: true,
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                className='anon-name-save-btn'
                style={{
                  cursor: displayNameInput?.length === 0 || displayNameInput === userData?.displayName ? 'default' : 'pointer',
                  color: displayNameInput?.length === 0 || displayNameInput === userData?.displayName ? '#000000' : 'white',
                }}
                disabled={displayNameInput?.length === 0 || displayNameInput === userData?.displayName ? true : false}
                xid='4V'
                onClick={e => {
                  e.stopPropagation()
                  !updatingDisplayName && sentAnonJoinedMessage()
                }}
              >
                {updatingDisplayName ? (
                  <Button className={`circularProgress-div ${event_layout}`}>
                    <CircularProgress className={`circularProgress ${event_layout}`} color='inherit'></CircularProgress>
                  </Button>
                ) : (
                  t('admintab.save')
                )}
              </Button>
            </InputAdornment>
          ),
        }}
      />
      {helperText && <p className='RCBottomNavbar-ErrorMessage'>{helperText}</p>}
    </div>
  )
  return (
    <>
      {userData?.displayName ? (
        <>
          {/* For admin changing the display Name */}
          {selectDisplayName && (
            <div
              className='confirm-display-name-div'
              style={{
                border: '1px solid #1F498A',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: '4px',
                position: 'relative',
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
                    setSelectDisplayName(false)
                  }}
                />
              </div>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  paddingBottom: '10px',
                  paddingTop: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Radio
                    checked={selectedName === userData?.displayName}
                    value={userData?.displayName}
                    onChange={e => {
                      setSeletedName(e.target.value)
                    }}
                    name='radio-buttons'
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant='body2'
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        marginRight: '5px',
                        display: 'inline',
                      }}
                    >
                      {showThreeDotsAfterNText(userData?.displayName)}
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
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Radio
                    checked={selectedName === sessionStorage.getItem('ORGNAME')}
                    value={sessionStorage.getItem('ORGNAME')}
                    onChange={e => {
                      setSeletedName(e.target.value)
                    }}
                    name='radio-buttons'
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
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
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '66px',
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
                      setEditDisplayNameMobile(true)
                      setSelectDisplayName(false)
                    }}
                  >
                    {t('login.edit')}
                  </Typography>
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
                    if (selectedName === sessionStorage.getItem('ORGNAME')) {
                      global.sdk.SetHostChatAsBrand({
                        eventID: event_id,
                        email: localStorage.getItem('user-email'),
                        value: true,
                      })
                    }

                    if (selectedName === userData?.displayName) {
                      global.sdk.SetHostChatAsBrand({
                        eventID: event_id,
                        email: localStorage.getItem('user-email'),
                        value: false,
                      })
                    }

                    setSelectDisplayName(false)
                  }}
                >
                  {t('login.confirm')}
                </Button>
              </div>
            </div>
          )}
          {editDisplayNameMobile ? (
            <ChangeDisplayNameInput />
          ) : focusTextfield ? (
            <>
              <TextField
                style={{
                  backgroundColor: 'white',
                  padding: '6px 4px',
                  paddingBottom: maxLimitExceeds ? '0px' : '8px',
                  transition: 'all 0.5s',
                }}
                className={`${maxLimitExceeds ? 'error-textfield' : 'not-error'} message-textField`}
                id={textfieldLineHeight < 116 ? 'outlined-textarea' : 'outlined-textarea-scroll'}
                multiline
                onClick={e => {
                  e.stopPropagation()
                }}
                onChange={e => {
                  if (splitter?.splitGraphemes(e?.target?.value)?.length > 200) {
                    setMaxLimitExceeds(true)
                  } else {
                    setMaxLimitExceeds(false)
                    setInputMessage(e?.target?.value)
                    countTextfieldLines(e)
                  }
                }}
                placeholder={
                  checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                    ? t('preview.admin_blocked')
                    : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                    ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                      ? `Chat as ${showThreeDotsAfterNText(sessionStorage.getItem('ORGNAME'))}`
                      : `Chat as ${showThreeDotsAfterNText(userData?.displayName)}`
                    : `Chat as ${showThreeDotsAfterNText(userData?.displayName)}`
                }
                disabled={checkForBlockEmail(loggedInEmail, currentEvent) >= 0}
                error={maxLimitExceeds}
                value={inputMessage}
                onBlur={() => {
                  if (event_layout === 'portrait') {
                    // TODO
                    // props?.setShowChat(true)
                    // props?.makeChatVisible()
                  }

                  if (event_layout === 'landscape') {
                    showProductHighlightAndPin()
                  }

                  setFocusTextfield(false)
                }}
                InputProps={{
                  autoFocus: true,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        xid='4Z'
                        onClick={e => {
                          e.stopPropagation()
                          if (!maxLimitExceeds && inputMessage.length > 0) {
                            sendChat()
                            setFocusTextfield(false)

                            if (event_layout === 'portrait') {
                              // TODO
                              //   props?.setShowChat(true)
                              //   props?.makeChatVisible()
                            }

                            if (event_layout === 'landscape') {
                              showProductHighlightAndPin()
                            }
                          }
                        }}
                        onMouseDown={() => {
                          if (!maxLimitExceeds && inputMessage.length > 0) {
                            sendChat()
                            setFocusTextfield(false)
                            if (event_layout === 'portrait') {
                              // TODO
                              //   props?.setShowChat(true)
                              //   props?.makeChatVisible()
                            }

                            if (event_layout === 'landscape') {
                              showProductHighlightAndPin()
                            }
                          }
                        }}
                      >
                        <SendIconMobile
                          color={
                            inputMessage?.length > 0 && !maxLimitExceeds
                              ? event_layout === 'portrait'
                                ? '#ffffff'
                                : '#1F498A'
                              : '#404040'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                // ref={ref}
              />
              {maxLimitExceeds && (
                <p
                  style={{
                    color: 'red',
                    fontSize: '0.75rem',
                    marginTop: '0px',
                    marginLeft: '4px',
                  }}
                >
                  {t('preview.character_limit_exceeded')}
                </p>
              )}
            </>
          ) : (
            <div
              className='RCBottom-Navbar-Container'
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <div className='displayName-icon-container'>
                {isAllowed(permissions, Permissions.tab_chat.index) && currentEvent?.status === 'streaming_done' ? (
                  <div className='RCBottomNavbar-disabled-chat'>
                    <h5>{t('preview.live_chat_disabled')}</h5>
                  </div>
                ) : (
                  <div className='RCBottom-Navbar-Container-button'>
                    <TextField
                      style={{
                        width: '100%',
                        transition: 'all 0.5s',
                      }}
                      id={
                        checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'outlined-textarea-blocked' : 'outlined-textarea'
                      }
                      // multiline
                      onClick={e => {
                        e.stopPropagation()
                      }}
                      onFocus={e => {
                        e.stopPropagation()
                        setTimeout(() => {
                          setFocusTextfield(true)
                        }, 100)
                        if (event_layout === 'portrait') {
                          // TODO
                          //   props?.setShowChat(false)
                          //   props?.makeChatHidden()
                        }

                        if (event_layout === 'landscape') {
                          hideProductHighlightAndPin()
                        }
                      }}
                      placeholder={
                        checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                          ? t('preview.admin_blocked')
                          : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                          ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                            ? `Chat as ${showThreeDotsAfterNText(sessionStorage.getItem('ORGNAME'))}`
                            : `Chat as ${showThreeDotsAfterNText(userData?.displayName)}`
                          : `Chat as ${showThreeDotsAfterNText(userData?.displayName)}`
                      }
                      disabled={checkForBlockEmail(loggedInEmail, currentEvent) >= 0}
                    />
                  </div>
                )}
                <div
                  style={{
                    width:
                      isAllowed(permissions, Permissions.tab_chat.index) && currentEvent?.status !== 'streaming_done'
                        ? '50%'
                        : '100%',
                  }}
                  className='RCBottom-Navbar-Icon-Container'
                >
                  <IconButton
                    xid='7n'
                    onClick={e => {
                      e.stopPropagation()
                      user_role === 'consumer' || user_role === 'v2_1to1_customer'
                        ? setCurrentComponent('RCInviteToJoinLive')
                        : setCurrentComponent('RCDrawerMenu')
                    }}
                    className='icon-single-parent'
                  >
                    <Badge
                      className='dot-badge'
                      classes={{ badge: classes.customBadge }}
                      variant='dot'
                      invisible={user_role === 'consumer' ? !props?.showViewerTab : !eventsState?.newGuestNotify}
                    >
                      <MoreHorizOutlinedIcon />
                    </Badge>
                  </IconButton>

                  {isAllowed(permissions, Permissions.tab_product.index) && (
                    <Button
                      className='shop-btn-mobile'
                      variant='contained'
                      style={{ padding: '4px 10px' }}
                      xid='7o'
                      onClick={e => {
                        e.stopPropagation()
                        setCurrentComponent('RCProductsPanel')
                      }}
                    >
                      <Typography style={{ fontSize: '12px', fontWeight: '500' }}>SHOP</Typography>
                    </Button>
                  )}
                  {isAllowed(permissions, Permissions.tab_cart.index) ? (
                    <IconButton
                      xid='7p'
                      onClick={e => {
                        e.stopPropagation()
                        if (
                          currentEvent?.shoppingflowredirect?.length > 0 &&
                          currentEvent?.shoppingflowredirect.find(
                            obj => obj.onwebsite == 'sameorigin' && isInIframe()
                            // sameorigin means on client website, not on revo //
                          )?.redirectpoint == 'Cart'
                        ) {
                          window.parent.postMessage(
                            {
                              func: 'openCart',
                              cardData: `${props?.cartData}`,
                            },
                            '*'
                          )
                        } else setCurrentComponent('RCCartPanel')
                      }}
                      className='icon-single-parent'
                    >
                      <Badge badgeContent={cartSize} color='error'>
                        <ShoppingCartOutlinedIcon className='icon-single' />
                      </Badge>
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {showDisplayNameInput ? (
            <ChangeDisplayNameInput />
          ) : (
            <div
              className='RCBottom-Navbar-Container'
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <div className='displayName-icon-container'>
                {isAllowed(permissions, Permissions.tab_chat.index) &&
                  (currentEvent?.status !== 'streaming_done' ? (
                    <div className='RCBottom-Navbar-Container-button'>
                      <Button
                        style={{
                          minWidth: '60px',
                          lineHeight: '28px',
                          fontSize: window?.innerWidth < 1025 && language === 'fr' ? '10px' : '13px',
                        }}
                        className='display-name-con-btn2'
                        xid='4W'
                        onClick={e => {
                          e.stopPropagation()
                          setShowDisplayNameInput(true)
                        }}
                      >
                        {t('login.Enter_display')}
                      </Button>
                    </div>
                  ) : (
                    <div className='RCBottomNavbar-disabled-chat'>
                      <h5>{t('preview.live_chat_disabled')}</h5>
                    </div>
                  ))}
                <div
                  style={{
                    width:
                      isAllowed(permissions, Permissions.tab_chat.index) && currentEvent?.status !== 'streaming_done'
                        ? '50%'
                        : '100%',
                  }}
                  className='RCBottom-Navbar-Icon-Container'
                >
                  {(isAllowed(permissions, Permissions.show_language_dropdown_studio.index) ||
                    isAllowed(permissions, Permissions.request_to_join_live.index)) && (
                    <IconButton
                      xid='7n'
                      onClick={e => {
                        e.stopPropagation()
                        user_role === 'consumer' || user_role === 'v2_1to1_customer'
                          ? setCurrentComponent('RCInviteToJoinLive')
                          : setCurrentComponent('RCDrawerMenu')
                      }}
                      className='icon-single-parent'
                    >
                      <Badge
                        className='dot-badge'
                        classes={{ badge: classes.customBadge }}
                        variant='dot'
                        invisible={user_role === 'consumer' ? !props?.showViewerTab : !eventsState?.newGuestNotify}
                      >
                        <MoreHorizOutlinedIcon />
                      </Badge>
                    </IconButton>
                  )}
                  {isAllowed(permissions, Permissions.tab_product.index) && (
                    <Button
                      className='shop-btn-mobile'
                      variant='contained'
                      style={{ padding: '4px 10px' }}
                      xid='7o'
                      onClick={e => {
                        e.stopPropagation()
                        setCurrentComponent('RCProductsPanel')
                      }}
                    >
                      <Typography style={{ fontSize: '12px', fontWeight: '500' }}>SHOP</Typography>
                    </Button>
                  )}
                  {isAllowed(permissions, Permissions.tab_cart.index) ? (
                    <IconButton
                      xid='7p'
                      onClick={e => {
                        e.stopPropagation()
                        if (
                          currentEvent?.shoppingflowredirect?.length > 0 &&
                          currentEvent?.shoppingflowredirect.find(
                            obj => obj.onwebsite == 'sameorigin' && isInIframe()
                            // sameorigin means on client website, not on revo //
                          )?.redirectpoint == 'Cart'
                        ) {
                          window.parent.postMessage(
                            {
                              func: 'openCart',
                              cardData: `${props?.cartData}`,
                            },
                            '*'
                          )
                        } else setCurrentComponent('RCCartPanel')
                      }}
                      className='icon-single-parent'
                    >
                      <Badge badgeContent={cartSize} color='error'>
                        <ShoppingCartOutlinedIcon className='icon-single' />
                      </Badge>
                    </IconButton>
                  ) : (
                    <></>
                    // <SocialShare
                    //   event={currentEvent}
                    //   shareButtonColor={event_layout === 'landscape' ? '#404040' : '#ffffff'}
                    //   className='share-button-mobile'
                    // />
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ChatInputMobile
