import { Injectable } from '@angular/core';
import { ClubHistory, Kontakt, News, Vorstandsmitglied } from '../model/model';
import { GET_HISTORY, GET_KONTAKT, GET_NEWS, GET_VORSTAND, HOST } from './url';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    getNewsFromApi() {
        return new Promise<News[]>((resolve, reject) => {
            fetch(GET_NEWS.toString())
                .then(res => res.json())
                .then(res => {
                    res.entries.forEach((entry: any) => {
                        entry.image.path = HOST + entry.image.path
                    });

                    resolve(res.entries);
                });
        })
    }

    getVorstandFromApi() {
        return new Promise<Vorstandsmitglied[]>((resolve, reject) => {
            fetch(GET_VORSTAND.toString())
                .then(res => res.json())
                .then(res => {
                    res.entries.forEach((entry: any) => {
                        entry.image.path = HOST + entry.image.path
                    });

                    resolve(res.entries);
                });
        })
    }

    getHistoryFromApi() {
        return new Promise<ClubHistory>((resolve, reject) => {
            fetch(GET_HISTORY.toString())
                .then(res => res.json())
                .then(res => {
                    resolve(res);
                });
        })
    }

    getKontaktFromApi() {
        return new Promise<Kontakt>((resolve, reject) => {
            fetch(GET_KONTAKT.toString())
                .then(res => res.json())
                .then(res => {
                    resolve(res);
                });
        })
    }
}
