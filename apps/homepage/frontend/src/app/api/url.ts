export const HOST = 'http://localhost/';
export const TOKEN = "5226b17e18a8c01fbc27a286a0d659";

export const GET_URL = HOST + "cockpit-master/api";
export const GET_COLLECTION = GET_URL + '/collections/get';
export const GET_SINGLETON = GET_URL + '/singletons/get';
export const params = new URLSearchParams({ token: TOKEN });

// collections
export const GET_NEWS = new URL(GET_COLLECTION + '/news');
export const GET_VORSTAND = new URL(GET_COLLECTION + '/vorstand');

// singletons
export const GET_HISTORY = new URL(GET_SINGLETON + '/history');
export const GET_KONTAKT = new URL(GET_SINGLETON + '/kontakt');


GET_NEWS.search = params.toString();
GET_HISTORY.search = params.toString();
GET_VORSTAND.search = params.toString();
GET_KONTAKT.search = params.toString();
