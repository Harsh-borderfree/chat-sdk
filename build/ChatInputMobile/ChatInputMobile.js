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
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Button, IconButton, InputAdornment, Radio, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
import GraphemeSplitter from 'grapheme-splitter';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GetRole, showThreeDotsAfterNText, uuidv4, handleDisplayName, checkForBlockEmail } from '../ChatUtils/chatUtils';
import SendIconMobile from './SendIconMobile';
import './ChatInputMobile.css';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
var useStyles = makeStyles(function (theme) { return ({
    customBadge: {
        color: 'red',
        backgroundColor: 'red',
    },
}); });
var ChatInputMobile = function (props) {
    var _a, _b, _c;
    var eventID = props.eventID, groupID = props.groupID, isAllowed = props.isAllowed, Permissions = props.Permissions, Auth = props.Auth, setCurrentComponent = props.setCurrentComponent, editDisplayNameMobile = props.editDisplayNameMobile, setEditDisplayNameMobile = props.setEditDisplayNameMobile, selectDisplayName = props.selectDisplayName, setSelectDisplayName = props.setSelectDisplayName;
    var classes = useStyles();
    var splitter = new GraphemeSplitter();
    var _d = useTranslation(), t = _d.t, i18n = _d.i18n;
    var eventsState = useSelector(function (state) { return state.events; });
    var customisedEvents = eventsState.customisedEvents;
    var currentEvent = customisedEvents[eventID];
    var userData = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.userdata) === null || _a === void 0 ? void 0 : _a.userData; });
    var _e = useState(false), maxLimitExceeds = _e[0], setMaxLimitExceeds = _e[1];
    var loggedInEmail = localStorage.getItem('user-email');
    var loggedInName = (loggedInEmail === null || loggedInEmail === void 0 ? void 0 : loggedInEmail.includes('anon_')) ? userData === null || userData === void 0 ? void 0 : userData.displayName : loggedInEmail;
    var _f = useState(0), textfieldLineHeight = _f[0], setTextfieldLineHeight = _f[1];
    var _g = useState(false), focusTextfield = _g[0], setFocusTextfield = _g[1];
    var countTextfieldLines = function (e) {
        var lineHeight = e.target.clientHeight;
        setTextfieldLineHeight(lineHeight);
    };
    var cartSize = (_a = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.cart) === null || _a === void 0 ? void 0 : _a.length;
    var language = useSelector(function (state) { return state.language; });
    var EventPermission = useSelector(function (state) { return state.permission; });
    var _h = useState(false), helperText = _h[0], setHelperText = _h[1];
    var user_role = (_b = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _b === void 0 ? void 0 : _b.event_role;
    var shareLikeButtons = document.getElementsByClassName('fixed_share_button')[0];
    if (shareLikeButtons) {
        focusTextfield ? shareLikeButtons.classList.add('activeMessageBox') : shareLikeButtons.classList.remove('activeMessageBox');
    }
    var allReduxHostChatAsBrand = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.hostChatAsBrand; });
    var hostChatAsBrand = allReduxHostChatAsBrand && allReduxHostChatAsBrand[eventID] ? allReduxHostChatAsBrand[eventID] : {};
    var _j = useState(hostChatAsBrand && hostChatAsBrand[loggedInEmail] ? sessionStorage.getItem('ORGNAME') : userData === null || userData === void 0 ? void 0 : userData.displayName), selectedName = _j[0], setSeletedName = _j[1];
    var permissions = (_c = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _c === void 0 ? void 0 : _c.permission;
    var _k = useState(''), displayNameInput = _k[0], setDisplayNameInput = _k[1];
    var _l = useState(false), updatingDisplayName = _l[0], setUpdatingDisplayName = _l[1];
    var _m = useState(false), showDisplayNameInput = _m[0], setShowDisplayNameInput = _m[1];
    var _o = useState(''), inputMessage = _o[0], setInputMessage = _o[1];
    var _p = useState(''), userEmail = _p[0], setUserEmail = _p[1];
    var _q = useState((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.event_type) === 'call_1to1' && userRole === 'v2_1to1_customer' && window.innerWidth < 1025
        ? 'portrait'
        : (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type)
            ? currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type
            : 'landscape'), event_layout = _q[0], setEventLayout = _q[1];
    useEffect(function () {
        if ((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.event_type) === 'call_1to1' && userRole === 'v2_1to1_customer' && window.innerWidth < 1025) {
            setEventLayout('portrait');
        }
        else if ((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type) === 'portrait' && (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.event_type) === 'live_stream') {
            setEventLayout('portrait');
        }
    }, [user_role, currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type]);
    var isHostAndPrimaryHost = function (email) {
        var _a, _b;
        return (GetRole((_a = customisedEvents[eventID]) === null || _a === void 0 ? void 0 : _a.permissions, email) === 'v2_host' ||
            GetRole((_b = customisedEvents[eventID]) === null || _b === void 0 ? void 0 : _b.permissions, email) === 'v2_primary_host');
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
                displayName: displayNameInput.trim(),
            },
            group_id: 'null',
        };
        global.sdk.UpdateUser(requestBody, function (res) {
            setUpdatingDisplayName(false);
            setDisplayNameInput('');
            setEditDisplayNameMobile(false);
            if (userData === null || userData === void 0 ? void 0 : userData.displayName) {
            }
            global.sdk.SetHostChatAsBrand({
                eventID: eventID,
                email: localStorage.getItem('user-email'),
                value: false,
            });
            if ((userEmail === null || userEmail === void 0 ? void 0 : userEmail.startsWith('anon_')) && !(userData === null || userData === void 0 ? void 0 : userData.displayName)) {
                var anonMessageText = "".concat(showThreeDotsAfterNText(displayNameInput.trim(), 12), " joined the chat");
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
            setEditDisplayNameMobile(false);
            setDisplayNameInput('');
            setUpdatingDisplayName(false);
            console.log('error during updating displayname', e);
        });
    };
    var sendChat = function () {
        var _a;
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
                    requestMsg: !(props === null || props === void 0 ? void 0 : props.showReplyPopup)
                        ? senderUserReqBody
                        : __assign(__assign({}, senderUserReqBody), {
                            reply_to_message: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.text,
                            reply_to_user: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.title,
                            reply_type: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.sender_type,
                        }),
                },
            }, function (res) {
                console.log('SEND CHAT SUUUUU 214', res);
                props === null || props === void 0 ? void 0 : props.setShowReplyPopup(false);
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
                    requestMsg: !(props === null || props === void 0 ? void 0 : props.showReplyPopup)
                        ? senderAdminReqBody
                        : __assign(__assign({}, senderAdminReqBody), {
                            reply_to_message: replyMessageData.text,
                            reply_to_user: replyMessageData === null || replyMessageData === void 0 ? void 0 : replyMessageData.title,
                            reply_type: replyMessageData.sender_type,
                        }),
                },
            }, function (res) {
                console.log('SEND CHAT SUUUUU 214', res);
                props === null || props === void 0 ? void 0 : props.setShowReplyPopup(false);
            }, function (err) {
                console.log(err, 'error in sending messages');
            });
        }
    };
    var ChangeDisplayNameInput = function () { return (_jsxs("div", __assign({ className: 'anon-joined' }, { children: [_jsx(TextField, { className: 'displayNmaeTextField', style: {
                    paddingBottom: helperText ? '0px' : '8px',
                    transition: 'all 0.5s',
                }, id: 'outlined-adornment-anonName', value: displayNameInput, onClick: function (e) {
                    e.stopPropagation();
                }, onChange: function (e) {
                    var _a;
                    var validResponse = handleDisplayName((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value, displayNameInput, t);
                    setDisplayNameInput(validResponse.name);
                    setHelperText(validResponse.helperText);
                }, placeholder: t('login.Enter_display'), InputProps: {
                    autoFocus: true,
                    endAdornment: (_jsx(InputAdornment, __assign({ position: 'end' }, { children: _jsx(Button, __assign({ className: 'anon-name-save-btn', style: {
                                cursor: (displayNameInput === null || displayNameInput === void 0 ? void 0 : displayNameInput.length) === 0 ? 'default' : 'pointer',
                                color: (displayNameInput === null || displayNameInput === void 0 ? void 0 : displayNameInput.length) === 0 ? '#000000' : 'white',
                            }, disabled: (displayNameInput === null || displayNameInput === void 0 ? void 0 : displayNameInput.length) === 0 ? true : false, xid: '4V', onClick: function (e) {
                                e.stopPropagation();
                                !updatingDisplayName && sentAnonJoinedMessage();
                            } }, { children: updatingDisplayName ? (_jsx(Button, __assign({ className: "circularProgress-div ".concat(event_layout) }, { children: _jsx(CircularProgress, { className: "circularProgress ".concat(event_layout), color: 'inherit' }) }))) : (t('admintab.save')) })) }))),
                } }), helperText && _jsx("p", __assign({ className: 'RCBottomNavbar-ErrorMessage' }, { children: helperText }))] }))); };
    return (_jsx(_Fragment, { children: (userData === null || userData === void 0 ? void 0 : userData.displayName) ? (_jsxs(_Fragment, { children: [selectDisplayName && (_jsxs("div", __assign({ className: 'confirm-display-name-div', style: {
                        border: '1px solid #1F498A',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                        borderRadius: '4px',
                        position: 'relative',
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
                                        setSelectDisplayName(false);
                                    } })] })), _jsxs("div", __assign({ style: {
                                backgroundColor: '#ffffff',
                                paddingBottom: '10px',
                                paddingTop: '10px',
                            } }, { children: [_jsxs("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(Radio, { checked: selectedName === (userData === null || userData === void 0 ? void 0 : userData.displayName), value: userData === null || userData === void 0 ? void 0 : userData.displayName, onChange: function (e) {
                                                setSeletedName(e.target.value);
                                            }, name: 'radio-buttons' }), _jsxs("div", __assign({ style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            } }, { children: [_jsx(Typography, __assign({ variant: 'body2', style: {
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        marginRight: '5px',
                                                        display: 'inline',
                                                    } }, { children: showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName) })), _jsxs(Typography, __assign({ variant: 'body2', style: {
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        display: 'inline',
                                                        color: 'rgba(0, 0, 0, 0.38)',
                                                    } }, { children: ["(", t('login.profile_name'), ")"] }))] }))] })), _jsxs("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(Radio, { checked: selectedName === sessionStorage.getItem('ORGNAME'), value: sessionStorage.getItem('ORGNAME'), onChange: function (e) {
                                                setSeletedName(e.target.value);
                                            }, name: 'radio-buttons' }), _jsxs("div", __assign({ style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            } }, { children: [_jsx(Typography, __assign({ variant: 'body2', style: {
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        display: 'inline',
                                                        marginRight: '5px',
                                                    } }, { children: sessionStorage.getItem('ORGNAME') })), _jsxs(Typography, __assign({ variant: 'body2', style: {
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        display: 'inline',
                                                        color: 'rgba(0, 0, 0, 0.38)',
                                                    } }, { children: ["(", t('login.brand_name'), ")"] }))] }))] })), _jsx("div", __assign({ style: {
                                        position: 'absolute',
                                        right: '20px',
                                        top: '66px',
                                        display: 'flex',
                                        cursor: 'pointer',
                                    } }, { children: _jsx(Typography, __assign({ variant: 'body2', style: {
                                            color: '#1F498A',
                                            textAlign: 'right',
                                            fontSize: '15px',
                                            lineHeight: '20px',
                                            display: 'inline',
                                            fontWeight: 'bold',
                                            marginRight: '5px',
                                        }, xid: '7t', onClick: function (e) {
                                            setEditDisplayNameMobile(true);
                                            setSelectDisplayName(false);
                                        } }, { children: t('login.edit') })) })), _jsx(Button, __assign({ style: {
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
                                        if (selectedName === sessionStorage.getItem('ORGNAME')) {
                                            global.sdk.SetHostChatAsBrand({
                                                eventID: event_id,
                                                email: localStorage.getItem('user-email'),
                                                value: true,
                                            });
                                        }
                                        if (selectedName === (userData === null || userData === void 0 ? void 0 : userData.displayName)) {
                                            global.sdk.SetHostChatAsBrand({
                                                eventID: event_id,
                                                email: localStorage.getItem('user-email'),
                                                value: false,
                                            });
                                        }
                                        setSelectDisplayName(false);
                                    } }, { children: t('login.confirm') }))] }))] }))), editDisplayNameMobile ? (_jsx(ChangeDisplayNameInput, {})) : focusTextfield ? (_jsxs(_Fragment, { children: [_jsx(TextField, { style: {
                                backgroundColor: 'white',
                                padding: '6px 4px',
                                paddingBottom: maxLimitExceeds ? '0px' : '8px',
                                transition: 'all 0.5s',
                            }, className: "".concat(maxLimitExceeds ? 'error-textfield' : 'not-error', " message-textField"), id: textfieldLineHeight < 116 ? 'outlined-textarea' : 'outlined-textarea-scroll', multiline: true, onClick: function (e) {
                                e.stopPropagation();
                            }, onChange: function (e) {
                                var _a, _b, _c;
                                if (((_b = splitter === null || splitter === void 0 ? void 0 : splitter.splitGraphemes((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value)) === null || _b === void 0 ? void 0 : _b.length) > 200) {
                                    setMaxLimitExceeds(true);
                                }
                                else {
                                    setMaxLimitExceeds(false);
                                    setInputMessage((_c = e === null || e === void 0 ? void 0 : e.target) === null || _c === void 0 ? void 0 : _c.value);
                                    countTextfieldLines(e);
                                }
                            }, placeholder: checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                                ? t('preview.admin_blocked')
                                : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                                    ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                                        ? "Chat as ".concat(showThreeDotsAfterNText(sessionStorage.getItem('ORGNAME')))
                                        : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName))
                                    : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName)), disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, error: maxLimitExceeds, value: inputMessage, onBlur: function () {
                                if (event_layout === 'portrait') {
                                }
                                if (event_layout === 'landscape') {
                                    var productHighlight = document.getElementsByClassName('highlighter_panel_mobile')[0];
                                    if (productHighlight)
                                        productHighlight.style.display = 'flex';
                                    var pinnedMes = document.getElementsByClassName('pinned-messages')[0];
                                    if (pinnedMes)
                                        pinnedMes.style.display = 'flex';
                                }
                                setFocusTextfield(false);
                            }, InputProps: {
                                autoFocus: true,
                                endAdornment: (_jsx(InputAdornment, __assign({ position: 'end' }, { children: _jsx(IconButton, __assign({ xid: '4Z', onClick: function (e) {
                                            e.stopPropagation();
                                            if (!maxLimitExceeds) {
                                                setFocusTextfield(false);
                                                if (event_layout === 'portrait') {
                                                }
                                                if (event_layout === 'landscape') {
                                                    var productHighlight = document.getElementsByClassName('highlighter_panel_mobile')[0];
                                                    if (productHighlight)
                                                        productHighlight.style.display = 'flex';
                                                    var pinnedMes = document.getElementsByClassName('pinned-messages')[0];
                                                    if (pinnedMes)
                                                        pinnedMes.style.display = 'flex';
                                                }
                                            }
                                        }, onMouseDown: function () {
                                            if (!maxLimitExceeds) {
                                                sendChat();
                                                setFocusTextfield(false);
                                                if (event_layout === 'portrait') {
                                                }
                                                if (event_layout === 'landscape') {
                                                    var productHighlight = document.getElementsByClassName('highlighter_panel_mobile')[0];
                                                    if (productHighlight)
                                                        productHighlight.style.display = 'flex';
                                                    var pinnedMes = document.getElementsByClassName('pinned-messages')[0];
                                                    if (pinnedMes)
                                                        pinnedMes.style.display = 'flex';
                                                }
                                            }
                                        } }, { children: _jsx(SendIconMobile, { color: (inputMessage === null || inputMessage === void 0 ? void 0 : inputMessage.length) > 0 && !maxLimitExceeds
                                                ? event_layout === 'portrait'
                                                    ? '#ffffff'
                                                    : '#1F498A'
                                                : '#404040' }) })) }))),
                            } }), maxLimitExceeds && (_jsx("p", __assign({ style: {
                                color: 'red',
                                fontSize: '0.75rem',
                                marginTop: '0px',
                                marginLeft: '4px',
                            } }, { children: t('preview.character_limit_exceeded') })))] })) : (_jsx("div", __assign({ className: 'RCBottom-Navbar-Container', onClick: function (e) {
                        e.stopPropagation();
                    } }, { children: _jsxs("div", __assign({ className: 'displayName-icon-container' }, { children: [isAllowed(permissions, Permissions.tab_chat.index) && (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.status) === 'streaming_done' ? (_jsx("div", __assign({ className: 'RCBottomNavbar-disabled-chat' }, { children: _jsx("h5", { children: t('preview.live_chat_disabled') }) }))) : (_jsx("div", __assign({ className: 'RCBottom-Navbar-Container-button' }, { children: _jsx(TextField, { style: {
                                        width: '100%',
                                        transition: 'all 0.5s',
                                    }, id: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'outlined-textarea-blocked' : 'outlined-textarea', onClick: function (e) {
                                        e.stopPropagation();
                                    }, onFocus: function (e) {
                                        e.stopPropagation();
                                        setTimeout(function () {
                                            setFocusTextfield(true);
                                        }, 100);
                                        if (event_layout === 'portrait') {
                                        }
                                        if (event_layout === 'landscape') {
                                            var productHighlight = document.getElementsByClassName('highlighter_panel_mobile')[0];
                                            if (productHighlight)
                                                productHighlight.style.display = 'none';
                                            var pinnedMes = document.getElementsByClassName('pinned-messages')[0];
                                            if (pinnedMes)
                                                pinnedMes.style.display = 'none';
                                        }
                                    }, placeholder: checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                                        ? t('preview.admin_blocked')
                                        : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                                            ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                                                ? "Chat as ".concat(showThreeDotsAfterNText(sessionStorage.getItem('ORGNAME')))
                                                : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName))
                                            : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName)), disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 }) }))), _jsxs("div", __assign({ style: {
                                    width: isAllowed(permissions, Permissions.tab_chat.index) && (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.status) !== 'streaming_done'
                                        ? '50%'
                                        : '100%',
                                }, className: 'RCBottom-Navbar-Icon-Container' }, { children: [_jsx(IconButton, __assign({ xid: '7n', onClick: function (e) {
                                            e.stopPropagation();
                                            user_role === 'consumer' || user_role === 'v2_1to1_customer'
                                                ? setCurrentComponent('RCInviteToJoinLive')
                                                : setCurrentComponent('RCDrawerMenu');
                                        }, className: 'icon-single-parent' }, { children: _jsx(Badge, __assign({ className: 'dot-badge', classes: { badge: classes.customBadge }, variant: 'dot', invisible: user_role === 'consumer' ? !(props === null || props === void 0 ? void 0 : props.showViewerTab) : !(eventsState === null || eventsState === void 0 ? void 0 : eventsState.newGuestNotify) }, { children: _jsx(MoreHorizOutlinedIcon, { color: '#000000' }) })) })), isAllowed(permissions, Permissions.tab_product.index) && (_jsx(Button, __assign({ className: 'shop-btn-mobile', variant: 'contained', style: { padding: '4px 10px' }, xid: '7o', onClick: function (e) {
                                            e.stopPropagation();
                                            setCurrentComponent('RCProductsPanel');
                                        } }, { children: _jsx(Typography, __assign({ style: { fontSize: '12px', fontWeight: '500' } }, { children: "SHOP" })) }))), isAllowed(permissions, Permissions.tab_cart.index) ? (_jsx(IconButton, __assign({ xid: '7p', onClick: function (e) {
                                            var _a, _b;
                                            e.stopPropagation();
                                            if (((_a = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.shoppingflowredirect) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                                                ((_b = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.shoppingflowredirect.find(function (obj) { return obj.onwebsite == 'sameorigin' && isInIframe(); })) === null || _b === void 0 ? void 0 : _b.redirectpoint) == 'Cart') {
                                                window.parent.postMessage({
                                                    func: 'openCart',
                                                    cardData: "".concat(props === null || props === void 0 ? void 0 : props.cartData),
                                                }, '*');
                                            }
                                            else
                                                setCurrentComponent('RCCartPanel');
                                        }, className: 'icon-single-parent' }, { children: _jsx(Badge, __assign({ badgeContent: cartSize, color: 'error' }, { children: _jsx(ShoppingCartOutlinedIcon, { className: 'icon-single' }) })) }))) : (_jsx(_Fragment, {}))] }))] })) })))] })) : (_jsx(_Fragment, { children: showDisplayNameInput ? (_jsx(ChangeDisplayNameInput, {})) : (_jsx("div", __assign({ className: 'RCBottom-Navbar-Container', onClick: function (e) {
                    e.stopPropagation();
                } }, { children: _jsxs("div", __assign({ className: 'displayName-icon-container' }, { children: [isAllowed(permissions, Permissions.tab_chat.index) &&
                            ((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.status) !== 'streaming_done' ? (_jsx("div", __assign({ className: 'RCBottom-Navbar-Container-button' }, { children: _jsx(Button, __assign({ style: {
                                        minWidth: '60px',
                                        lineHeight: '28px',
                                        fontSize: (window === null || window === void 0 ? void 0 : window.innerWidth) < 1025 && language === 'fr' ? '10px' : '13px',
                                    }, className: 'display-name-con-btn2', xid: '4W', onClick: function (e) {
                                        e.stopPropagation();
                                        setShowDisplayNameInput(true);
                                    } }, { children: t('login.Enter_display') })) }))) : (_jsx("div", __assign({ className: 'RCBottomNavbar-disabled-chat' }, { children: _jsx("h5", { children: t('preview.live_chat_disabled') }) })))), _jsxs("div", __assign({ style: {
                                width: isAllowed(permissions, Permissions.tab_chat.index) && (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.status) !== 'streaming_done'
                                    ? '50%'
                                    : '100%',
                            }, className: 'RCBottom-Navbar-Icon-Container' }, { children: [(isAllowed(permissions, Permissions.show_language_dropdown_studio.index) ||
                                    isAllowed(permissions, Permissions.request_to_join_live.index)) && (_jsx(IconButton, __assign({ xid: '7n', onClick: function (e) {
                                        e.stopPropagation();
                                        user_role === 'consumer' || user_role === 'v2_1to1_customer'
                                            ? setCurrentComponent('RCInviteToJoinLive')
                                            : setCurrentComponent('RCDrawerMenu');
                                    }, className: 'icon-single-parent' }, { children: _jsx(Badge, __assign({ className: 'dot-badge', classes: { badge: classes.customBadge }, variant: 'dot', invisible: user_role === 'consumer' ? !(props === null || props === void 0 ? void 0 : props.showViewerTab) : !(eventsState === null || eventsState === void 0 ? void 0 : eventsState.newGuestNotify) }, { children: _jsx(MoreHorizOutlinedIcon, { color: '#000000' }) })) }))), isAllowed(permissions, Permissions.tab_product.index) && (_jsx(Button, __assign({ className: 'shop-btn-mobile', variant: 'contained', style: { padding: '4px 10px' }, xid: '7o', onClick: function (e) {
                                        e.stopPropagation();
                                        setCurrentComponent('RCProductsPanel');
                                    } }, { children: _jsx(Typography, __assign({ style: { fontSize: '12px', fontWeight: '500' } }, { children: "SHOP" })) }))), isAllowed(permissions, Permissions.tab_cart.index) ? (_jsx(IconButton, __assign({ xid: '7p', onClick: function (e) {
                                        var _a, _b;
                                        e.stopPropagation();
                                        if (((_a = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.shoppingflowredirect) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                                            ((_b = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.shoppingflowredirect.find(function (obj) { return obj.onwebsite == 'sameorigin' && isInIframe(); })) === null || _b === void 0 ? void 0 : _b.redirectpoint) == 'Cart') {
                                            window.parent.postMessage({
                                                func: 'openCart',
                                                cardData: "".concat(props === null || props === void 0 ? void 0 : props.cartData),
                                            }, '*');
                                        }
                                        else
                                            setCurrentComponent('RCCartPanel');
                                    }, className: 'icon-single-parent' }, { children: _jsx(Badge, __assign({ badgeContent: cartSize, color: 'error' }, { children: _jsx(ShoppingCartOutlinedIcon, { className: 'icon-single' }) })) }))) : (_jsx(_Fragment, {}))] }))] })) }))) })) }));
};
export default ChatInputMobile;
