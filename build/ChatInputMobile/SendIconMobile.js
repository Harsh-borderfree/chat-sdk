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
export var SendIconMobile = function (props) {
    return (_jsx("svg", __assign({ width: '20', height: '18', viewBox: '0 0 20 18', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M4.44474 10.8184V16.368C4.44474 17.1608 5.44727 17.5006 6.07385 16.9343L8.95612 13.8763L14.846 17.8404C15.3473 18.1801 16.0991 17.9536 16.2245 17.3873L19.984 0.964984C20.1093 0.285438 19.4827 -0.167592 18.7308 0.0589233L0.559935 6.62786C-0.0666458 6.85438 -0.191962 7.64718 0.309303 8.10021L2.31436 9.4593L8.07891 6.96763C8.58017 6.74112 8.95612 7.30741 8.58017 7.53392L4.44474 10.8184Z', fill: props === null || props === void 0 ? void 0 : props.color }) })));
};
export default SendIconMobile;
