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
import { useSelector } from 'react-redux';
import { Typography, Box, ListItem, IconButton } from '@mui/material';
import ChatInput from '../ChatInput/ChatInput';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import './ChatComponents.css';
var ChatComponents = function (props) {
    var eventID = props.eventID, groupID = props.groupID;
    var t = useTranslation().t;
    return (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: 'RCChat-title-div' }, { children: [_jsx(Typography, __assign({ variant: 'h6' }, { children: t('preview.chat') })), _jsx(IconButton, __assign({ className: 'RCChat-title-close-iconbutton', xid: '4M', onClick: function () {
                        props === null || props === void 0 ? void 0 : props.setCurrentComponent('RCProductsPanel');
                    }, size: 'large' }, { children: _jsx(CloseIcon, { className: 'RCChat-title-close-icon' }) }))] })) }));
};
export default ChatComponents;
