import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
var ChatComponents = function (_a) {
    var eventID = _a.eventID, groupID = _a.groupID;
    var allReduxMessages = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.allMessages; });
    var allChatMessages = allReduxMessages[eventID] || [];
    var _b = useState(0), state = _b[0], setState = _b[1];
    useEffect(function () {
        setState(5);
    }, []);
    return _jsx(Typography, { children: "ChatComponents" });
};
export default ChatComponents;
