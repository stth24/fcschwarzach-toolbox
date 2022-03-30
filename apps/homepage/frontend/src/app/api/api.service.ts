import { Injectable } from '@angular/core';
import { GeneralplanApiService } from '@fcschwarzach/shared-generalplan-api';
import { environment } from '../../environments/environment';
import { ClubHistory, Kontakt, Mannschaft, News, NWInfo, Vorstandsmitglied } from '../model/model';
import { getSingleNewsEntryUrl, GET_HISTORY, GET_KONTAKT, GET_MANNSCHAFTEN, GET_NEWS, GET_NW_INFO, GET_VORSTAND, HOST } from './url';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private getPrefix(): string {
        return environment.production ? '' : 'http://fcschwarzach.com'; //'http://localhost';
    }

    private changeEntryImagePath(entry: any) {
        if (entry?.image?.path) {
            entry.image.path = HOST + entry.image.path
        }
    }

    constructor(private generalplanApiService: GeneralplanApiService) { }

    private transformEntryToNewsItem(entry: any) {
        this.changeEntryImagePath(entry);
        entry.id = entry._id;
        entry.modified = new Date(entry._modified * 1000)
    }

    getNewsFromApi() {
        return new Promise<News[]>((resolve, reject) => {
            fetch(GET_NEWS.toString())
                .then(res => res.json())
                .then(res => {
                    res?.entries.forEach((entry: any) => {
                        this.transformEntryToNewsItem(entry);
                    });

                    resolve(res.entries);
                });
        })
    }

    getSingleNewsEntryFromApi(newsId: string) {
        return new Promise<News>((resolve, reject) => {
            fetch(getSingleNewsEntryUrl(newsId).toString())
                .then(res => res.json())
                .then(res => {
                    res?.entries.forEach((entry: any) => {
                        this.transformEntryToNewsItem(entry);
                    });

                    resolve(res?.entries[0]);
                });
        })
    }

    getVorstandFromApi() {
        return new Promise<Vorstandsmitglied[]>((resolve, reject) => {
            fetch(GET_VORSTAND.toString())
                .then(res => res.json())
                .then(res => {
                    res?.entries.forEach((entry: any) => {
                        this.changeEntryImagePath(entry);
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
                    res?.entries.forEach((entry: any) => {
                        this.changeEntryImagePath(entry);
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

    getNwInfoFromApi() {
        return new Promise<NWInfo>((resolve, reject) => {
            fetch(GET_NW_INFO.toString())
                .then(res => res.json())
                .then(res => {
                    this.changeEntryImagePath(res);

                    resolve(res);
                });
        })
    }

    getGeneralPlanData() {
        return this.generalplanApiService.getGeneralplanData(this.getPrefix());
    }
}
