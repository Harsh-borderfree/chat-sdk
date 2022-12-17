import { Button, IconButton, TextField, CircularProgress, Tooltip, Card, Paper, Typography } from '@mui/material'
import GraphemeSplitter from 'grapheme-splitter'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { GetRole, showThreeDotsInDisplayName } from '../ChatUtils/chatUtils'
import { checkForBlockEmail } from '../ChatUtils/chatUtils'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const ChatInput = props => {
  const [maxLimitExceeds, setMaxLimitExceeds] = useState(false)
  const EventPermission = useSelector(state => state.permission)
  const splitter = new GraphemeSplitter()
  const [textfieldLineHeight, setTextfieldLineHeight] = useState(0)
  const [inputMessage, setInputMessage] = useState('')
  const { eventID, groupID, isAllowed, Permissions } = props
  const { t, i18n } = useTranslation()
  const eventsState = useSelector(state => state.events)
  const { streamEvents, customisedEvents } = eventsState
  const currentEvent = customisedEvents[eventID]
  const allReduxHostChatAsBrand = useSelector(state => state?.chat?.hostChatAsBrand)
  const permissions = EventPermission?.event_permission[eventID]?.permission
  const loggedInEmail = localStorage.getItem('user-email')
  const userData = useSelector(state => state?.userdata?.userData)
  const hostChatAsBrand = allReduxHostChatAsBrand && allReduxHostChatAsBrand[eventID] ? allReduxHostChatAsBrand[eventID] : {}
  const countTextfieldLines = e => {
    let lineHeight = e.target.clientHeight
    setTextfieldLineHeight(lineHeight)
  }
  const [displayNameBox, setDisplayNameBox] = useState(false)
  const [displayName, setDisplayName] = useState('')

  // Utils function
  const isHostAndPrimaryHost = email => {
    return (
      GetRole(customisedEvents[eventID]?.permissions, email) === 'v2_host' ||
      GetRole(customisedEvents[eventID]?.permissions, email) === 'v2_primary_host'
    )
  }
  // ANON JOINED THE CHAT MESSAGE
  // const sentAnonJoinedMessage = () => {
  //   //  setUpdatingUser(true);
  //   let requestBody = {
  //     id: localStorage.getItem("fingerprint"),

  //     data: {
  //       email: localStorage.getItem("user-email"),
  //       displayName: displayNameInput.trim(),
  //     },
  //     group_id: "null",
  //   };
  //   global.sdk.UpdateUser(
  //     requestBody,
  //     (res) => {
  //       if (userData?.displayName) {
  //         //  props?.setShowSnackbar({
  //         //    show: true,
  //         //    message: t("preview.update_name"),
  //         //    type: "success",
  //         //  });
  //       }

  //       global.sdk.SetHostChatAsBrand({
  //         eventID: event_id,
  //         email: localStorage.getItem("user-email"),
  //         value: false,
  //       });

  //       //anon joined the chat messages after updating user json
  //       if (userEmail?.startsWith("anon_") && !userData?.displayName) {
  //         let anonMessageText = `${showThreeDotsInDisplayName(
  //           displayNameInput.trim()
  //         )} joined the chat`;

  //         let senderUserReqBody = {
  //           message_text: anonMessageText,
  //           sender_id: userEmail,
  //           user_type: "consumer",
  //           push_time: new Date().getTime(),
  //           status: "added",
  //           msg_id: uuidv4(),
  //           has_preview: false,
  //           group_id: `${groupID}_${eventID}_L0`,
  //           message_type: "text",
  //         };
  //         global.sdk.SendChatMsgToAdmin(
  //           {
  //             streamID: eventID,
  //             groupID: groupID,
  //             data: {
  //               function: "chat",
  //               requestMsg: {
  //                 ...senderUserReqBody,
  //                 ...{
  //                   reply_to_message: "",
  //                   reply_to_user: "",
  //                   reply_type: "",
  //                 },
  //               },
  //             },
  //           },
  //           (response) => {
  //             setInputMessage("");
  //             setShowReplyBox(false);
  //           },
  //           () => {}
  //         );
  //       }
  //     },
  //     (e) => {
  //       console.log("error during updating displayname", e);
  //     }
  //   );
  // };

  return (
    <div className='RCChat-Input-Container'>
      {userData?.displayName ? (
        <>
          <TextField
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: '6px 0px',
              paddingBottom: maxLimitExceeds ? '0px' : '8px',
              transition: 'all 0.5s',
            }}
            className={`${maxLimitExceeds ? 'error-textfield' : 'not-error'} message-textField`}
            id={textfieldLineHeight < 116 ? 'outlined-textarea' : 'outlined-textarea-scroll'}
            placeholder={
              checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                ? t('preview.admin_blocked')
                : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                  ? `Chat as ${showThreeDotsInDisplayName(sessionStorage.getItem('ORGNAME'))}`
                  : `Chat as ${showThreeDotsInDisplayName(userData?.displayName)}`
                : `Chat as ${showThreeDotsInDisplayName(userData?.displayName)}`
            }
            multiline
            onChange={e => {
              if (splitter.splitGraphemes(e.target.value).length > 200) {
                setMaxLimitExceeds(true)
              } else {
                setMaxLimitExceeds(false)
              }
              setInputMessage(e.target.value)
              countTextfieldLines(e)
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
                // onClick={() => setDisplayEmojiPicker(!displayEmojiPicker)}
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
                    // onClick={(e) => {
                    //   if (userRole === "consumer") {
                    //     setEditDisplayNameBox(true);
                    //   } else {
                    //     setDisplayNameBox((prevState) => !prevState);
                    //     setEditDisplayNameBox(false);
                    //   }
                    // }}
                    size='large'
                  >
                    {/* {displayNameBox || editDisplayNameBox ? (
                  <SettingsIcon
                    style={{
                      cursor: "pointer",
                      color: "#1F498A",
                    }}
                  />
                ) : ( */}
                    <SettingsOutlinedIcon
                      style={{
                        cursor: 'pointer',
                        color: '#404040',
                      }}
                    />
                    {/* )} */}
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
              // onClick={!helperText ? sendChat : undefined}
            >
              {t('login.Send')}
            </Button>
          </div>
        </>
      ) : (
        <>
          {displayNameBox && (
            <Paper className='RCPaper-Display-Name'>
              <div>
                <div>
                  <Typography className='RCDisplay-Name-Title' variant='h7'>
                    {t('login.display_name_message')}
                  </Typography>

                  <CloseIcon
                    className='RCDisplay-Name-Close_Icon'
                    xid='4U'
                    onClick={() => {
                      setDisplayNameBox(false)
                    }}
                  />
                </div>

                <div className='change-display-name-container'>
                  <TextField
                    id='outlined-basic'
                    placeholder={t('login.Enter_display')}
                    variant='outlined'
                    // onChange={(e) => {
                    //   let validResponse = Validate.handleDisplayName(
                    //     e?.target?.value,
                    //     displayNameInput,
                    //     t
                    //   );
                    //   setDisplayNameInput(validResponse.name);
                    //   setShowHelperText(validResponse.helperText);
                    // }}
                    size='small'
                    // value={displayNameInput}
                    // helperText={
                    //   showHelperText ? (
                    //     <span style={{ color: "red" }}>{showHelperText}</span>
                    //   ) : (
                    //     ""
                    //   )
                    // }
                    InputProps={{
                      autoFocus: true,
                    }}
                  />
                  <Button
                    className='save-display-name'
                    // style={{
                    //   cursor:
                    //     displayNameInput !== userData?.displayName &&
                    //     displayNameInput?.length !== 0
                    //       ? "pointer"
                    //       : "default",
                    // }}
                    // disabled={
                    //   displayNameInput !== userData?.displayName &&
                    //   displayNameInput?.length !== 0
                    //     ? false
                    //     : true
                    // }
                    xid='4V'
                    // onClick={() => {
                    //   !updatingUser && sentAnonJoinedMessage();
                    // }}
                  >
                    {false ? (
                      <CircularProgress color='inherit' className='changeDisplayNameBtn' />
                    ) : (
                      <Typography>{t('admintab.save')}</Typography>
                    )}
                  </Button>
                </div>
              </div>
            </Paper>
          )}

          <Button style={{ minWidth: '60px' }} className='display-name-con-btn2' xid='4W' onClick={() => setDisplayNameBox(true)}>
            {t('login.Enter_display')}
          </Button>
        </>
      )}
    </div>
  )
}

export default ChatInput
