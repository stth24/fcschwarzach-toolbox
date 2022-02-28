export const LOGIN_STORAGE_KEY = 'FCS_LOGIN_TOKEN';

export abstract class LoginTokenHandler {
    static setLoginToken(value: string) {
        localStorage.setItem(LOGIN_STORAGE_KEY, value);
    }

    static getLoginToken() {
        return localStorage.getItem(LOGIN_STORAGE_KEY) || '';
    }

    static removeLoginToken() {
        localStorage.removeItem(LOGIN_STORAGE_KEY);
    }
}