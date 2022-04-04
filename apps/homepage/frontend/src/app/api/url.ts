import { environment } from "../../environments/environment";

export const HOST = !environment.production ? 'http://fcschwarzach.com/' : (window.location.origin + '/');
export const TOKEN = "ee267dda1fbfde50ed854fb6af19ca";
export const COCKPIT_URL = HOST + 'cockpit';

export const GET_URL = COCKPIT_URL + "/api";
export const GET_COLLECTION = GET_URL + '/collections/get';
export const GET_SINGLETON = GET_URL + '/singletons/get';
export const params = new URLSearchParams({ token: TOKEN });

// collections
export const GET_NEWS = new URL(GET_COLLECTION + '/news');
export const GET_VORSTAND = new URL(GET_COLLECTION + '/vorstand');
export const GET_MANNSCHAFTEN = new URL(GET_COLLECTION + '/mannschaften');
export const GET_SPONSOREN = new URL(GET_COLLECTION + '/sponsors');

export function getSingleNewsEntryUrl(id: string) {
    const url = new URL(GET_COLLECTION + '/news');
    const queryParams = new URLSearchParams({ token: TOKEN, 'filter[_id]': id });

    url.search = queryParams.toString();

    return url;
}

// singletons
export const GET_HISTORY = new URL(GET_SINGLETON + '/history');
export const GET_KONTAKT = new URL(GET_SINGLETON + '/kontakt');
export const GET_NW_INFO = new URL(GET_SINGLETON + '/nwinfo');


[
    GET_NEWS,
    GET_HISTORY,
    GET_VORSTAND,
    GET_KONTAKT,
    GET_MANNSCHAFTEN,
    GET_NW_INFO,
    GET_SPONSOREN
].forEach(url => url.search = params.toString());
