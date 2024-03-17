import { Injectable } from '@angular/core';
import { GeneralplanApiService } from '@fcschwarzach/shared-generalplan-api';
import { environment } from '../../environments/environment';
import { Asset, ClubHistory, DocumentInfo, Kontakt, Mannschaft, News, NewsletterInfo, NWInfo, SocialMediaLinks, Spieler, Sponsor, Trainer, Vorstandsmitglied } from '../model/model';
import { addApiTokenToURLs, GET_API_TOKEN, GET_DOCOUMENTS_INFO, GET_GOOGLE_DEV_TOKEN, GET_HISTORY, GET_KONTAKT, GET_MANNSCHAFTEN, GET_NEWS, GET_NEWSLETTER_INFO, GET_NW_INFO, GET_SOCIAL_MEDIA_LINKS, GET_SPIELER, GET_SPONSOREN, GET_VORSTAND, getSingleNewsEntryUrl, getSingleTeamEntryUrl, getSingleTrainerEntryUrl, HOST } from './url';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiToken = '';

    private getPrefix(): string {
        return environment.production ? '' : 'https://fcschwarzach.com'; //'http://localhost';
    }

    private changeEntryImagePath(entry: { image: Asset }) {
        if (entry?.image?.path) {
            entry.image.path = this.changeAssetPath(entry.image.path);
        }
    }

    private changeAssetPath(assetPath: string) {
        return HOST + assetPath;
    }

    constructor(private generalplanApiService: GeneralplanApiService) { }

    private transformEntryToNewsItem(entry: any) {
        this.changeEntryImagePath(entry);
        entry.id = entry._id;
        entry.modified = new Date(entry._modified * 1000)
    }

    getApiToken() {
        return new Promise<void>((resolve) => {
            fetch(GET_API_TOKEN)
                .then(res => res.text())
                .then(token => {
                    this.apiToken = token;
                    addApiTokenToURLs(this.apiToken);
                    resolve();
                });
        })
    }

    getGoogleDevToken() {
        return new Promise<string>((resolve) => {
            fetch(GET_GOOGLE_DEV_TOKEN)
                .then(res => res.text())
                .then(token => {
                    resolve(token);
                });
        })
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
            fetch(getSingleNewsEntryUrl(newsId, this.apiToken).toString())
                .then(res => res.json())
                .then(res => {
                    if (res.entries.length === 0) reject();

                    res?.entries.forEach((entry: any) => {
                        this.transformEntryToNewsItem(entry);
                    });

                    resolve(res?.entries[0]);
                })
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
                        entry.id = entry._id;
                        this.changeEntryImagePath(entry);
                    });

                    resolve(res.entries);
                });
        })
    }

    getSingleMannschaftEntryFromApi(teamId: string) {
        return new Promise<Mannschaft>((resolve, reject) => {
            fetch(getSingleTeamEntryUrl(teamId, this.apiToken).toString())
                .then(res => res.json())
                .then(res => {
                    if (res.entries.length === 0) reject();

                    res?.entries.forEach((entry: any) => {
                        entry.id = entry._id;
                        this.changeEntryImagePath(entry);
                    });

                    resolve(res?.entries[0]);
                });
        })
    }

    getSpielerFromApi() {
        return new Promise<Spieler[]>((resolve, reject) => {
            fetch(GET_SPIELER.toString())
                .then(res => res.json())
                .then(res => {
                    res?.entries.forEach((entry: any) => {
                        entry.id = entry._id;
                        this.changeEntryImagePath(entry);
                    });

                    resolve(res.entries);
                });
        })
    }

    getSingleTrainerFromApi(trainerId: string) {
        return new Promise<Trainer>((resolve, reject) => {
            fetch(getSingleTrainerEntryUrl(trainerId, this.apiToken).toString())
                .then(res => res.json())
                .then(res => {
                    res?.entries.forEach((entry: any) => {
                        entry.id = entry._id;
                        this.changeEntryImagePath(entry);
                    });

                    resolve(res?.entries[0]);
                });
        })
    }

    getSponsorenFromApi() {
        return new Promise<Sponsor[]>((resolve, reject) => {
            fetch(GET_SPONSOREN.toString())
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

    getDocumentsFromApi() {
        return new Promise<DocumentInfo>((resolve, reject) => {
            fetch(GET_DOCOUMENTS_INFO.toString())
                .then(res => res.json())
                .then((res: DocumentInfo) => {
                    if (res?.impressum) res.impressum = this.changeAssetPath(res.impressum);
                    if (res?.statuten) res.statuten = this.changeAssetPath(res.statuten);

                    resolve(res);
                });
        })
    }

    getSocialMediaLinks() {
        return new Promise<SocialMediaLinks>((resolve, reject) => {
            fetch(GET_SOCIAL_MEDIA_LINKS.toString())
                .then(res => res.json())
                .then((res: SocialMediaLinks) => {
                    resolve(res);
                });
        })
    }

    getNewsletterInfo() {
        return new Promise<NewsletterInfo>((resolve, reject) => {
            fetch(GET_NEWSLETTER_INFO.toString())
                .then(res => res.json())
                .then((res: NewsletterInfo) => {
                    resolve(res);
                });
        })
    }

    getGeneralPlanData() {
        return this.generalplanApiService.getGeneralplanData(this.getPrefix());
    }
}
