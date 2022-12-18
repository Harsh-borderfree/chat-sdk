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
import { Button, IconButton, TextField, CircularProgress, Tooltip, Card, Paper, Typography } from '@mui/material';
import GraphemeSplitter from 'grapheme-splitter';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GetRole, showThreeDotsAfterNText, uuidv4, handleDisplayName, checkForBlockEmail } from '../ChatUtils/chatUtils';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
var ChatInput = function (props) {
    var _a;
    var _b = useState(false), maxLimitExceeds = _b[0], setMaxLimitExceeds = _b[1];
    var EventPermission = useSelector(function (state) { return state.permission; });
    var splitter = new GraphemeSplitter();
    var _c = useState(0), textfieldLineHeight = _c[0], setTextfieldLineHeight = _c[1];
    var _d = useState(''), inputMessage = _d[0], setInputMessage = _d[1];
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
    var countTextfieldLines = function (e) {
        var lineHeight = e.target.clientHeight;
        setTextfieldLineHeight(lineHeight);
    };
    var _e = useState(false), displayNameBox = _e[0], setDisplayNameBox = _e[1];
    var _f = useState(''), displayName = _f[0], setDisplayName = _f[1];
    var _g = useState(''), showHelperText = _g[0], setShowHelperText = _g[1];
    var _h = useState(false), updatingDisplayName = _h[0], setUpdatingDisplayName = _h[1];
    var _j = useState(''), userEmail = _j[0], setUserEmail = _j[1];
    var _k = useState(false), editDisplayNameBox = _k[0], setEditDisplayNameBox = _k[1];
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
    return (_jsx("div", __assign({ className: 'RCChat-Input-Container RCInput-checkbox' }, { children: (userData === null || userData === void 0 ? void 0 : userData.displayName) ? (_jsxs(_Fragment, { children: [editDisplayNameBox && _jsx(DisplayNameBoxContent, {}), _jsx(TextField, { style: {
                        width: '100%',
                        padding: '6px 0px',
                        paddingBottom: maxLimitExceeds ? '0px' : '8px',
                        transition: 'all 0.5s',
                    }, className: "".concat(maxLimitExceeds ? 'error-textfield' : 'not-error', " message-textField"), id: textfieldLineHeight < 116 ? 'outlined-textarea' : 'outlined-textarea-scroll', placeholder: checkForBlockEmail(loggedInEmail, currentEvent) >= 0
                        ? t('preview.admin_blocked')
                        : isHostAndPrimaryHost(localStorage.getItem('user-email'))
                            ? hostChatAsBrand && hostChatAsBrand[loggedInEmail]
                                ? "Chat as ".concat(showThreeDotsAfterNText(sessionStorage.getItem('ORGNAME'), 12))
                                : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName, 12))
                            : "Chat as ".concat(showThreeDotsAfterNText(userData === null || userData === void 0 ? void 0 : userData.displayName, 12)), multiline: true, onChange: function (e) {
                        if (splitter.splitGraphemes(e.target.value).length > 200) {
                            setMaxLimitExceeds(true);
                        }
                        else {
                            setMaxLimitExceeds(false);
                        }
                        setInputMessage(e.target.value);
                        countTextfieldLines(e);
                    } }), _jsxs("div", __assign({ className: 'button-below-input', style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    } }, { children: [_jsxs("div", __assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [_jsx(IconButton, __assign({ className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'emojiicon-blocked' : 'emojiicon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, xid: '4Y', size: 'large' }, { children: _jsx(TagFacesIcon, { style: {
                                            color: '#404040',
                                        } }) })), isAllowed(permissions, Permissions.show_changeName_icon.index) && (_jsx(Tooltip, __assign({ title: _jsx("span", __assign({ style: { width: '70px' } }, { children: t('login.can_changes') })), placement: 'top', arrow: true }, { children: _jsx(IconButton, __assign({ className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'emojiicon-blocked' : 'emojiicon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, xid: 'Am', onClick: function () {
                                            setEditDisplayNameBox(function (prev) { return !prev; });
                                        }, size: 'large' }, { children: displayNameBox || editDisplayNameBox ? (_jsx(SettingsIcon, { style: {
                                                cursor: 'pointer',
                                                color: '#1F498A',
                                            } })) : (_jsx(SettingsOutlinedIcon, { style: {
                                                cursor: 'pointer',
                                                color: '#404040',
                                            } })) })) }))), _jsxs("div", __assign({ className: 'sendRequest_icon' }, { children: [isAllowed(permissions, Permissions.request_to_join_live.index) && !(props === null || props === void 0 ? void 0 : props.showLoader) && (_jsx(Tooltip, __assign({ title: (props === null || props === void 0 ? void 0 : props.invitationStatus) === 'requestedByGuest' ? t('preview.cancel_request') : t('preview.send_request'), placement: 'top', arrow: true }, { children: _jsx(IconButton, __assign({ xid: '7w', className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'settings-icon-blocked' : 'settings-icon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 || (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.status) === 'streaming_done', size: 'large' }, { children: _jsx(VideoCallOutlinedIcon, { style: {
                                                        color: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'gray' : '#404040',
                                                    } }) })) }))), (props === null || props === void 0 ? void 0 : props.showLoader) && _jsx(CircularProgress, { size: 20, className: 'loader-for-request-to-join-live' })] }))] })), _jsx(Button, __assign({ variant: 'contained', color: 'primary', className: checkForBlockEmail(loggedInEmail, currentEvent) >= 0 ? 'sendicon-blocked' : 'sendicon', disabled: checkForBlockEmail(loggedInEmail, currentEvent) >= 0, xid: '4Z' }, { children: t('login.Send') }))] }))] })) : (_jsxs(_Fragment, { children: [displayNameBox && _jsx(DisplayNameBoxContent, {}), _jsx(Button, __assign({ style: { minWidth: '60px' }, className: 'display-name-con-btn2', xid: '4W', onClick: function () { return setDisplayNameBox(true); } }, { children: t('login.Enter_display') }))] })) })));
};
export default ChatInput;
