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
import ChatComponents from '../ChatComponents/ChatComponents';
import { Provider } from 'react-redux';
var BfreeChat = function (props) {
    var eventID = props.eventID, groupID = props.groupID, store = props.store;
    return (_jsx(Provider, __assign({ store: store }, { children: _jsx(ChatComponents, __assign({}, props)) })));
};
export default BfreeChat;