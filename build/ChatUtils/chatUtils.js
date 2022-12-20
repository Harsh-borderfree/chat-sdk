var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var showThreeDotsAfterNText = function (str, N) {
    if ((str === null || str === void 0 ? void 0 : str.length) >= N) {
        var prefix = str === null || str === void 0 ? void 0 : str.slice(0, N);
        return prefix + '...';
    }
    return str;
};
var regex = {
    userName: /[`!@#$%^&*()+=[\]{};':"\\|,<>/?~]/,
    userEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneNumber: /^(\+\d{1,3}[- ]?)?\d{10}$/,
};
var errorHelperText = {
    userName: 'settings_panel.valid_name',
    userEmail: 'rsvp.email_error',
    phoneNumber: 'rsvp.phone_error',
    emptyField: 'rsvp.emptyfield_error',
    maxCharLimit: 'rsvp.max_char_limit',
};
export var uuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
export var handleDisplayName = function (text, name, t) {
    var showHelperText = false;
    var helperText = '';
    if ((text === null || text === void 0 ? void 0 : text.length) > 70) {
        return {
            name: name,
            showHelperText: true,
            helperText: t(errorHelperText.maxCharLimit),
        };
    }
    if ((text === null || text === void 0 ? void 0 : text.length) === 0)
        return {
            name: text,
            showHelperText: true,
            helperText: t(errorHelperText.emptyField),
        };
    if (!name && text === ' ') {
        return { name: '', showHelperText: showHelperText, helperText: helperText };
    }
    if (regex['userName'].test(text)) {
        showHelperText = true;
        return { name: name, showHelperText: showHelperText, helperText: t(errorHelperText.userName) };
    }
    else {
        showHelperText = false;
    }
    var lastLetter = text[(text === null || text === void 0 ? void 0 : text.length) - 1];
    var secondLastLetter = text[(text === null || text === void 0 ? void 0 : text.length) - 2];
    if (lastLetter === ' ' && secondLastLetter === ' ') {
        return { name: name, showHelperText: showHelperText, helperText: helperText };
    }
    return { name: text, showHelperText: showHelperText, helperText: helperText };
};
export var checkForBlockEmail = function (userEmail, currentEvent) {
    var _a, _b, _c;
    var alreadyBlockedEmail = ((_b = (_a = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _a === void 0 ? void 0 : _a.blocked_Email) === null || _b === void 0 ? void 0 : _b.length) > 0 ? __spreadArray([], (_c = currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.chat_info) === null || _c === void 0 ? void 0 : _c.blocked_Email, true) : [];
    if ((alreadyBlockedEmail === null || alreadyBlockedEmail === void 0 ? void 0 : alreadyBlockedEmail.length) === 0) {
        return -1;
    }
    var found = alreadyBlockedEmail === null || alreadyBlockedEmail === void 0 ? void 0 : alreadyBlockedEmail.findIndex(function (_a) {
        var email = _a.email, isBlocked = _a.isBlocked;
        return email === userEmail && isBlocked;
    });
    if (found >= 0)
        return found;
    return -1;
};
export var GetRole = function (eventPermissions, userid, event_type) {
    if (event_type === void 0) { event_type = 'live_stream'; }
    for (var i = 0; i < (eventPermissions === null || eventPermissions === void 0 ? void 0 : eventPermissions.length); i++) {
        if (eventPermissions[i].userid == userid) {
            return eventPermissions[i].user_role;
        }
    }
    if (event_type == 'call_1to1')
        return 'v2_1to1_customer';
    return 'v2_default';
};
export var isUrl = function (s) {
    var res = s.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return res !== null;
};
export var newLineHandler = function (string) {
    if (string.includes('\n')) {
        return string.split('\n');
    }
    else {
        return [string];
    }
};