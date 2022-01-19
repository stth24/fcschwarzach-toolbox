import { environment } from "src/environments/environment";
import * as ical from 'cal-parser';
import { TeamData } from "../model/generalplan.model";
import { Team } from "../model/team.model";
import { getLoginToken, removeLoginToken, setLoginToken } from "../components/helpers/login-helper";
import { Injectable } from "@angular/core";
import { StateService } from "../components/services/state/state.service";
import { WeeklyEvent } from "../model/weekly-event.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private stateService: StateService) { }

    private getUrl() {
        const prefix = environment.production ? '' : 'http://localhost';

        return prefix + '/api';
    }

    private handleTokenNotValid(reject: (reason?: any) => void) {
        alert('Ihre Session ist abgelaufen. Sie werden jetzt ausgeloggt!');

        this.stateService.updateState({
            loggedIn: false
        });

        removeLoginToken()
        reject();
    }

    login(username: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            const body = new FormData();
            body.append('username', username);
            body.append('pw', password);

            const options = {
                method: 'POST',
                body
            };

            fetch(this.getUrl() + '/admin/login.php', options)
                .then(res => {
                    if (res.status === 200) {
                        res.text().then(token => {
                            setLoginToken(token)

                            this.stateService.updateState({
                                loggedIn: true
                            })

                            resolve();
                        });

                    }
                    else {
                        res.text().then(t => reject(t));
                    }
                })
                .catch(err => reject(err));
        })
    }

    verifyToken() {
        return new Promise<void>((resolve, reject) => {
            const token = getLoginToken();

            if (token) {
                const body = new FormData();
                body.append('token', token);

                const options = {
                    method: 'POST',
                    body
                };

                fetch(this.getUrl() + '/admin/verifytoken.php', options)
                    .then(res => {
                        if (res.status === 200) {
                            this.stateService.updateState({
                                loggedIn: true
                            })

                            resolve();
                        }
                        else {
                            this.handleTokenNotValid(reject);
                        }
                    })
                    .catch(err => {
                        reject();
                    });
            }
            else {
                reject();
            }
        })
    }

    getGeneralplanData() {
        return new Promise<TeamData[]>((resolve, reject) => {
            fetch(this.getUrl() + '/generalplan')
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

    getTeams() {
        return new Promise<Team[]>((resolve, reject) => {
            fetch(this.getUrl() + '/admin/getteams.php')
                .then(res => res.json())
                .then((data: Team[]) => resolve(data))
                .catch(error => reject(error))
        })
    }

    updateTeam(team: Team) {
        return new Promise<void>((resolve, reject) => {
            const body = new FormData();
            body.append('token', getLoginToken());
            body.append('id', team.id.toString());
            body.append('name', team.name.trim());
            body.append('url', team.url.trim());

            const options = {
                method: 'POST',
                body
            };

            fetch(this.getUrl() + '/admin/updateteam.php', options)
                .then(res => {
                    if (res.status === 200) {
                        resolve();
                    }
                    else {
                        this.handleTokenNotValid(reject);
                    }
                })
                .catch(err => {
                    reject();
                })
        })
    }

    insertTeam(name: string, url: string) {
        return new Promise<Team>((resolve, reject) => {
            const body = new FormData();
            body.append('token', getLoginToken());
            body.append('name', name);
            body.append('url', url);

            const options = {
                method: 'POST',
                body
            };

            fetch(this.getUrl() + '/admin/setteam.php', options)
                .then(res => {
                    if (res.status === 200) {
                        res.json().then((data: Team[]) => resolve(data[0]));
                    }
                    else {
                        this.handleTokenNotValid(reject);
                    }
                })
                .catch(err => {
                    reject();
                })
        })
    }

    deleteTeam(id: number) {
        return new Promise<void>((resolve, reject) => {
            const body = new FormData();
            body.append('token', getLoginToken());
            body.append('id', id.toString());

            const options = {
                method: 'POST',
                body
            };

            fetch(this.getUrl() + '/admin/deleteteam.php', options)
                .then(res => {
                    if (res.status === 200) {
                        resolve();
                    }
                    else {
                        this.handleTokenNotValid(reject);
                    }
                })
                .catch(err => {
                    reject();
                })
        })
    }


    getWeeklyEvents() {
        return new Promise<WeeklyEvent[]>((resolve, reject) => {
            const EXAMPLE_EVENTS: WeeklyEvent[] = [
                {
                    name: 'KM Training',
                    timeDetails: [{
                        durationInMin: 90,
                        startTime: { hour: '18', minute: '30' },
                        day: 4,
                        location: 'Kunstrasen Wolfurt'
                    }]
                },
                {
                    name: '1b Training',
                    timeDetails: [{
                        durationInMin: 90,
                        startTime: { hour: '19', minute: '30' },
                        day: 4,
                        location: 'Fußballplatz Schwarzach'
                    }]
                },
                {
                    name: 'U7 Training',
                    timeDetails: [{
                        day: 1,
                        startTime: { hour: '17', minute: '00' },
                        durationInMin: 60,
                        location: 'Fußballplatz Schwarzach'
                    },
                    {
                        durationInMin: 60,
                        startTime: { hour: '18', minute: '00' },
                        day: 3,
                        location: 'Halle MS Schwarzach'
                    }]
                },
            ]

            resolve(EXAMPLE_EVENTS);
        })
    }
}