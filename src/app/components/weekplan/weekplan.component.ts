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

class LoadingTask {
    private complete = false;

    get finished(): boolean {
        return this.complete;
    }

    finish() {
        this.complete = true;
    }
}

class LoadingProgress {
    loadingTasks: LoadingTask[] = [];
    completeTasks: LoadingTask[] = [];

    createTask() {
        const newTask = new LoadingTask();
        this.loadingTasks.push(newTask);
        return newTask;
    }

    completeLoadingTask(toComplete: LoadingTask) {
        toComplete.finish();
        this.loadingTasks = this.loadingTasks.filter(task => !task.finished);
        this.completeTasks.push(toComplete);
    }
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

    loadingProgress = new LoadingProgress();


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
        const generalplanLoading = this.loadingProgress.createTask();

        this.apiService.getGeneralplanData()
            .then(data => {
                this.teams = data;
                this.loadingProgress.completeLoadingTask(generalplanLoading);

                this.createTableData();
            })
            .catch(err => {
                generalplanLoading.finish();

                this.fetchError.status = true;
                this.fetchError.message.title = "Fehler beim Laden der Daten:";
                this.fetchError.message.text = err;
            })



        const weeklyLoading = this.loadingProgress.createTask();

        this.apiService.getWeeklyEvents()
            .then(data => {
                this.events = data;

                console.log('GOT DATA', this.events);

                this.loadingProgress.completeLoadingTask(weeklyLoading);

                this.createTableData();
            })
            .catch(err => {
                weeklyLoading.finish();

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
                        .filter(timeDetail => Number.parseInt(timeDetail.day) === dayEvent.date.getDay()) // check if day matches
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
                                id: '',
                                weeklyEventId: '',
                                day: event.dtstart.value.getDay().toString(),
                                durationInMin: '',
                                location: event.location.value,
                                startTimeHour: (event.dtstart.value.getHours().toString().length < 2 ? '0' : '') + event.dtstart.value.getHours().toString(),
                                startTimeMinute: (event.dtstart.value.getMinutes().toString().length < 2 ? '0' : '') + event.dtstart.value.getMinutes().toString()
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
                if (Number.parseInt(a.timeDetail.startTimeHour) < Number.parseInt(b.timeDetail.startTimeHour)) return -1;
                if (Number.parseInt(a.timeDetail.startTimeHour) > Number.parseInt(b.timeDetail.startTimeHour)) return 1;

                if (Number.parseInt(a.timeDetail.startTimeHour) === Number.parseInt(b.timeDetail.startTimeHour)) {
                    return Number.parseInt(a.timeDetail.startTimeMinute) < Number.parseInt(b.timeDetail.startTimeMinute) ? -1 : 1;
                }

                return 1;
            })
        })
    }
}
