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
import LinkIcon from '@mui/icons-material/Link';
var ChatTextMesage = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var message = props === null || props === void 0 ? void 0 : props.messageData;
    var isAllowed = props.isAllowed, Permissions = props.Permissions, eventID = props.eventID;
    var _j = useState({}), metaData = _j[0], setmetaData = _j[1];
    var _k = useState(false), isLinkInMessage = _k[0], setIsLinkInMessage = _k[1];
    var _l = useState(''), redirectUrl = _l[0], setRedirectUrl = _l[1];
    var _m = useState(15), titleLength = _m[0], setTitleLength = _m[1];
    var _o = useState(25), descriptionLength = _o[0], setDescriptionLength = _o[1];
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
                console.error(err);
                console.error('No metaData could be found for the given URL.', err);
                setmetaData({});
            });
        }
    });
    var openLink = function () {
        window.open(redirectUrl, '_blank');
    };
    return (_jsxs("div", __assign({ className: 'box' }, { children: [isLinkInMessage && metaData && (_jsxs("div", __assign({ className: 'upper' }, { children: [(metaData === null || metaData === void 0 ? void 0 : metaData.image) && (_jsx("div", __assign({ className: 'upperLeft' }, { children: _jsx("div", __assign({ "data-testid": 'container', onClick: openLink }, { children: _jsx("div", { "data-testid": 'image-container', style: {
                                    backgroundImage: "url(".concat(metaData === null || metaData === void 0 ? void 0 : metaData.image, ")"),
                                }, className: 'Image' }) })) }))), _jsxs("div", __assign({ className: 'upperRight' }, { children: [_jsx("div", __assign({ className: 'titleContainer' }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.title) && (_jsx("h3", __assign({ "data-testid": 'title', className: 'Title', style: {
                                        padding: '0px',
                                        margin: '0px',
                                    } }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.image)
                                        ? titleLength
                                            ? ((_a = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _a === void 0 ? void 0 : _a.length) > titleLength
                                                ? ((_b = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _b === void 0 ? void 0 : _b.slice(0, titleLength)) + '...'
                                                : metaData === null || metaData === void 0 ? void 0 : metaData.title
                                            : metaData === null || metaData === void 0 ? void 0 : metaData.title
                                        : titleLength
                                            ? ((_c = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _c === void 0 ? void 0 : _c.length) > titleLength * 1.2
                                                ? ((_d = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _d === void 0 ? void 0 : _d.slice(0, titleLength * 1.2)) + '...'
                                                : metaData === null || metaData === void 0 ? void 0 : metaData.title
                                            : metaData === null || metaData === void 0 ? void 0 : metaData.title }))) })), _jsx("div", __assign({ className: 'Description' }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.description) && (_jsx("span", __assign({ "data-testid": 'desc', className: 'Description Secondary', style: {
                                        color: 'var(--text-color)',
                                    } }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.image)
                                        ? descriptionLength
                                            ? ((_e = metaData === null || metaData === void 0 ? void 0 : metaData.description) === null || _e === void 0 ? void 0 : _e.length) > descriptionLength
                                                ? ((_f = metaData === null || metaData === void 0 ? void 0 : metaData.description) === null || _f === void 0 ? void 0 : _f.slice(0, descriptionLength)) + '...'
                                                : metaData === null || metaData === void 0 ? void 0 : metaData.description
                                            : metaData === null || metaData === void 0 ? void 0 : metaData.description
                                        : descriptionLength
                                            ? ((_g = metaData === null || metaData === void 0 ? void 0 : metaData.description) === null || _g === void 0 ? void 0 : _g.length) > descriptionLength * 2
                                                ? (metaData === null || metaData === void 0 ? void 0 : metaData.description.slice(0, descriptionLength * 2)) + '...'
                                                : metaData === null || metaData === void 0 ? void 0 : metaData.description
                                            : metaData === null || metaData === void 0 ? void 0 : metaData.description }))) })), _jsx("div", __assign({ className: 'SiteDetails' }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.siteName) && (_jsxs("div", { children: [_jsx("span", __assign({ style: { marginRight: '6px' } }, { children: _jsx(LinkIcon, {}) })), _jsx("span", __assign({ className: 'link-preview-link' }, { children: _jsx("b", { children: metaData === null || metaData === void 0 ? void 0 : metaData.siteName }) }))] })) }))] }))] }))), _jsx("div", __assign({ className: 'lower MuiTypography-body2', style: isLinkInMessage == false ? { marginTop: '0px' } : {} }, { children: _jsx("div", __assign({ className: 'MuiTypography-subtitle2' }, { children: (_h = newLineHandler(message === null || message === void 0 ? void 0 : message.message_text)) === null || _h === void 0 ? void 0 : _h.map(function (elem) {
                        return (_jsx("div", { children: elem === null || elem === void 0 ? void 0 : elem.split(' ').map(function (s) {
                                return (_jsx(_Fragment, { children: isUrl(s) ? (_jsxs("a", __assign({ onClick: openLink, className: 'MuiTypography-subtitle2', style: {
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            color: 'rgba(255, 255, 255, .7)',
                                        } }, { children: [s, "\u00A0"] }))) : (_jsx(_Fragment, { children: s != '' && (_jsxs("p", __assign({ className: 'MuiTypography-subtitle2', style: {
                                                display: 'inline-block',
                                                margin: '0px 0px',
                                            } }, { children: [s, "\u00A0"] }))) })) }));
                            }) }));
                    }) })) }))] })));
};
export default ChatTextMesage;
