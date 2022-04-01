"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
exports.default = {
    isPhone(phone_num, country_code) {
        let regexp = null;
        switch (country_code) {
            default:
            case 'cn':
                regexp = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/;
                break;
        }
        return regexp.test(phone_num);
    }
};
exports.test = '100';
