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
import { Typography, Box, ListItem, IconButton } from '@mui/material';
import ChatInput from '../ChatInput/ChatInput';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import './ChatComponents.css';
import ChatMessageList from '../ChatMessageList/ChatMessageList';
var ChatComponents = function (props) {
    var eventID = props.eventID, groupID = props.groupID;
    var allReduxMessages = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.allMessages; });
    var allChatMessages = allReduxMessages[eventID] || [];
    console.log('ALL CHAT MESSAGES', allChatMessages);
    var replayMessages = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.replayMessages; });
    var allReplayMessages = replayMessages ? replayMessages[eventID] : [];
    var _a = useState([]), chatMessageList = _a[0], setChatMessageList = _a[1];
    var eventsState = useSelector(function (state) { return state.events; });
    var streamEvents = eventsState.streamEvents, customisedEvents = eventsState.customisedEvents;
    var currentEvent = customisedEvents[eventID];
    var t = useTranslation().t;
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
                tempMessageList = tempMessageList.reverse();
                setChatMessageList(tempMessageList);
            }
        }
    }, [allChatMessages, allReplayMessages]);
    return (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'RCChat-conatainer' }, { children: [_jsxs("div", __assign({ className: 'RCChat-title-div' }, { children: [_jsx(Typography, __assign({ variant: 'h6' }, { children: t('preview.chat') })), _jsx(IconButton, __assign({ className: 'RCChat-title-close-iconbutton', xid: '4M', onClick: function () {
                                props === null || props === void 0 ? void 0 : props.setCurrentComponent('RCProductsPanel');
                            }, size: 'large' }, { children: _jsx(CloseIcon, { className: 'RCChat-title-close-icon' }) }))] })), _jsxs("div", __assign({ className: 'RCChat-content-container' }, { children: [_jsx(ChatMessageList, __assign({ chatMessageList: chatMessageList }, props)), _jsx(ChatInput, __assign({}, props))] }))] })) }));
};
export default ChatComponents;
