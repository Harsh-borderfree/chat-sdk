import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
var ChatComponents = function () {
    var allReduxMessages = useSelector(function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.chat) === null || _a === void 0 ? void 0 : _a.allMessages; });
    var allChatMessages = allReduxMessages[eventID] || [];
    var _a = useState(0), state = _a[0], setState = _a[1];
    useEffect(function () {
        setState(5);
    }, []);
    console.log('+++STATTTA', state, allChatMessages);
    return _jsx("div", { children: "ChatComponents" });
};
export default ChatComponents;
