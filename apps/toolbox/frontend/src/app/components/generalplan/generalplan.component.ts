import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IcalEvent, MatchDayEventsByTeam, TeamData } from '../../../app/model/generalplan.model';
import { ApiService } from '../../../app/api/api.service';


@Component({
    selector: 'app-generalplan',
    templateUrl: './generalplan.component.html',
    styleUrls: ['./generalplan.component.scss']
})
export class GeneralplanComponent implements OnInit {
    eventsByTeams: { name: string, events: any }[] = [];

    teams: TeamData[] = [];
    teamsUiState = new Map<TeamData, { show: boolean }>();

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

    constructor(private apiService: ApiService) {
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
        this.apiService.getGeneralplanData()
            .then(data => {
                this.teams = data;

                data.forEach(t => this.teamsUiState.set(t, { show: true }))

                this.createTableData();

                // wait until loading of the UI has finished
                setTimeout(() => {
                    this.navigateToCurrentDate();
                }, 500);
            })
            .catch(err => {
                this.fetchError.status = true;
                this.fetchError.message.title = "Fehler beim Laden der Daten:";
                this.fetchError.message.text = err;
            })
    }

    createTableData() {

        const matchTable: MatchDayEventsByTeam[] = [];

        for (let currentDate = new Date(this.startDate);
            currentDate <= this.endDate;
            currentDate.setDate(currentDate.getDate() + 1)) {
            const teamDataAtDate: { name: string, events: IcalEvent[] }[] = [];
            const dataForCurrentDate = {
                date: new Date(currentDate),
                teams: teamDataAtDate
            };



            this.teams.filter(team => this.teamsUiState.get(team)?.show).forEach(team => {

                const matchesForTeamAtDate: IcalEvent[] = [];

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
            const teamUiState = this.teamsUiState.get(teamToToggle);
            if (teamUiState) teamUiState.show = event.target.checked;

            this.createTableData();
        }
    }

    toggleAllTeams() {
        const changeCheckedTo = this.teams.filter(t => this.teamsUiState.get(t)?.show).length !== this.teams.length;

        this.teams.forEach(t => {
            const teamUiState = this.teamsUiState.get(t);
            if (teamUiState) teamUiState.show = changeCheckedTo;
        });

        this.createTableData();
    }

    navigateToCurrentDate() {
        if (this.matchTable.length > 0) {
            const currentDate = new Date();
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
}
