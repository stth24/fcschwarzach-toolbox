export const LOGIN_STORAGE_KEY = 'FCS_LOGIN_TOKEN';

export function setLoginToken(value: string) {
    localStorage.setItem(LOGIN_STORAGE_KEY, value);
}

export function getLoginToken() {
    return localStorage.getItem(LOGIN_STORAGE_KEY) || '';
}

export function removeLoginToken() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
}