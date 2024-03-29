export interface TimeDetails {
    id: string,
    weeklyEventid: string,
    day: string,
    startTimeHour: string,
    startTimeMinute: string,
    durationInMin: string,
    location: string
}

export interface WeeklyEvent {
    id: string,
    name: string,
    timeDetails: TimeDetails[],
}