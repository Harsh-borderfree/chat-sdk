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
import React from 'react';
import { isUrl } from '../ChatUtils/chatUtils';
import { useSelector } from 'react-redux';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Typography } from '@mui/material';
import { showThreeDotsInDisplayName } from '../ChatUtils/chatUtils';
import BlueTickForBrand from './ChatBlueTickBrand';
import ChatTextMesage from './ChatTextMesage';
import ChatImageMessage from './ChatImageMessage';
var ChatMessageBox = function (props) {
    var _a;
    var message = props === null || props === void 0 ? void 0 : props.messageData;
    var isAllowed = props.isAllowed, Permissions = props.Permissions, eventID = props.eventID;
    var EventPermission = useSelector(function (state) { return state.permission; });
    var permissions = (_a = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _a === void 0 ? void 0 : _a.permission;
    return (_jsxs("div", __assign({ className: 'rce-container-mbox' }, { children: [_jsxs("div", __assign({ className: 'rce-mbox-title' }, { children: [_jsxs("div", __assign({ className: 'rce-mbox-title-left' }, { children: [(message === null || message === void 0 ? void 0 : message.sender_name) && (_jsx(Typography, __assign({ className: 'rce-mbox-title-left-content', style: { fontWeight: '600' } }, { children: showThreeDotsInDisplayName(message === null || message === void 0 ? void 0 : message.sender_name) }))), (message === null || message === void 0 ? void 0 : message.sender_name) === localStorage.getItem('ORGNAME') && _jsx(BlueTickForBrand, { brandColor: 'blue' })] })), isAllowed(permissions, Permissions.chat_admin_msg_pin.index) && (_jsx("div", __assign({ className: 'rce-mbox-title-right', style: { cursor: 'pointer' } }, { children: _jsx(MoreVertOutlinedIcon, { height: '20px', width: '20px' }) })))] })), (message === null || message === void 0 ? void 0 : message.message_type) === 'text' && _jsx(ChatTextMesage, __assign({ messageData: message }, props)), (message === null || message === void 0 ? void 0 : message.message_type) === 'photo' && _jsx(ChatImageMessage, __assign({ messageData: message }, props))] })));
};
export default ChatMessageBox;
