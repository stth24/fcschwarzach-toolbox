export interface TimeDetails {
    day: number,
    startTime: {
        hour: string,
        minute: string
    }
    durationInMin: number,
    location: string
}

export interface WeeklyEvent {
    name: string,
    timeDetails: TimeDetails[],
}