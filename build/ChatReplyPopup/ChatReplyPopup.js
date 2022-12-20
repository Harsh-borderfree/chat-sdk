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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@mui/material';
import React from 'react';
import { showThreeDotsAfterNText } from '../ChatUtils/chatUtils';
var ChatReplyPopup = function (props) {
    var message = props === null || props === void 0 ? void 0 : props.messageData;
    return (_jsx("div", __assign({ className: 'rce-mbox-reply-container' }, { children: _jsxs("div", __assign({ className: 'rce-mbox-reply' }, { children: [_jsx("div", __assign({ className: 'rce-mbox-reply-title' }, { children: _jsxs("div", __assign({ className: 'rce-mbox-reply-title-content-left', style: {
                            display: 'flex',
                            alignItems: 'center',
                        } }, { children: [_jsx(Typography, __assign({ className: 'rce-mbox-reply-title-content-left-text' }, { children: showThreeDotsAfterNText(message === null || message === void 0 ? void 0 : message.sender_name, 12) || 'Unknown' })), (message === null || message === void 0 ? void 0 : message.sender_name) === localStorage.getItem('ORGNAME') && _jsx(ChatBlueTickBrand, {})] })) })), _jsx(Typography, __assign({ className: 'rce-mbox-reply-message' }, { children: showThreeDotsAfterNText(message === null || message === void 0 ? void 0 : message.message_text, 30) || '...' }))] })) })));
};
export default ChatReplyPopup;
