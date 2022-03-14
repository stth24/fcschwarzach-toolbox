import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../app/api/api.service';
import { IcalEvent, MatchDayEventsByTeam, TeamData } from '../../../app/model/generalplan.model';
import { environment } from '../../../environments/environment';
import { checkHomeAwayFilter, filterPlaces, getFilterPlaces, setDefaultTeamsUiFilterState, setFilterStartAndEndDate } from '../ui-components/match-filters/filter-helpers';
import { Filters } from '../ui-components/match-filters/match-filters.component';

@Component({
    selector: 'app-generalplan',
    templateUrl: './generalplan.component.html',
    styleUrls: ['./generalplan.component.scss']
})
export class GeneralplanComponent implements OnInit {
    eventsByTeams: { name: string, events: any }[] = [];

    teams: TeamData[] = [];


    matchTable: MatchDayEventsByTeam[] = [];

    url = environment.production ?
        '/api/generalplan/' :
        'http://localhost/api/generalplan';

    showFilters = false;

    filters: Filters = {
        startDate: new Date(),
        endDate: new Date(),
        showHome: true,
        showAway: true,
        places: getFilterPlaces(),
        teamsUiState: new Map<TeamData, { show: boolean }>()
    }

    fetchError = {
        status: false,
        message: {
            title: '',
            text: ''
        }
    }

    constructor(private apiService: ApiService) {
        setFilterStartAndEndDate(this.filters);
    }

    ngOnInit(): void {
        this.fetchFromWebcal();
    }

    fetchFromWebcal() {
        this.apiService.getGeneralplanData()
            .then(data => {
                this.teams = data;

                setDefaultTeamsUiFilterState(this.teams, this.filters);

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

        for (let currentDate = new Date(this.filters.startDate);
            currentDate <= this.filters.endDate;
            currentDate.setDate(currentDate.getDate() + 1)) {
            const teamDataAtDate: { name: string, events: IcalEvent[] }[] = [];
            const dataForCurrentDate = {
                date: new Date(currentDate),
                teams: teamDataAtDate
            };



            this.teams
                .filter(team => this.filters.teamsUiState.get(team)?.show)
                .forEach(team => {

                    const matchesForTeamAtDate: IcalEvent[] = [];

                    teamDataAtDate.push({
                        name: team.name,
                        events: matchesForTeamAtDate
                    })

                    team.events
                        .filter(event => filterPlaces(event, this.filters)) // check if place of event is toggled on
                        .forEach(event => {
                            const datePlusOne = new Date(currentDate);
                            datePlusOne.setDate(datePlusOne.getDate() + 1);

                            // check if event date is within start/end range
                            if (event.dtstart.value >= currentDate && event.dtstart.value < datePlusOne) {

                                // check if schwarzach/wolfurt team is the home team
                                const homeTeam = event.summary.value.split(':')[0];
                                checkHomeAwayFilter(
                                    homeTeam,
                                    this.filters,
                                    () => matchesForTeamAtDate.push(event)
                                );
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

    navigateToCurrentDate() {
        if (this.matchTable.length > 0) {
            const currentDate = new Date();
            let indexToMoveTo = -1;


            while (indexToMoveTo < 0 && currentDate <= this.filters.endDate) {
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
