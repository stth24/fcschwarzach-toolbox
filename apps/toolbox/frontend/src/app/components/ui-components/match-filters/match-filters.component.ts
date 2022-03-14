import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IcalEvent, TeamData } from '../../../model/generalplan.model';

export interface PlaceFilter {
    label: string,
    stringToMatch: string,
    show: boolean
}

export interface Filters {
    startDate: Date,
    endDate: Date,
    showHome: boolean,
    showAway: boolean,
    places: {
        [key: string]: PlaceFilter
    },
    teamsUiState: Map<TeamData, { show: boolean }>
}

@Component({
    selector: 'app-match-filters',
    templateUrl: './match-filters.component.html',
    styleUrls: ['./match-filters.component.scss']
})
export class MatchFiltersComponent {

    @Input() showFilters = false;
    @Input() showDateFilters = true;
    @Input() filters: Filters = {
        endDate: new Date(),
        startDate: new Date(),
        showAway: true,
        showHome: true,
        places: {},
        teamsUiState: new Map()
    };
    @Input() teams: TeamData[] = [];

    @Output() updatedFilters = new EventEmitter<void>();

    keepOriginalOrder(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
        return -1;
    }

    filterPlaces(event: IcalEvent): boolean {
        const eventLocationLowerCase = event.location.value.toLowerCase();

        if (eventLocationLowerCase.includes(this.filters.places['schwarzach'].stringToMatch)) {
            return this.filters.places['schwarzach'].show;
        }
        if (eventLocationLowerCase.includes(this.filters.places['wolfurt'].stringToMatch)) {
            return this.filters.places['wolfurt'].show;
        }
        if (eventLocationLowerCase.includes(this.filters.places['kennelbach'].stringToMatch)) {
            return this.filters.places['kennelbach'].show;
        }

        if (!eventLocationLowerCase.includes(this.filters.places['schwarzach'].stringToMatch) &&
            !eventLocationLowerCase.includes(this.filters.places['wolfurt'].stringToMatch) &&
            !eventLocationLowerCase.includes(this.filters.places['kennelbach'].stringToMatch)) {
            return this.filters.places['rest'].show;
        }

        return true;
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

    changeDate(key: keyof Filters, event: any) {
        const value = event.target.valueAsDate;

        if (value) {
            this.filters[key] = value;

            (this.filters[key] as unknown as Date).setHours?.(0, 0, 0, 0);

            this.updatedFilters.emit();
        };
    }

    toggleTeam(teamName: string, event: any) {
        const teamToToggle = this.teams.find(t => t.name === teamName);
        if (teamToToggle) {
            const teamUiState = this.filters.teamsUiState.get(teamToToggle);
            if (teamUiState) teamUiState.show = event.target.checked;

            this.updatedFilters.emit();
        }
    }

    toggleAllTeams() {
        const changeCheckedTo = this.teams.filter(t => this.filters.teamsUiState.get(t)?.show).length !== this.teams.length;

        this.teams.forEach(t => {
            const teamUiState = this.filters.teamsUiState.get(t);
            if (teamUiState) teamUiState.show = changeCheckedTo;
        });

        this.updatedFilters.emit();
    }

}
