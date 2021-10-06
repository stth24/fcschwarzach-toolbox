import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as ical from 'cal-parser';

interface IcalEventValue<T> {
    value: T
}

interface IcalEvent {
    dtstart: IcalEventValue<Date>,
    location: IcalEventValue<string>,
    summary: IcalEventValue<string>,
    url: IcalEventValue<string>,
    description: IcalEventValue<string>
}

interface TeamData {
    name: string,
    url: string,
    events: IcalEvent[],
    show: boolean
}

interface MatchDayTeamData {
    name: string,
    events: IcalEvent[]
}

interface MatchDayEventsByTeam {
    date: Date,
    teams: MatchDayTeamData[]
}

@Component({
    selector: 'app-generalplan',
    templateUrl: './generalplan.component.html',
    styleUrls: ['./generalplan.component.scss']
})
export class GeneralplanComponent implements OnInit {
    eventsByTeams: { name: string, events: any }[] = [];

    teams: TeamData[] = [];

    matchTable: MatchDayEventsByTeam[] = [];

    startDate: Date;
    endDate: Date;

    url = environment.production ?
        '/api/generalplan/' :
        'http://localhost/api/generalplan';

    showFilters = false;

    showHome = true;
    showAway = true;

    fetchError = {
        status: false,
        message: {
            title: '',
            text: ''
        }
    }

    constructor() {
        // set startdate and enddate to first or second half of the year
        const today = new Date();
        if (today.getMonth() < 6) {
            this.startDate = new Date(`${today.getFullYear()}-01-01`);
            this.endDate = new Date(`${today.getFullYear()}-06-30`);
        }
        else {
            this.startDate = new Date(`${today.getFullYear()}-07-01`);
            this.endDate = new Date(`${today.getFullYear()}-12-31`);
        }

        this.startDate.setHours(0, 0, 0, 0);
        this.endDate.setHours(0, 0, 0, 0);
    }

    ngOnInit(): void {
        this.fetchFromWebcal();
    }

    fetchFromWebcal() {

        fetch(this.url)
            .then(res => {
                res.json().then(data => {
                    if (Array.isArray(data)) {
                        data.forEach((d: any) => {
                            this.teams.push({
                                name: d.name,
                                url: d.url,
                                events: ical.parseString(d.data).events,
                                show: true
                            })
                        })

                        this.createTableData();
                    }
                })
            })
            .catch(err => {
                this.fetchError.status = true;
                this.fetchError.message.title = "Fehler beim Laden der Daten:";
                this.fetchError.message.text = err;
            })
    }

    createTableData() {

        let matchTable: MatchDayEventsByTeam[] = [];

        for (let currentDate = new Date(this.startDate);
            currentDate <= this.endDate;
            currentDate.setDate(currentDate.getDate() + 1)) {
            let teamDataAtDate: { name: string, events: IcalEvent[] }[] = [];
            let dataForCurrentDate = {
                date: new Date(currentDate),
                teams: teamDataAtDate
            };



            this.teams.filter(team => team.show).forEach(team => {

                let matchesForTeamAtDate: IcalEvent[] = [];

                teamDataAtDate.push({
                    name: team.name,
                    events: matchesForTeamAtDate
                })

                team.events.forEach(event => {
                    const datePlusOne = new Date(currentDate);
                    datePlusOne.setDate(datePlusOne.getDate() + 1);

                    if (event.dtstart.value >= currentDate && event.dtstart.value < datePlusOne) {
                        const homeTeam = event.summary.value.split(':')[0];
                        const isHomeTeam =
                            homeTeam.toLowerCase().includes('schwarzach') ||
                            homeTeam.toLowerCase().includes('hofsteig');

                        if ((isHomeTeam && this.showHome) || (!isHomeTeam && this.showAway)) {
                            matchesForTeamAtDate.push(event);
                        }
                    }
                })
            })

            let dateHasMatch = false;
            dataForCurrentDate.teams.forEach(team => {
                if (team.events.length > 0) {
                    dateHasMatch = true;
                }
            })

            if (dateHasMatch) matchTable.push(dataForCurrentDate);
        }

        this.matchTable = matchTable;
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

    changeDate(key: keyof this, event: any) {
        const value = event.target.valueAsDate;

        if (value) {
            this[key] = value;

            (this[key] as unknown as Date).setHours?.(0, 0, 0, 0);

            this.createTableData();
        };
    }

    toggleTeam(teamName: string, event: any) {
        const teamToToggle = this.teams.find(t => t.name === teamName);
        if (teamToToggle) {
            teamToToggle.show = event.target.checked;
            this.createTableData();
        }
    }

    toggleAllTeams() {
        let changeCheckedTo = this.teams.filter(t => t.show).length !== this.teams.length;

        this.teams.forEach(t => t.show = changeCheckedTo);

        this.createTableData();
    }
}
