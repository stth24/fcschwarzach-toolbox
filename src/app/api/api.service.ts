import { environment } from "src/environments/environment";
import * as ical from 'cal-parser';
import { TeamData } from "../model/generalplan.model";
import { Team } from "../model/team.model";
import { LoginTokenHandler } from "../components/helpers/login-helper";
import { Injectable } from "@angular/core";
import { StateService } from "../components/services/state/state.service";
import { TimeDetails, WeeklyEvent } from "../model/weekly-event.model";
import { Form } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private stateService: StateService) { }

    private getUrl() {
        const prefix = environment.production ? '' : 'http://localhost';

        return prefix + '/api';
    }

    private handleErrorResponse(reject: (reason?: any) => void, status: number) {
        if (status === 401) {
            this.handleTokenNotValid(reject);
        }
        else {
            reject();
        }
    }

    private handleTokenNotValid(reject: (reason?: any) => void) {
        alert('Ihre Session ist abgelaufen. Sie werden jetzt ausgeloggt!');

        this.stateService.updateState({
            loggedIn: false
        });

        LoginTokenHandler.removeLoginToken();
        reject();
    }

    private deleteRequest(id: string, url: string) {
        return new Promise<void>((resolve, reject) => {
            const body = new FormData();
            body.append('token', LoginTokenHandler.getLoginToken());
            body.append('id', id);

            const options = {
                method: 'POST',
                body
            };

            fetch(url, options)
                .then(res => {
                    if (res.status === 200) {
                        resolve();
                    }
                    else {
                        this.handleErrorResponse(reject, res.status);
                    }
                })
                .catch(err => {
                    reject();
                })
        })
    }

    private insertRequest<T>(body: FormData, url: string) {
        return new Promise<T>((resolve, reject) => {
            body.append('token', LoginTokenHandler.getLoginToken());

            const options = {
                method: 'POST',
                body
            };

            fetch(url, options)
                .then(res => {
                    if (res.status === 200) {
                        res.json().then((data: T[]) => resolve(data[0]));
                    }
                    else {
                        this.handleErrorResponse(reject, res.status)
                    }
                })
                .catch(err => {
                    reject();
                })
        })
    }

    private updateRequest(body: FormData, url: string) {
        return new Promise<void>((resolve, reject) => {
            body.append('token', LoginTokenHandler.getLoginToken());

            const options = {
                method: 'POST',
                body
            };

            fetch(url, options)
                .then(res => {
                    if (res.status === 200) {
                        resolve();
                    }
                    else {
                        this.handleTokenNotValid(reject);
                        reject();
                    }
                })
                .catch(err => {
                    reject();
                })
        })
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
                            LoginTokenHandler.setLoginToken(token)

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
            const token = LoginTokenHandler.getLoginToken();

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
        const body = new FormData();
        body.append('id', team.id.toString());
        body.append('name', team.name.trim());
        body.append('url', team.url.trim());

        return this.updateRequest(
            body,
            this.getUrl() + '/admin/updateteam.php'
        )
    }

    insertTeam(name: string, url: string) {
        const body = new FormData();
        body.append('name', name);
        body.append('url', url);

        return this.insertRequest<Team>(
            body,
            this.getUrl() + '/admin/setteam.php'
        )
    }

    deleteTeam(id: number) {
        return this.deleteRequest(
            id.toString(),
            this.getUrl() + '/admin/deleteteam.php');
    }


    getWeeklyEvents() {
        return new Promise<WeeklyEvent[]>((resolve, reject) => {
            fetch(this.getUrl() + '/weekplan')
                .then(res => res.json())
                .then((data: WeeklyEvent[]) => resolve(data))
                .catch(error => reject(error))
        })
    }

    deleteWeeklyEvent(id: string) {
        return this.deleteRequest(
            id,
            this.getUrl() + '/admin/deleteweeklyevent.php');
    }

    insertWeeklyEvent(name: string) {
        const body = new FormData();
        body.append('name', name);

        return this.insertRequest<WeeklyEvent>(
            body,
            this.getUrl() + '/admin/setweeklyevent.php'
        )
    }

    updateWeeklyEvent(id: string, name: string) {
        const body = new FormData();
        body.append('id', id);
        body.append('name', name);

        return this.updateRequest(
            body,
            this.getUrl() + '/admin/updateweeklyevent.php'
        )
    }

    deleteWeeklyTimeDetail(id: string) {
        return this.deleteRequest(
            id,
            this.getUrl() + '/admin/deletetimedetails.php');
    }

    private createTimeDetailsFormData(timeDetail: TimeDetails) {
        const body = new FormData();
        body.append('durationInMin', timeDetail.durationInMin);
        body.append('day', timeDetail.day);
        body.append('location', timeDetail.location);
        body.append('startTimeHour', timeDetail.startTimeHour);
        body.append('startTimeMinute', timeDetail.startTimeMinute);

        return body;
    }

    updateTimeDetail(timeDetail: TimeDetails) {
        const body = this.createTimeDetailsFormData(timeDetail);
        body.append('id', timeDetail.id);

        return this.updateRequest(
            body,
            this.getUrl() + '/admin/updatetimedetails.php'
        )
    }


    insertTimeDetail(timeDetail: TimeDetails) {
        const body = this.createTimeDetailsFormData(timeDetail);
        body.append('weeklyEventid', timeDetail.weeklyEventid);

        return this.insertRequest<TimeDetails>(
            body,
            this.getUrl() + '/admin/settimedetails.php'
        )
    }
}