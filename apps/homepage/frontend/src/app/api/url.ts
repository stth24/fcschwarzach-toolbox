import { environment } from "../../environments/environment";

export const HOST = !environment.production ? 'https://fcschwarzach.com/' : (window.location.origin + '/');
export const GET_API_TOKEN = HOST + 'api/admin/api-token.php';
export const GET_GOOGLE_DEV_TOKEN = HOST + 'api/admin/google-dev-token.php';
export const COCKPIT_URL = HOST + 'cockpit';

export const GET_URL = COCKPIT_URL + "/api";
export const GET_COLLECTION = GET_URL + '/collections/get';
export const GET_SINGLETON = GET_URL + '/singletons/get';

// collections
export const GET_NEWS = new URL(GET_COLLECTION + '/news');
export const GET_VORSTAND = new URL(GET_COLLECTION + '/vorstand');
export const GET_MANNSCHAFTEN = new URL(GET_COLLECTION + '/mannschaften');
export const GET_SPONSOREN = new URL(GET_COLLECTION + '/sponsors');
export const GET_SPIELER = new URL(GET_COLLECTION + '/spieler');

export function getSingleNewsEntryUrl(id: string, token: string) {
    const url = new URL(GET_COLLECTION + '/news');

    return getSingleEntryUrl(id, url, token);
}

export function getSingleTeamEntryUrl(id: string, token: string) {
    const url = new URL(GET_COLLECTION + '/mannschaften');

    return getSingleEntryUrl(id, url, token);
}

export function getSingleTrainerEntryUrl(id: string, token: string) {
    const url = new URL(GET_COLLECTION + '/trainer');

    return getSingleEntryUrl(id, url, token);
}


export function getSingleEntryUrl(id: string, url: URL, token: string) {
    const queryParams = new URLSearchParams({ token, 'filter[_id]': id });

    url.search = queryParams.toString();

    return url;
}

// singletons
export const GET_HISTORY = new URL(GET_SINGLETON + '/history');
export const GET_KONTAKT = new URL(GET_SINGLETON + '/kontakt');
export const GET_NW_INFO = new URL(GET_SINGLETON + '/nwinfo');
export const GET_DOCOUMENTS_INFO = new URL(GET_SINGLETON + '/documents');
export const GET_SOCIAL_MEDIA_LINKS = new URL(GET_SINGLETON + '/socialmedialinks');


export function addApiTokenToURLs(token: string) {
    const params = new URLSearchParams({ token });

    [
        GET_NEWS,
        GET_HISTORY,
        GET_VORSTAND,
        GET_KONTAKT,
        GET_MANNSCHAFTEN,
        GET_NW_INFO,
        GET_SPONSOREN,
        GET_SPIELER,
        GET_DOCOUMENTS_INFO,
        GET_SOCIAL_MEDIA_LINKS
    ].forEach(url => url.search = params.toString());
}
