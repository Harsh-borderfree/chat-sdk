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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, IconButton, ownerWindow } from '@mui/material';
import ChatInput from '../ChatInput/ChatInput';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import ChatMessageList from '../ChatMessageList/ChatMessageList';
import { CircularProgress } from '@mui/material';
import ChatPinnedMessage from '../ChatPinnedMessage/ChatPinnedMessage';
import ChatReplyPop from '../ChatReplyPopup/ChatReplyPopup';
import ChatInputMobile from '../ChatInputMobile/ChatInputMobile';
import './ChatComponents.css';
var ChatComponents = function (props) {
    var _a, _b, _c;
    var eventID = props.eventID, isChatLoading = props.isChatLoading;
    var allReduxMessages = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.allMessages; });
    var allChatMessages = allReduxMessages[eventID] || [];
    var EventPermission = useSelector(function (state) { return state.permission; });
    var userRole = (_a = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _a === void 0 ? void 0 : _a.event_role;
    var replayMessages = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.replayMessages; });
    var allReplayMessages = replayMessages ? replayMessages[eventID] : [];
    var _d = useState([]), chatMessageList = _d[0], setChatMessageList = _d[1];
    var eventsState = useSelector(function (state) { return state.events; });
    var customisedEvents = eventsState.customisedEvents;
    var currentEvent = customisedEvents[eventID];
    var _e = useState(), showReplyPopup = _e[0], setShowReplyPopup = _e[1];
    var _f = useState({}), repliedMessagesData = _f[0], setRepliedMessageData = _f[1];
    var t = useTranslation().t;
    var adminPinnedMessages = ((_b = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _b === void 0 ? void 0 : _b.pinned_message) ? __spreadArray([], (_c = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _c === void 0 ? void 0 : _c.pinned_message, true) : [];
    useEffect(function () {
        if (allChatMessages.length > 0 || allReplayMessages.length > 0) {
            var isRecordedVideoPlaying = currentEvent.status == 'streaming_done' && global.mem.current.event.isRecordedVideoPlaying == true;
            var tempMessageList = [];
            if (isRecordedVideoPlaying == true) {
                tempMessageList = __spreadArray([], allReplayMessages, true);
                setChatMessageList(tempMessageList);
            }
            else {
                tempMessageList = __spreadArray([], allChatMessages, true);
                setChatMessageList(tempMessageList);
            }
        }
    }, [allChatMessages, allReplayMessages]);
    return (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: "chat-elements-box RCChat-container ".concat(userRole) }, { children: [Window.innerWidth > 1024 && (_jsxs("div", __assign({ className: 'RCChat-title-div' }, { children: [_jsx(Typography, __assign({ variant: 'h6' }, { children: t('preview.chat') })), _jsx(IconButton, __assign({ className: 'RCChat-title-close-iconbutton', xid: '4M', size: 'large' }, { children: _jsx(CloseIcon, { className: 'RCChat-title-close-icon' }) }))] }))), adminPinnedMessages &&
                    (adminPinnedMessages === null || adminPinnedMessages === void 0 ? void 0 : adminPinnedMessages.length) > 0 &&
                    (adminPinnedMessages === null || adminPinnedMessages === void 0 ? void 0 : adminPinnedMessages.map(function (message) {
                        return (_jsx("div", __assign({ className: 'pin-msg-box' }, { children: _jsx(ChatPinnedMessage, __assign({ messageData: message }, props)) }), message.pin_id));
                    })), _jsx("div", __assign({ className: 'RCChat-content-container', id: 'RCChat-OuterDiv' }, { children: isChatLoading ? (_jsx("div", __assign({ className: 'chat-loading' }, { children: _jsx(CircularProgress, {}) }))) : !isChatLoading && allChatMessages.length === 0 ? (_jsx("div", __assign({ className: 'chat-loading' }, { children: "NO Messages" }))) : (_jsx(ChatMessageList, __assign({ chatMessageList: chatMessageList }, props, { setShowReplyPopup: setShowReplyPopup, setRepliedMessageData: setRepliedMessageData }))) })), showReplyPopup && _jsx(ChatReplyPop, __assign({ messageData: repliedMessagesData }, props)), window.innerWidth > 1024 ? (_jsx(ChatInput, __assign({}, props, { showReplyPopup: showReplyPopup, setShowReplyPopu: setShowReplyPopup }))) : (_jsx(ChatInputMobile, __assign({}, props, { showReplyPopup: showReplyPopup, setShowReplyPopu: setShowReplyPopup })))] })) }));
};
export default ChatComponents;
