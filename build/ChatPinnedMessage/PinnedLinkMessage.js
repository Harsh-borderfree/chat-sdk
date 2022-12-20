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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
var PinnedLinkMessage = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var metaData = _a.metaData, openLink = _a.openLink;
    var _j = useState(15), titleLength = _j[0], setTitleLength = _j[1];
    var _k = useState(25), descriptionLength = _k[0], setDescriptionLength = _k[1];
    return (_jsxs("div", __assign({ className: 'upper-pin' }, { children: [(metaData === null || metaData === void 0 ? void 0 : metaData.image) && (_jsx("div", __assign({ className: 'upperLeft-pin' }, { children: _jsx("div", __assign({ classNam: 'Container-pin', "data-testid": 'container', onClick: openLink }, { children: _jsx("div", { "data-testid": 'image-container', style: {
                            backgroundImage: "url(".concat(metaData === null || metaData === void 0 ? void 0 : metaData.image, ")"),
                        }, className: 'Image-pin' }) })) }))), _jsxs("div", __assign({ className: 'upperRight-pin' }, { children: [_jsx("div", __assign({ className: 'titleContainer-pin' }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.title) && (_jsx("h5", __assign({ "data-testid": 'title', className: 'Title-pin', style: {
                                padding: '0px',
                                margin: '0px',
                            } }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.image)
                                ? titleLength
                                    ? ((_b = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _b === void 0 ? void 0 : _b.length) > titleLength
                                        ? ((_c = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _c === void 0 ? void 0 : _c.slice(0, titleLength)) + '...'
                                        : metaData === null || metaData === void 0 ? void 0 : metaData.title
                                    : metaData === null || metaData === void 0 ? void 0 : metaData.title
                                : titleLength
                                    ? ((_d = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _d === void 0 ? void 0 : _d.length) > titleLength * 1.2
                                        ? ((_e = metaData === null || metaData === void 0 ? void 0 : metaData.title) === null || _e === void 0 ? void 0 : _e.slice(0, titleLength * 1.2)) + '...'
                                        : metaData === null || metaData === void 0 ? void 0 : metaData.title
                                    : metaData === null || metaData === void 0 ? void 0 : metaData.title }))) })), _jsx("div", __assign({ className: 'Description-pin' }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.description) && (_jsx("span", __assign({ "data-testid": 'desc', className: 'Description Secondary' }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.image)
                                ? descriptionLength
                                    ? ((_f = metaData === null || metaData === void 0 ? void 0 : metaData.description) === null || _f === void 0 ? void 0 : _f.length) > descriptionLength
                                        ? ((_g = metaData === null || metaData === void 0 ? void 0 : metaData.description) === null || _g === void 0 ? void 0 : _g.slice(0, descriptionLength)) + '...'
                                        : metaData === null || metaData === void 0 ? void 0 : metaData.description
                                    : metaData === null || metaData === void 0 ? void 0 : metaData.description
                                : descriptionLength
                                    ? ((_h = metaData === null || metaData === void 0 ? void 0 : metaData.description) === null || _h === void 0 ? void 0 : _h.length) > descriptionLength * 2
                                        ? (metaData === null || metaData === void 0 ? void 0 : metaData.description.slice(0, descriptionLength * 2)) + '...'
                                        : metaData === null || metaData === void 0 ? void 0 : metaData.description
                                    : metaData === null || metaData === void 0 ? void 0 : metaData.description }))) })), _jsx("div", __assign({ className: 'Secondary SiteDetails-pin' }, { children: (metaData === null || metaData === void 0 ? void 0 : metaData.siteName) && (_jsxs(_Fragment, { children: [_jsx("span", __assign({ style: { marginRight: '6px' } }, { children: _jsx(LinkIcon, {}) })), _jsx("span", __assign({ className: 'link-preview-link' }, { children: _jsx("b", { children: metaData === null || metaData === void 0 ? void 0 : metaData.siteName }) }))] })) }))] }))] })));
};
export default PinnedLinkMessage;
