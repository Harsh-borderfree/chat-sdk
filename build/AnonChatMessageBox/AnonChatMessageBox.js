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
import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
var AnonChatMessageBox = function (_a) {
    var _b;
    var messageData = _a.messageData;
    var t = useTranslation().t;
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: 'anon-container-mbox' }, { children: _jsxs(Typography, { children: [_jsx("span", { children: (_b = messageData === null || messageData === void 0 ? void 0 : messageData.message_text) === null || _b === void 0 ? void 0 : _b.split('joined the chat')[0] }), _jsx("span", { children: t('preview.joined_chat') })] }) })) }));
};
export default AnonChatMessageBox;
