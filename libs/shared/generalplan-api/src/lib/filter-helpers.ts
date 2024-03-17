import { IcalEvent, TeamData } from "@fcschwarzach/shared-generalplan-api";

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

export function getFilterPlaces(): { [key: string]: PlaceFilter } {
    return {
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
            stringToMatch: '',
            show: true
        }
    }
}

export function filterAbgesagt(event: IcalEvent): boolean {
    return !event.summary.value.toLowerCase().includes('abgesagt');
}

export function filterPlaces(event: IcalEvent, filters: Filters): boolean {
    const eventLocationLowerCase = event.location?.value.toLowerCase() ?? '';

    if (eventLocationLowerCase.includes(filters.places['schwarzach'].stringToMatch)) {
        return filters.places['schwarzach'].show;
    }
    if (eventLocationLowerCase.includes(filters.places['wolfurt'].stringToMatch)) {
        return filters.places['wolfurt'].show;
    }
    if (eventLocationLowerCase.includes(filters.places['kennelbach'].stringToMatch)) {
        return filters.places['kennelbach'].show;
    }

    if (!eventLocationLowerCase.includes(filters.places['schwarzach'].stringToMatch) &&
        !eventLocationLowerCase.includes(filters.places['wolfurt'].stringToMatch) &&
        !eventLocationLowerCase.includes(filters.places['kennelbach'].stringToMatch)) {
        return filters.places['rest'].show;
    }

    return true;
}

export function setFilterStartAndEndDate(filters: Filters) {
    // set startdate and enddate to first or second half of the year
    const today = new Date();
    if (today.getMonth() < 6) {
        filters.startDate = new Date(`${today.getFullYear()}-01-01`);
        filters.endDate = new Date(`${today.getFullYear()}-06-30`);
    }
    else {
        filters.startDate = new Date(`${today.getFullYear()}-07-01`);
        filters.endDate = new Date(`${today.getFullYear()}-12-31`);
    }

    filters.startDate.setHours(0, 0, 0, 0);
    filters.endDate.setHours(0, 0, 0, 0);
}

export function setDefaultTeamsUiFilterState(teams: TeamData[], filters: Filters) {
    teams.forEach(t => filters.teamsUiState.set(t, { show: true }))
}

export function checkHomeAwayFilter(homeTeam: string, filters: Filters, onSuccess: () => void) {
    const isHomeTeam =
        homeTeam.toLowerCase().includes('schwarzach') ||
        homeTeam.toLowerCase().includes('hofsteig');

    if ((isHomeTeam && filters.showHome) || (!isHomeTeam && filters.showAway)) {
        onSuccess();
    }
}