var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, IconButton, TextField, CircularProgress, Tooltip, Paper, Typography, FormControlLabel, FormControl, RadioGroup, Radio, } from '@mui/material';
import GraphemeSplitter from 'grapheme-splitter';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect, createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GetRole, showThreeDotsAfterNText, uuidv4, handleDisplayName, checkForBlockEmail } from '../ChatUtils/chatUtils';
import ChatToolTipDesc from './ChatToolTipDesc';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
var ChatInput = function (props) {
    var _a, _b;
    var inputRef = createRef();
    var _c = useState(false), maxLimitExceeds = _c[0], setMaxLimitExceeds = _c[1];
    var EventPermission = useSelector(function (state) { return state.permission; });
    var splitter = new GraphemeSplitter();
    var _d = useState(0), textfieldLineHeight = _d[0], setTextfieldLineHeight = _d[1];
    var _e = useState(''), inputMessage = _e[0], setInputMessage = _e[1];
    var eventID = props.eventID, groupID = props.groupID, isAllowed = props.isAllowed, Permissions = props.Permissions, Auth = props.Auth;
    var t = useTranslation().t;
    var eventsState = useSelector(function (state) { return state.events; });
    var customisedEvents = eventsState.customisedEvents;
    var currentEvent = customisedEvents[eventID];
    var allReduxHostChatAsBrand = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.hostChatAsBrand; });
    var permissions = (_a = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _a === void 0 ? void 0 : _a.permission;
    var loggedInEmail = localStorage.getItem('user-email');
    var userData = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.userdata) === null || _a === void 0 ? void 0 : _a.userData; });
    var hostChatAsBrand = allReduxHostChatAsBrand && allReduxHostChatAsBrand[eventID] ? allReduxHostChatAsBrand[eventID] : {};
    var _f = useState(false), displayNameBox = _f[0], setDisplayNameBox = _f[1];
    var _g = useState((userData === null || userData === void 0 ? void 0 : userData.displayName) ? userData === null || userData === void 0 ? void 0 : userData.displayName : ''), displayName = _g[0], setDisplayName = _g[1];
    var _h = useState(''), showHelperText = _h[0], setShowHelperText = _h[1];
    var _j = useState(false), updatingDisplayName = _j[0], setUpdatingDisplayName = _j[1];
    var _k = useState(''), userEmail = _k[0], setUserEmail = _k[1];
    var _l = useState(false), editDisplayNameBox = _l[0], setEditDisplayNameBox = _l[1];
    var _m = useState(hostChatAsBrand && hostChatAsBrand[loggedInEmail] ? sessionStorage.getItem('ORGNAME') : userData === null || userData === void 0 ? void 0 : userData.displayName), selectedChatTitle = _m[0], setSelectedChatTitle = _m[1];
    var _o = useState(false), showChangeChatTitleBox = _o[0], setShowChangeChatTitleBox = _o[1];
    var _p = useState(false), showReplyBox = _p[0], setShowReplyBox = _p[1];
    var userRole = (_b = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _b === void 0 ? void 0 : _b.event_role;
    var _q = useState(false), showEmojiPicker = _q[0], setShowEmojiPicker = _q[1];
    var isHostAndPrimaryHost = function (email) {
        var _a, _b;
        return (GetRole((_a = customisedEvents[eventID]) === null || _a === void 0 ? void 0 : _a.permissions, email) === 'v2_host' ||
            GetRole((_b = customisedEvents[eventID]) === null || _b === void 0 ? void 0 : _b.permissions, email) === 'v2_primary_host');
    };
    var countTextfieldLines = function (e) {
        var lineHeight = e.target.clientHeight;
        setTextfieldLineHeight(lineHeight);
    };
    useEffect(function () {
        Auth.currentAuthenticatedUser()
            .then(function (res) {
            setUserEmail(res.attributes.email);
        })
            .catch(function (e) { return Logger.log('ERROR', "".concat(fileName) + ' Error fetching user :', e); });
    }, [userData === null || userData === void 0 ? void 0 : userData.displayName]);
    var sentAnonJoinedMessage = function () {
        setUpdatingDisplayName(true);
        var requestBody = {
            id: localStorage.getItem('fingerprint'),
            data: {
                email: userEmail,
                displayName: displayName.trim(),
            },
            group_id: 'null',
        };
        global.sdk.UpdateUser(requestBody, function (res) {
            setUpdatingDisplayName(false);
            setDisplayName('');
            setDisplayNameBox(false);
            setEditDisplayNameBox(false);
            if (userData === null || userData === void 0 ? void 0 : userData.displayName) {
            }
            global.sdk.SetHostChatAsBrand({
                eventID: eventID,
                email: localStorage.getItem('user-email'),
                value: false,
            });
            if ((userEmail === null || userEmail === void 0 ? void 0 : userEmail.startsWith('anon_')) && !(userData === null || userData === void 0 ? void 0 : userData.displayName)) {
                var anonMessageText = "".concat(showThreeDotsAfterNText(displayName.trim(), 12), " joined the chat");
                var senderUserReqBody = {
                    message_text: anonMessageText,
                    sender_id: userEmail,
                    user_type: 'consumer',
                    push_time: new Date().getTime(),
                    status: 'added',
                    msg_id: uuidv4(),
                    has_preview: false,
                    group_id: "".concat(groupID, "_").concat(eventID, "_L0"),
                    message_type: 'text',
                };
                global.sdk.SendChatMsgToAdmin({
                    streamID: eventID,
                    groupID: groupID,
                    data: {
                        function: 'chat',
                        requestMsg: __assign(__assign({}, senderUserReqBody), {
                            reply_to_message: '',
                            reply_to_user: '',
                            reply_type: '',
                        }),
                    },
                }, function (response) {
                    setInputMessage('');
                }, function () { });
            }
        }, function (e) {
            setDisplayNameBox(false);
            setEditDisplayNameBox(false);
            setDisplayName('');
            setUpdatingDisplayName(false);
            console.log('error during updating displayname', e);
        });
    };
    var sendChat = function () {
        var _a;
        setShowEmojiPicker(false);
        var message = inputMessage.trim();
        setInputMessage('');
        var senderUserReqBody = {
            message_text: message,
            sender_id: userEmail,
            sender_name: (_a = userData === null || userData === void 0 ? void 0 : userData.displayName) !== null && _a !== void 0 ? _a : deciderSenderId(userEmail),
            user_type: 'consumer',
            push_time: new Date().getTime(),
            status: 'added',
            msg_id: uuidv4(),
            has_preview: false,
            group_id: "".concat(groupID, "_").concat(eventID, "_L0"),
            message_type: 'text',
        };
        var senderAdminReqBody = {
            message_text: message,
            sender_id: userEmail,
            user_type: 'admin',
            push_time: new Date().getTime(),
            msg_id: uuidv4(),
            role: 'creator',
            sender_name: hostChatAsBrand && hostChatAsBrand[loggedInEmail] ? sessionStorage.getItem('ORGNAME') : userData === null || userData === void 0 ? void 0 : userData.displayName,
            status: 'added',
            has_preview: false,
            group_id: "".concat(groupID, "_").concat(eventID, "_L0"),
            message_type: 'text',
        };
        if (!isAllowed(permissions, Permissions.chat_admin_msg_unpin.index)) {
            global.sdk.SendChatMsgToAdmin({
                streamID: eventID,
                groupID: groupID,
                data: {
                    function: 'chat',
                    requestMsg: !showReplyBox
                        ? senderUserReqBody
                        : __assign(__assign({}, senderUserReqBody), {
                            reply_to_message: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.text,
                            reply_to_user: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.title,
                            reply_type: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.sender_type,
                        }),
                },
            }, function (res) {
                console.log('SEND CHAT SUUUUU 214', res);
                setShowReplyBox(false);
            }, function (err) {
                console.log(err, 'error in sending messages');
            });
        }
        else {
            global.sdk.SendChatMsgToConsumer({
                streamID: eventID,
                groupID: groupID,
                data: {
                    function: 'chat',
                    requestMsg: !showReplyBox
                        ? senderAdminReqBody
                        : __assign(__assign({}, senderAdminReqBody), {
                            reply_to_message: replyMessageData.text,
                            reply_to_user: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.title,
                            reply_type: replyMessageData.sender_type,
                        }),
                },
            }, function (res) {
                console.log('SEND CHAT SUUUUU 214', res);
                setShowReplyBox(false);
            }, function (err) {
                console.log(err, 'error in sending messages');
            });
        }
    };
    var sendChatOnKeyPress = function (e) {
        var key = e.which || e.keyCode;
        if (window.innerWidth > 1024)
            if (e.keyCode === 13 && !e.shiftKey) {
                if (!maxLimitExceeds) {
                    sendChat();
                    setShowEmojiPicker(false);
                }
                e.preventDefault();
            }
            else if (e.keyCode === 13 && !e.shiftKey && e.key !== 'Enter') {
                if (!maxLimitExceeds) {
                    sendChat();
                    setShowEmojiPicker(false);
                }
                e.preventDefault();
            }
    };
    var updateInputValue = function (inputMessage, emoji) {
        return inputMessage + emoji;
    };
    var setCaretPosition = function (ctrl, pos) {
        if (ctrl.setSelectionRange) {
            ctrl.setSelectionRange(pos, pos);
        }
        ctrl.style.caretColor = 'auto';
        ctrl.blur();
        ctrl.focus();
    };
    var DisplayNameBoxContent = function () { return (_jsx(Paper, __assign({ className: 'RCPaper-Display-Name' }, { children: _jsxs("div", { children: [_jsxs("div", { children: [_jsx(Typography, __assign({ className: 'RCDisplay-Name-Title', variant: 'h7' }, { children: editDisplayNameBox ? t('preview.change_display') : t('login.display_name_message') })), _jsx(CloseIcon, { className: 'RCDisplay-Name-Close_Icon', xid: '4U', onClick: function () {
                                setDisplayNameBox(false);
                                setEditDisplayNameBox(false);
                            } })] }), _jsxs("div", __assign({ className: 'change-display-name-container' }, { children: [_jsx(TextField, { id: 'outlined-basic', placeholder: t('login.Enter_display'), variant: 'outlined', onChange: function (e) {
                                var _a;
                                var validResponse = handleDisplayName((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value, displayName, t);
                                setDisplayName(validResponse.name);
                                setShowHelperText(validResponse.helperText);
                            }, size: 'small', value: displayName, helperText: showHelperText ? _jsx("span", __assign({ style: { color: 'red' } }, { children: showHelperText })) : '', InputProps: {
                                autoFocus: true,
                            } }), _jsx(Button, __assign({ className: 'save-display-name', style: {
                                cursor: displayName !== (userData === null || userData === void 0 ? void 0 : userData.displayName) && (displayName === null || displayName === void 0 ? void 0 : displayName.length) !== 0 ? 'pointer' : 'default',
                            }, disabled: displayName !== (userData === null || userData === void 0 ? void 0 : userData.displayName) && (displayName === null || displayName === void 0 ? void 0 : displayName.length) !== 0 ? false : true, xid: '4V', onClick: function () {
                                !updatingDisplayName && sentAnonJoinedMessage();
                            } }, { children: updatingDisplayName ? (_jsx(CircularProgress, { color: 'inherit', className: 'changeDisplayNameBtn' })) : (_jsx(Typography, { children: t('admintab.save') })) }))] }))] }) }))); };
    var ChangeChatTitle = function () { return (_jsxs("div", __assign({ className: 'confirm-display-name-div', style: {
            border: '1px solid #1F498A',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
            borderRadius: '4px',
        } }, { children: [_jsxs("div", __assign({ style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#1F498A',
                    padding: '12px 16px 12px 16px',
                    color: 'white',
                } }, { children: [_jsx(Typography, __assign({ variant: 'body1', color: 'inherit', style: {
                            color: 'white',
                        } }, { children: t('login.continue_as') })), _jsx(CloseIcon, { style: {
                            height: '18px',
                            width: '18px',
                            cursor: 'pointer',
                        }, xid: '7s', onClick: function (e) {
                            setShowChangeChatTitleBox(false);
                        } })] })), _jsxs(FormControl, __assign({ style: {
                    padding: '12px 16px 12px 16px',
                    width: '100%',
                    boxSizing: 'border-box',
                } }, { children: [_jsxs(RadioGroup, __assign({ "aria-labelledby": 'demo-controlled-radio-buttons-group', name: 'controlled-radio-buttons-group', value: selectedChatTitle, onChange: function (e) {
                            setSelectedChatTitle(e.target.value);
                        } }, { children: [_jsx(FormControlLabel, { style: { width: '220px' }, value: userData === null || userData === void 0 ? void 0 : userData.displayName, control: _jsx(Radio, {}), label: _jsx("div", __assign({ style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    } }, { children: _jsxs("span", { children: [_jsx(Typography, __assign({ variant: 'body2', style: {
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                    marginRight: '5px',
                                                    display: 'inline',
                                                } }, { children: showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName, 12) })), _jsxs(Typography, __assign({ variant: 'body2', style: {
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                    display: 'inline',
                                                    color: 'rgba(0, 0, 0, 0.38)',
                                                } }, { children: ["(", t('login.profile_name'), ")"] }))] }) })) }), _jsx(FormControlLabel, { style: { marginBottom: '30px', width: '220px' }, value: sessionStorage.getItem('ORGNAME'), control: _jsx(Radio, {}), label: _jsxs("span", __assign({ style: { width: '220px' } }, { children: [_jsx(Typography, __assign({ variant: 'body2', style: {
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                display: 'inline',
                                                marginRight: '5px',
                                            } }, { children: sessionStorage.getItem('ORGNAME') })), _jsxs(Typography, __assign({ variant: 'body2', style: {
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                display: 'inline',
                                                color: 'rgba(0, 0, 0, 0.38)',
                                            } }, { children: ["(", t('login.brand_name'), ")"] }))] })) })] })), _jsxs("div", __assign({ style: {
                            position: 'absolute',
                            right: '20px',
                            top: '22px',
                            display: 'flex',
                            cursor: 'pointer',
                        } }, { children: [_jsx(Typography, __assign({ variant: 'body2', style: {
                                    color: '#1F498A',
                                    textAlign: 'right',
                                    fontSize: '15px',
                                    lineHeight: '20px',
                                    display: 'inline',
                                    fontWeight: 'bold',
                                    marginRight: '5px',
                                }, xid: '7t', onClick: function (e) {
                                    setEditDisplayNameBox(true);
                                    setShowChangeChatTitleBox(false);
                                } }, { children: t('login.edit') })), _jsx(Tooltip, __assign({ title: _jsx("span", __assign({ style: { width: '80px' } }, { children: t('login.click_here') })), placement: 'top', arrow: true }, { children: _jsx("div", __assign({ className: 'imageDescription-icon' }, { children: _jsx(ChatToolTipDesc, { color: '#1F498A' }) })) }))] })), _jsx(Button, __assign({ style: {
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
                        }, xid: '7u', onClick: function (e) {
                            if (selectedChatTitle === sessionStorage.getItem('ORGNAME')) {
                                global.sdk.SetHostChatAsBrand({
                                    eventID: eventID,
                                    email: localStorage.getItem('user-email'),
                                    value: true,
                                });
                            }
                            if (selectedChatTitle === (userData === null || userData === void 0 ? void 0 : userData.displayName)) {
                                global.sdk.SetHostChatAsBrand({
                                    eventID: eventID,
                                    email: localStorage.getItem('user-email'),
                                    value: false,
                                });
                            }
                            setShowChangeChatTitleBox(false);
                        } }, { children: t('login.confirm') }))] }))] }))); };
    var EmojiPicker = function () { return (_jsx(Picker, { style: { bottom: '0px' }, onSelect: function (emoji) {
            if (splitter.splitGraphemes(inputMessage + emoji.native).length > 200) {
                setMaxLimitExceeds(true);
            }
            else {
                setMaxLimitExceeds(false);
                var inputMessagePostUserTypesInEmoji = updateInputValue(inputMessage, emoji.native);
                setInputMessage(inputMessagePostUserTypesInEmoji);
            }
        } })); };
    return (_jsx("div", __assign({ className: 'RCChat-Input-Container RCInput-checkbox' }, { children: (userData === null || userData === void 0 ? void 0 : userData.displayName) ? (_jsxs(_Fragment, { children: [showEmojiPicker && _jsx(EmojiPicker, {}), showChangeChatTitleBox && _jsx(ChangeChatTitle, {}), editDisplayNameBox && _jsx(DisplayNameBoxContent, {}), _jsx(TextField, { style: {
                        width: '100%',
                        padding: '6px 0px',
                        paddingBottom: maxLimitExceeds ? '0px' : '8px',
                        transition: 'all 0.5s',
                    }, ref: function (el) { return (inputRef = el); }, disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, className: "".concat(maxLimitExceeds ? 'error-textfield' : 'not-error', " message-textField"), id: textfieldLineHeight < 116 ? 'outlined-textarea' : 'outlined-textarea-scroll', placeholder: checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                        ? t('preview.admin_blocked')
                        : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                            ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                                ? "Chat as ".concat(showThreeDotsAfterNText(sessionStorage.getItem('ORGNAME'), 12))
                                : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName, 12))
                            : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName, 12)), multiline: true, helperText: maxLimitExceeds ? _jsx("span", __assign({ style: { color: 'red' } }, { children: t('preview.character_limit_exceeded') })) : '', value: inputMessage, onChange: function (e) {
                        if (splitter.splitGraphemes(e.target.value).length > 200) {
                            setMaxLimitExceeds(true);
                        }
                        else {
                            setMaxLimitExceeds(false);
                            setInputMessage(e.target.value);
                            countTextfieldLines(e);
                        }
                    }, onKeyDown: sendChatOnKeyPress }), _jsxs("div", __assign({ className: 'button-below-input', style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    } }, { children: [_jsxs("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(IconButton, __assign({ className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'emojiicon-blocked' : 'emojiicon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, xid: '4Y', onClick: function () {
                                        setEditDisplayNameBox(false);
                                        setShowChangeChatTitleBox(false);
                                        setShowEmojiPicker(function (prev) { return !prev; });
                                    }, size: 'large' }, { children: _jsx(TagFacesIcon, { style: {
                                            color: '#404040',
                                        } }) })), isAllowed(permissions, Permissions.show_changeName_icon.index) && (_jsx(Tooltip, __assign({ title: _jsx("span", __assign({ style: { width: '70px' } }, { children: t('login.can_changes') })), placement: 'top', arrow: true }, { children: _jsx(IconButton, __assign({ className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'emojiicon-blocked' : 'emojiicon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, xid: 'Am', onClick: function () {
                                            setShowEmojiPicker(false);
                                            if (userRole === 'consumer' || userRole === 'v2_1to1_customer') {
                                                setEditDisplayNameBox(function (prev) { return !prev; });
                                            }
                                            else {
                                                setShowChangeChatTitleBox(function (prev) { return !prev; });
                                            }
                                        }, size: 'large' }, { children: displayNameBox || editDisplayNameBox || showChangeChatTitleBox ? (_jsx(SettingsIcon, { style: {
                                                cursor: 'pointer',
                                                color: '#1F498A',
                                            } })) : (_jsx(SettingsOutlinedIcon, { style: {
                                                cursor: 'pointer',
                                                color: '#404040',
                                            } })) })) }))), _jsxs("div", __assign({ className: 'sendRequest_icon' }, { children: [isAllowed(permissions, Permissions.request_to_join_live.index) && !(props === null || props === void 0 ? void 0 : props.showLoader) && (_jsx(Tooltip, __assign({ title: (props === null || props === void 0 ? void 0 : props.invitationStatus) === 'requestedByGuest' ? t('preview.cancel_request') : t('preview.send_request'), placement: 'top', arrow: true }, { children: _jsx(IconButton, __assign({ xid: '7w', className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'settings-icon-blocked' : 'settings-icon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 || (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.status) === 'streaming_done', size: 'large' }, { children: _jsx(VideoCallOutlinedIcon, { style: {
                                                        color: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'gray' : '#404040',
                                                    } }) })) }))), (props === null || props === void 0 ? void 0 : props.showLoader) && _jsx(CircularProgress, { size: 20, className: 'loader-for-request-to-join-live' })] }))] })), _jsx(Button, __assign({ variant: 'contained', color: 'primary', className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'sendicon-blocked' : 'sendicon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, xid: '4Z', onClick: function () {
                                if (!maxLimitExceeds) {
                                    sendChat();
                                }
                            } }, { children: t('login.Send') }))] }))] })) : (_jsxs(_Fragment, { children: [displayNameBox && _jsx(DisplayNameBoxContent, {}), _jsx(Button, __assign({ style: { minWidth: '60px' }, className: 'display-name-con-btn2', xid: '4W', onClick: function () { return setDisplayNameBox(true); } }, { children: t('login.Enter_display') }))] })) })));
};
export default ChatInput;
