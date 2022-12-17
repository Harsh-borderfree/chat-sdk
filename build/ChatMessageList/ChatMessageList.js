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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import AnonChatMessageBox from '../AnonChatMessageBox/AnonChatMessageBox';
import ChatMessageBox from '../ChatMessageBox/ChatMessageBox';
import ChatReplyMessage from '../ChatReplyMessage/ChatReplyMessage';
var ChatMessageList = function (props) {
    var _a;
    var messagesList = props.chatMessageList;
    var bottomInputElement = document.getElementsByClassName('RCChat-Input-Container');
    var bottomInputHeight = 50;
    if (bottomInputElement) {
        bottomInputHeight = (_a = bottomInputElement[0]) === null || _a === void 0 ? void 0 : _a.clientHeight;
    }
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: 'Chat-message-list-container', style: { height: "calc(100% - ".concat(bottomInputHeight, "px)") } }, { children: messagesList.map(function (message) {
                var _a, _b;
                if (((_a = message === null || message === void 0 ? void 0 : message.sender_id) === null || _a === void 0 ? void 0 : _a.includes('anon_')) &&
                    ((_b = message === null || message === void 0 ? void 0 : message.message_text) === null || _b === void 0 ? void 0 : _b.includes('joined the chat')) &&
                    !(message === null || message === void 0 ? void 0 : message.sender_name)) {
                    return (_jsx(_Fragment, { children: _jsx(AnonChatMessageBox, { messageData: message }) }));
                }
                else {
                    return (_jsx(_Fragment, { children: _jsx(ChatMessageBox, __assign({ messageData: message }, props)) }));
                }
            }) })) }));
};
export default ChatMessageList;
