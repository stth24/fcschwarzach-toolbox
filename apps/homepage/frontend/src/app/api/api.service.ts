import { Injectable } from '@angular/core';
import { GeneralplanApiService } from '@fcschwarzach/shared-generalplan-api';
import { environment } from '../../environments/environment';
import { ClubHistory, Kontakt, Mannschaft, News, Vorstandsmitglied } from '../model/model';
import { GET_HISTORY, GET_KONTAKT, GET_MANNSCHAFTEN, GET_NEWS, GET_VORSTAND, HOST } from './url';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private getPrefix(): string {
        return environment.production ? '' : 'http://localhost';
    }

    constructor(private generalplanApiService: GeneralplanApiService) { }

    getNewsFromApi() {
        return new Promise<News[]>((resolve, reject) => {
            fetch(GET_NEWS.toString())
                .then(res => res.json())
                .then(res => {
                    res.entries.forEach((entry: any) => {
                        entry.image.path = HOST + entry.image.path
                        entry.modified = new Date(entry._modified * 1000)
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

    getMannschaftenFromApi() {
        return new Promise<Mannschaft[]>((resolve, reject) => {
            fetch(GET_MANNSCHAFTEN.toString())
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

    getGeneralPlanData() {
        return this.generalplanApiService.getGeneralplanData(this.getPrefix());
    }
}
