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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export var ChatToolTipDesc = function (props) {
    return (_jsx("svg", __assign({ width: '15', height: '15', viewBox: '0 0 15 15', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M6.78828 4.25391H8.18828V5.65391H6.78828V4.25391ZM6.78828 7.05391H8.18828V11.2539H6.78828V7.05391ZM7.48828 0.753906C3.62428 0.753906 0.488281 3.88991 0.488281 7.75391C0.488281 11.6179 3.62428 14.7539 7.48828 14.7539C11.3523 14.7539 14.4883 11.6179 14.4883 7.75391C14.4883 3.88991 11.3523 0.753906 7.48828 0.753906ZM7.48828 13.3539C4.40128 13.3539 1.88828 10.8409 1.88828 7.75391C1.88828 4.66691 4.40128 2.15391 7.48828 2.15391C10.5753 2.15391 13.0883 4.66691 13.0883 7.75391C13.0883 10.8409 10.5753 13.3539 7.48828 13.3539Z', fill: props === null || props === void 0 ? void 0 : props.color }) })));
};
export default ChatToolTipDesc;
