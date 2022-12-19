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
import { MenuItem, Menu, SwipeableDrawer, Divider, IconButton } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { checkForBlockEmail, isUrl, uuidv4 } from '../ChatUtils/chatUtils';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
var ChatOptions = function (props) {
    var _a, _b, _c, _d, _e;
    var t = useTranslation().t;
    var message = props === null || props === void 0 ? void 0 : props.messageData;
    var anchorRef = useRef(null);
    var _f = useState(null), anchorElMenu = _f[0], setAnchorElMenu = _f[1];
    var _g = useState(false), showBlockOption = _g[0], setShowBlockOption = _g[1];
    var isAllowed = props.isAllowed, Permissions = props.Permissions, eventID = props.eventID, groupID = props.groupID;
    var _h = useState(false), showMenuItem = _h[0], setShowMenuItem = _h[1];
    var eventsState = useSelector(function (state) { return state.events; });
    var customisedEvents = eventsState.customisedEvents;
    var currentEvent = customisedEvents[eventID];
    var adminPinnedMessages = ((_a = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _a === void 0 ? void 0 : _a.pinned_message) ? __spreadArray([], (_b = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _b === void 0 ? void 0 : _b.pinned_message, true) : [];
    var EventPermission = useSelector(function (state) { return state.permission; });
    var permissions = (_c = EventPermission === null || EventPermission === void 0 ? void 0 : EventPermission.event_permission[eventID]) === null || _c === void 0 ? void 0 : _c.permission;
    var _j = useState({}), selectedMessage = _j[0], setSelectedMessage = _j[1];
    var pinOnAdminClick = function () {
        var _a, _b;
        setShowMenuItem(false);
        var pinnedMessages = ((_a = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _a === void 0 ? void 0 : _a.pinned_message) ? __spreadArray([], (_b = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _b === void 0 ? void 0 : _b.pinned_message, true) : [];
        if ((pinnedMessages === null || pinnedMessages === void 0 ? void 0 : pinnedMessages.length) === 1) {
            global.sdk.CallSnackBar(true, 'error', 3000, t('preview.support_two_pin'), 'bottom', 'center');
            return;
        }
        pinnedMessages.map(function (msg) {
            if ((msg === null || msg === void 0 ? void 0 : msg.message_id) === (selectedMessage === null || selectedMessage === void 0 ? void 0 : selectedMessage.id)) {
                global.sdk.CallSnackBar(true, 'error', 3000, t('preview.cant_pin_again'), 'bottom', 'center');
                return;
            }
        });
        var requestBody = {
            group_id: "".concat(groupID, "_").concat(eventID, "_pinned"),
            has_preview: false,
            id: uuidv4(),
            message_id: selectedMessage === null || selectedMessage === void 0 ? void 0 : selectedMessage.id,
            message_text: selectedMessage === null || selectedMessage === void 0 ? void 0 : selectedMessage.message_text,
            message_type: 'text',
            sender_name: selectedMessage === null || selectedMessage === void 0 ? void 0 : selectedMessage.sender_name,
            msg_id: selectedMessage === null || selectedMessage === void 0 ? void 0 : selectedMessage.msg_id,
            pin_id: uuidv4(),
            push_time: new Date().getTime(),
            sender_id: selectedMessage === null || selectedMessage === void 0 ? void 0 : selectedMessage.sender_id,
            status: 'pinned',
        };
        pinnedMessages.push(requestBody);
        var data = {
            event_id: eventID,
            data: __assign(__assign({}, currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info), { pinned_message: pinnedMessages }),
            event_type: 'chat_info',
        };
        global.sdk.SetEventLevelData(data, function () { }, function (res) {
            console.log('failed to update destinations', res);
        });
        global.sdk.UpdateShowJson({
            id: eventID,
            data: {
                chat_info: __assign(__assign({}, currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info), { pinned_message: pinnedMessages }),
            },
        }, function () {
        }, function (e) {
            console.log('error update', e);
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, __assign({ ref: anchorRef, id: 'simple-menu', className: 'rce-mbox-title-right', style: { cursor: 'pointer' }, onClick: function (e) {
                    setSelectedMessage(message);
                    setAnchorElMenu(e);
                    setShowMenuItem(true);
                    if ((message === null || message === void 0 ? void 0 : message.user_type) === 'admin') {
                        setShowBlockOption(false);
                    }
                    else {
                        setShowBlockOption(true);
                    }
                } }, { children: _jsx(MoreVertOutlinedIcon, { height: '20px', width: '20px' }) })), showMenuItem &&
                (window.innerWidth > 1024 ? (_jsxs(Menu, __assign({ open: true, id: 'simple-menu', anchorEl: anchorRef.current, keepMounted: true, onClose: function () {
                        setShowMenuItem(false);
                    }, anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }, transformOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    } }, { children: [_jsx(MenuItem, __assign({ xid: '4O', className: 'RCChat-menu-pin' }, { children: t('watch.reply') })), isAllowed(permissions, Permissions.chat_admin_msg_pin.index) &&
                            ((adminPinnedMessages === null || adminPinnedMessages === void 0 ? void 0 : adminPinnedMessages.find(function (pinEl) { return (pinEl === null || pinEl === void 0 ? void 0 : pinEl.msg_id) === (message === null || message === void 0 ? void 0 : message.id); })) ? (_jsx(MenuItem, __assign({ xid: '4P', onClick: function () {
                                    unPinMessages();
                                }, className: 'RCChat-menu-pin' }, { children: t('watch.unpin_msg') }))) : (_jsx(MenuItem, __assign({ xid: '4Q', onClick: pinOnAdminClick, className: 'RCChat-menu-pin' }, { children: t('watch.pin_msg') })))), isAllowed(permissions, Permissions.invite_to_join_live.index) &&
                            checkForBlockEmail(message === null || message === void 0 ? void 0 : message.sender_id, currentEvent) < 0 &&
                            showBlockOption && (_jsx(MenuItem, __assign({ xid: '4O', className: 'RCChat-menu-pin' }, { children: t('Viewers_panel.invite_menuitem') }))), isAllowed(permissions, Permissions.chat_admin_msg_block.index) &&
                            checkForBlockEmail(message === null || message === void 0 ? void 0 : message.sender_id, currentEvent) < 0 &&
                            showBlockOption && (_jsx(MenuItem, __assign({ xid: '4R', className: 'RCChat-menu-pin' }, { children: t('watch.block_user') }))), isAllowed(permissions, Permissions.chat_admin_msg_block.index) &&
                            checkForBlockEmail(message === null || message === void 0 ? void 0 : message.sender_id, currentEvent) >= 0 &&
                            showBlockOption && (_jsx(MenuItem, __assign({ xid: '4S', className: 'RCChat-menu-pin' }, { children: t('watch.unblock_user') })))] }))) : (_jsxs(SwipeableDrawer, __assign({ anchor: 'bottom', transitionDuration: 400, open: Boolean(anchorElMenu), PaperProps: {
                        square: false,
                        style: {
                            borderRadius: '12px 12px 0px 0px',
                            height: 'auto',
                            overscrollBehavior: 'auto',
                            overflowY: 'scroll !important',
                            overflowX: 'hidden',
                        },
                    } }, { children: [_jsx(Divider, { style: {
                                margin: 'auto',
                                marginTop: '6px',
                                width: '50px',
                                border: '1px solid',
                            } }), _jsxs("div", __assign({ style: { padding: '20px 16px 12px 16px' } }, { children: [isAllowed(props === null || props === void 0 ? void 0 : props.permissions, Permissions.invite_to_join_live.index) && showBlockOption && (_jsxs("div", __assign({ style: {
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                        cursor: 'pointer',
                                    }, xid: '7y' }, { children: [_jsx(VideoCallOutlinedIcon, { style: {
                                                color: 'var(--brand-color)',
                                                marginRight: '13px',
                                            } }), _jsx(Typography, __assign({ variant: 'h6', style: {
                                                fontSize: '16px',
                                                color: 'var(--text-color)',
                                                fontWeight: '400',
                                            }, xid: '4O' }, { children: t('Viewers_panel.invite_menuitem') }))] }))), _jsxs("div", __assign({ style: {
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                        cursor: 'pointer',
                                    }, xid: '7y' }, { children: [_jsx(PushPinOutlinedIcon, { style: {
                                                color: 'var(--brand-color)',
                                                marginRight: '13px',
                                            } }), isAllowed(props === null || props === void 0 ? void 0 : props.permissions, Permissions.chat_admin_msg_pin.index) &&
                                            ((adminPinnedMessages === null || adminPinnedMessages === void 0 ? void 0 : adminPinnedMessages.find(function (pinEl) { var _a; return pinEl.msg_id === ((_a = props === null || props === void 0 ? void 0 : props.mesagesData) === null || _a === void 0 ? void 0 : _a.id); })) ? (_jsx(Typography, __assign({ variant: 'h6', style: {
                                                    fontSize: '16px',
                                                    color: 'var(--text-color)',
                                                    fontWeight: '400',
                                                }, xid: '4P' }, { children: t('watch.unpin_msg') }))) : (_jsx(Typography, __assign({ variant: 'h6', style: {
                                                    fontSize: '16px',
                                                    color: 'var(--text-color)',
                                                    fontWeight: '400',
                                                }, xid: '4Q' }, { children: t('watch.pin_msg') }))))] })), _jsxs("div", __assign({ style: {
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                        cursor: 'pointer',
                                    }, xid: '7y' }, { children: [_jsx(ReplyOutlinedIcon, { style: {
                                                color: 'var(--brand-color)',
                                                marginRight: '13px',
                                            } }), _jsx(Typography, __assign({ variant: 'h6', style: {
                                                fontSize: '16px',
                                                color: 'var(--text-color)',
                                                fontWeight: '400',
                                            } }, { children: t('watch.reply') }))] })), showBlockOption && (_jsxs("div", __assign({ style: {
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                        cursor: 'pointer',
                                    }, xid: '7y' }, { children: [_jsx(BlockOutlinedIcon, { style: {
                                                color: 'var(--brand-color)',
                                                marginRight: '13px',
                                            } }), checkForBlockEmail((_d = props === null || props === void 0 ? void 0 : props.mesagesData) === null || _d === void 0 ? void 0 : _d.sender_id, currentEvent) < 0 && showBlockOption && (_jsx(Typography, __assign({ variant: 'h6', style: {
                                                fontSize: '16px',
                                                color: 'var(--text-color)',
                                                fontWeight: '400',
                                            }, xid: '4R' }, { children: t('watch.block_user') }))), checkForBlockEmail((_e = props === null || props === void 0 ? void 0 : props.mesagesData) === null || _e === void 0 ? void 0 : _e.sender_id, currentEvent) >= 0 && showBlockOption && (_jsx(Typography, __assign({ variant: 'h6', style: {
                                                fontSize: '16px',
                                                color: 'var(--text-color)',
                                                fontWeight: '400',
                                            }, xid: '4S' }, { children: t('watch.unblock_user') })))] })))] }))] }))))] }));
};
export default ChatOptions;
