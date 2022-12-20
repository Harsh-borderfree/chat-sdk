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
import { isUrl, newLineHandler } from '../ChatUtils/chatUtils';
import PinnedLinkMessage from './PinnedLinkMessage';
var PinnedTextMessage = function (props) {
    var _a;
    var message = props === null || props === void 0 ? void 0 : props.messageData;
    var metaData = props.metaData, setmetaData = props.setmetaData, isLinkInMessage = props.isLinkInMessage, setIsLinkInMessage = props.setIsLinkInMessage;
    var _b = useState(''), redirectUrl = _b[0], setRedirectUrl = _b[1];
    useEffect(function () {
        var passUrl = '';
        var isLinkInMessage = false;
        var splitOnLineChange = newLineHandler(message === null || message === void 0 ? void 0 : message.message_text);
        for (var a = 0; a < splitOnLineChange.length; a++) {
            var arr = splitOnLineChange[a].split(' ');
            for (var x = 0; x < arr.length; x++) {
                if (isUrl(arr[x])) {
                    setIsLinkInMessage(true);
                    isLinkInMessage = true;
                    passUrl = arr[x];
                    break;
                }
            }
        }
        if (isLinkInMessage) {
            fetch("https://dev-revo-consumer-api.borderfree.live/scrapeMetaTags?url=".concat(passUrl), {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'group-id': 'streamstyle',
                },
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                var _a;
                if (res) {
                    var tempSiteData = res;
                    var siteData = __assign(__assign({}, tempSiteData), { siteName: (_a = res === null || res === void 0 ? void 0 : res.url) === null || _a === void 0 ? void 0 : _a.replace(/.+\/\/|www.|\..+/g, '') });
                    setmetaData(siteData);
                    if (res.url) {
                        if (res.url.startsWith('http://') || res.url.startsWith('https://')) {
                            setRedirectUrl(res.url);
                        }
                        else {
                            var tempRedirectUrl = 'http://' + res.url;
                            setRedirectUrl(tempRedirectUrl);
                        }
                    }
                }
                else {
                    setIsLinkInMessage(false);
                }
            })
                .catch(function (err) {
                setIsLinkInMessage(false);
                console.error('No metaData could be found for the given URL.', err);
                setmetaData({});
            });
        }
    }, []);
    var openLink = function () {
        window.open(redirectUrl, '_blank');
    };
    return (_jsxs(_Fragment, { children: [isLinkInMessage && metaData && _jsx(PinnedLinkMessage, { metaData: metaData, openLink: openLink }), _jsx("div", __assign({ className: "MuiTypography-subtitle2 pinned-message-text ".concat((props === null || props === void 0 ? void 0 : props.accordianActive) ? "pinned-message-text-collapsed" : "pinned-message-text-expand") }, { children: (_a = newLineHandler(message === null || message === void 0 ? void 0 : message.message_text)) === null || _a === void 0 ? void 0 : _a.map(function (elem) {
                    return (_jsx(_Fragment, { children: isUrl(elem) ? (_jsx(_Fragment, { children: elem.split(' ').map(function (s) {
                                return (_jsx(_Fragment, { children: isUrl(s) ? (_jsxs("a", __assign({ onClick: openLink, className: 'pinned-message-text-link' }, { children: [s, "\u00A0"] }))) : (_jsx(_Fragment, { children: s != '' && (_jsxs("p", __assign({ className: 'MuiTypography-subtitle2 pinned-message-text-normal', style: {
                                                display: 'inline-block',
                                                margin: '0px 0px',
                                            } }, { children: [s, "\u00A0"] }))) })) }));
                            }) })) : (_jsx(_Fragment, { children: elem != '' && (_jsx("p", __assign({ id: 'pinned-message-text', className: "MuiTypography-subtitle2 pinned-message-text-normal ".concat((props === null || props === void 0 ? void 0 : props.accordianActive) ? "pinned-message-text-normal-collapsed" : "pinned-message-text-normal-expand") }, { children: elem }))) })) }));
                }) }))] }));
};
export default PinnedTextMessage;
