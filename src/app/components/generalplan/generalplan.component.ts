import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as ical from 'cal-parser';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

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

    places = {
        schwarzach: {
            label: "Schwarzach",
            stringToMatch: 'schwarzach',
            show: true
        },
        wolfurt: {
            label: "Wolfurt",
            stringToMatch: 'wolfurt',
            show: true
        },
        kennelbach: {
            label: "Kennelbach",
            stringToMatch: 'kennelbach',
            show: true
        },
        rest: {
            label: "Andere",
            show: true
        }
    }

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

                        // wait until loading of the UI has finished
                        setTimeout(() => {
                            this.navigateToCurrentDate();
                        }, 500);
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

                team.events
                    .filter(event => this.filterPlaces(event)) // check if place of event is toggled on
                    .forEach(event => {
                        const datePlusOne = new Date(currentDate);
                        datePlusOne.setDate(datePlusOne.getDate() + 1);

                        // check if event date is within start/end range
                        if (event.dtstart.value >= currentDate && event.dtstart.value < datePlusOne) {

                            // check if schwarzach/wolfurt team is the home team
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

    filterPlaces(event: IcalEvent): boolean {
        const eventLocationLowerCase = event.location.value.toLowerCase();

        if (eventLocationLowerCase.includes(this.places.schwarzach.stringToMatch)) {
            return this.places.schwarzach.show;
        }
        if (eventLocationLowerCase.includes(this.places.wolfurt.stringToMatch)) {
            return this.places.wolfurt.show;
        }
        if (eventLocationLowerCase.includes(this.places.kennelbach.stringToMatch)) {
            return this.places.kennelbach.show;
        }

        if (!eventLocationLowerCase.includes(this.places.schwarzach.stringToMatch) &&
            !eventLocationLowerCase.includes(this.places.wolfurt.stringToMatch) &&
            !eventLocationLowerCase.includes(this.places.kennelbach.stringToMatch)) {
            return this.places.rest.show;
        }

        return true;
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

    navigateToCurrentDate() {
        if (this.matchTable.length > 0) {
            let currentDate = new Date();
            let indexToMoveTo = -1;


            while (indexToMoveTo < 0 && currentDate <= this.endDate) {
                this.matchTable.forEach((matchday, index) => {
                    if (currentDate.toDateString() === matchday.date.toDateString()) {
                        indexToMoveTo = index;
                    }
                })

                currentDate.setDate(currentDate.getDate() + 1)
            }

            document.getElementById("row-" + indexToMoveTo)?.scrollIntoView({ block: 'center', inline: 'start', behavior: 'smooth' })
        }

    }

    exportExcel() {
        const dataToExport: any[] = [];

        dataToExport.push([undefined, ...this.teams.filter(t => t.show).map(t => t.name)]);

        this.matchTable.forEach(atDate => {
            const pipe = new DatePipe('en-US');

            const line1 = [];
            const line2 = [];
            const line3 = [];

            line1.push(atDate.date);
            line2.push(undefined);
            line3.push(undefined);

            line1.push(...atDate.teams.map(team => team.events[0]?.summary.value));
            line2.push(...atDate.teams.map(team => {
                const date = team.events[0]?.dtstart.value;

                return pipe.transform(date, 'HH:mm');
            }));
            line3.push(...atDate.teams.map(team => team.events[0]?.location.value));

            dataToExport.push(line1, line2, line3);
        });

        const worksheet = xlsx.utils.json_to_sheet(dataToExport);
        const workbook: xlsx.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        // set column witdth
        const wscols = [
            { wch: 10 },
            ...this.teams.filter(t => t.show).map(t => { return { wch: 60 } })
        ];

        worksheet['!cols'] = wscols;

        const buffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;" });
        saveAs(blob, "matchdates.xlsx");
    }
}
