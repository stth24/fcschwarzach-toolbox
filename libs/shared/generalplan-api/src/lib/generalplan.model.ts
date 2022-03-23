export interface IcalEventValue<T> {
    value: T
}

export interface IcalEvent {
    dtstart: IcalEventValue<Date>,
    location: IcalEventValue<string>,
    summary: IcalEventValue<string>,
    url: IcalEventValue<string>,
    description: IcalEventValue<string>
}

export interface TeamData {
    name: string,
    url: string,
    events: IcalEvent[]
}

export interface MatchDayTeamData {
    name: string,
    events: IcalEvent[]
}

export interface MatchDayEventsByTeam {
    date: Date,
    teams: MatchDayTeamData[]
}