import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { TeamData } from 'src/app/model/generalplan.model';
import { TimeDetails, WeeklyEvent } from 'src/app/model/weekly-event.model';


export interface DayEntry {
    date: Date,
    events: EventDetail[],
}

export enum EventType {
    oneTime,
    repeating
}

export interface EventDetail {
    name: string,
    timeDetail: TimeDetails,
    type: EventType
}




@Component({
    selector: 'app-weekplan',
    templateUrl: './weekplan.component.html',
    styleUrls: ['./weekplan.component.scss']
})
export class WeekplanComponent implements OnInit {

    eventType = EventType;

    currentWeek: DayEntry[] = [];

    firstDayOfSelectedWeek: Date = new Date();

    teams: TeamData[] | undefined;
    events: WeeklyEvent[] | undefined;

    loading = true;
    fetchError = {
        status: false,
        message: {
            title: '',
            text: ''
        }
    }

    constructor(private apiService: ApiService) {
        this.resetToCurrentWeek();
    }

    ngOnInit(): void {
        this.apiService.getGeneralplanData()
            .then(data => {
                this.teams = data;
                this.loading = false;

                this.createTableData();
            })
            .catch(err => {
                this.loading = false;

                this.fetchError.status = true;
                this.fetchError.message.title = "Fehler beim Laden der Daten:";
                this.fetchError.message.text = err;
            })

        this.apiService.getWeeklyEvents()
            .then(data => {
                this.events = data;
                this.loading = false;

                this.createTableData();
            })
            .catch(err => {
                this.loading = false;

                this.fetchError.status = true;
                this.fetchError.message.title = "Fehler beim Laden der Daten:";
                this.fetchError.message.text = err;
            })

    }

    resetToCurrentWeek() {
        const today = new Date();

        const firstDayOfCurrentWeek = new Date();

        let diffToFirstDayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1; //sunday is the first day of the week with index 0, but we want monday as the first day

        firstDayOfCurrentWeek.setDate(today.getDate() - diffToFirstDayOfWeek);
        firstDayOfCurrentWeek.setHours(0, 0, 0, 0); // set time to 00:00 midnight

        this.firstDayOfSelectedWeek = firstDayOfCurrentWeek;
    }

    onResetToCurrentWeek() {
        this.resetToCurrentWeek();
        this.createTableData();
    }

    previousWeek() {
        this.firstDayOfSelectedWeek.setDate(this.firstDayOfSelectedWeek.getDate() - 7);
        this.firstDayOfSelectedWeek = new Date(this.firstDayOfSelectedWeek); //create new reference to reload template
        this.createTableData();
    }

    nextWeek() {
        this.firstDayOfSelectedWeek.setDate(this.firstDayOfSelectedWeek.getDate() + 7);
        this.firstDayOfSelectedWeek = new Date(this.firstDayOfSelectedWeek); //create new reference to reload template
        this.createTableData();
    }

    createTableData() {
        this.currentWeek = [];

        for (let index = 0; index < 7; index++) {
            const currentDay = new Date(this.firstDayOfSelectedWeek);
            currentDay.setDate(currentDay.getDate() + index);

            this.currentWeek.push({
                date: currentDay,
                events: []
            });
        }


        this.currentWeek.forEach(dayEvent => {
            const eventsAtDay: EventDetail[] = []

            if (this.events) {
                this.events.forEach(event => {
                    event.timeDetails
                        .filter(timeDetail => timeDetail.day === dayEvent.date.getDay()) // check if day matches
                        .forEach(timeDetail => {
                            eventsAtDay.push({
                                name: event.name,
                                timeDetail,
                                type: EventType.repeating
                            })
                        })
                })
            }


            if (this.teams) {
                this.teams.forEach(team => {
                    team.events
                        .filter(event => {
                            const datePlusOne = new Date(dayEvent.date);
                            datePlusOne.setDate(datePlusOne.getDate() + 1);

                            // check if event date is within start/end range
                            return event.dtstart.value >= dayEvent.date && event.dtstart.value < datePlusOne
                        })
                        .forEach(event => {
                            const timeDetail: TimeDetails = {
                                day: event.dtstart.value.getDay(),
                                durationInMin: -1,
                                location: event.location.value,
                                startTime: {
                                    hour: (event.dtstart.value.getHours().toString().length < 2 ? '0' : '') + event.dtstart.value.getHours().toString(),
                                    minute: (event.dtstart.value.getMinutes().toString().length < 2 ? '0' : '') + event.dtstart.value.getMinutes().toString()
                                }
                            }

                            eventsAtDay.push({
                                name: `${team.name}: ${event.summary.value} (${event.description.value})`,
                                timeDetail,
                                type: EventType.oneTime
                            })
                        })
                })
            }

            dayEvent.events = [...eventsAtDay];
            dayEvent.events.sort((a, b) => {
                if (Number.parseInt(a.timeDetail.startTime.hour) < Number.parseInt(b.timeDetail.startTime.hour)) return -1;
                if (Number.parseInt(a.timeDetail.startTime.hour) > Number.parseInt(b.timeDetail.startTime.hour)) return 1;

                if (Number.parseInt(a.timeDetail.startTime.hour) === Number.parseInt(b.timeDetail.startTime.hour)) {
                    return Number.parseInt(a.timeDetail.startTime.minute) < Number.parseInt(b.timeDetail.startTime.minute) ? -1 : 1;
                }

                return 1;
            })
        })
    }
}
