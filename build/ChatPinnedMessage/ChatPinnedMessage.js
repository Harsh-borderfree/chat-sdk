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
import React, { useEffect, useState } from 'react';
import { showThreeDotsAfterNText } from '../ChatUtils/chatUtils';
import { useSelector } from 'react-redux';
import PinnedIcon from './PinnedIcon';
import BlueTickForBrand from '../ChatMessageBox/ChatBlueTickBrand';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PinnedTextMessage from './PinnedTextMessage';
var ChatPinnedMessage = function (props) {
    var _a, _b;
    var t = useTranslation().t;
    var message = props === null || props === void 0 ? void 0 : props.messageData;
    var isAllowed = props.isAllowed, Permissions = props.Permissions, eventID = props.eventID;
    var _c = useState(false), accordianActive = _c[0], setAccordianActive = _c[1];
    var EventPermission = useSelector(function (state) { return state.permission; });
    var permissions = (_a = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _a === void 0 ? void 0 : _a.permission;
    var eventsState = useSelector(function (state) { return state.events; });
    var customisedEvents = eventsState.customisedEvents;
    var currentEvent = customisedEvents[eventID];
    var userRole = (_b = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _b === void 0 ? void 0 : _b.event_role;
    var _d = useState((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.event_type) === 'call_1to1' && userRole === 'v2_1to1_customer' && window.innerWidth < 1025
        ? 'portrait'
        : (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type)
            ? currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type
            : 'landscape'), event_layout = _d[0], setEventLayout = _d[1];
    useEffect(function () {
        if ((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.event_type) === 'call_1to1' && userRole === 'v2_1to1_customer' && window.innerWidth < 1025) {
            setEventLayout('portrait');
        }
        else if ((currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type) === 'portrait' && (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.event_type) === 'live_stream') {
            setEventLayout('portrait');
        }
    }, [userRole, currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.show_type]);
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: 'rce-container-citem chat-pinned-message-container' }, { children: _jsxs("div", __assign({ className: 'chat-pinned-message-body' }, { children: [_jsxs("div", __assign({ className: 'chat-pinned-message-body--top' }, { children: [_jsxs("div", __assign({ className: 'chat-pinned-message-body--top-left' }, { children: [_jsx(PinnedIcon, { brandColor: '#ffffff' }), _jsx("span", __assign({ style: {
                                            color: 'var(--text-color-from-brand-color)',
                                            fontWeight: '600',
                                        }, className: 'sender-title MuiTypography-subtitle2' }, { children: showThreeDotsAfterNText(message === null || message === void 0 ? void 0 : message.sender_name) })), (message === null || message === void 0 ? void 0 : message.sender_name) === localStorage.getItem('ORGNAME') && _jsx(BlueTickForBrand, { brandColor: '#ffffff' })] })), _jsxs("div", __assign({ className: 'chat-pinned-message-body--top-right' }, { children: [isAllowed(permissions, Permissions.chat_admin_msg_unpin.index) && (_jsx(Button, __assign({ className: 'chat-pinned-message-unpin-btn', xid: '7r' }, { children: t('preview.unpin') }))), _jsx("div", __assign({ className: 'chat-pinned-message-body-accordion-icon', onClick: function () {
                                            if (event_layout === 'portrait' && userRole === 'consumer' && window.innerWidth < 1025) {
                                            }
                                            else {
                                                setAccordianActive(function (prev) { return !prev; });
                                            }
                                        } }, { children: accordianActive ? (_jsx("svg", __assign({ width: '12', height: '8', viewBox: '0 0 12 8', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M10.59 7.70508L6 3.12508L1.41 7.70508L0 6.29508L6 0.295078L12 6.29508L10.59 7.70508Z', fill: 'var(--text-color-from-brand-color)' }) }))) : (_jsx("svg", __assign({ width: '12', height: '8', viewBox: '0 0 12 8', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M10.59 0.294922L6 4.87492L1.41 0.294922L0 1.70492L6 7.70492L12 1.70492L10.59 0.294922Z', fill: 'var(--text-color-from-brand-color)' }) }))) }))] }))] })), (message === null || message === void 0 ? void 0 : message.message_type) === 'text' && _jsx(PinnedTextMessage, __assign({ messageData: message }, props))] })) })) }));
};
export default ChatPinnedMessage;
