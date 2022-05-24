import { Injectable } from '@angular/core';
// @ts-ignore
import * as ical from 'cal-parser';
import { TeamData } from './generalplan.model';


@Injectable({
    providedIn: 'root'
})
export class GeneralplanApiService {

    private getUrl(prefix: string) {
        return prefix + '/api';
    }

    getGeneralplanData(prefix: string) {
        return new Promise<TeamData[]>((resolve, reject) => {
            fetch(this.getUrl(prefix) + '/generalplan')
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            const teams: TeamData[] = [];

                            if (Array.isArray(data)) {
                                data.forEach((d: any) => {
                                    teams.push({
                                        name: d.name,
                                        url: d.url,
                                        events: ical.parseString(d.data).events
                                    })
                                })
                                resolve(teams);
                            }
                            else {
                                reject('Cannot parse data!');
                            }
                        })
                    }
                    else {
                        reject('An unexpected Error occurred');
                    }
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}
