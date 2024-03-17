import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../app/api/api.service';
import { TimeDetails, WeeklyEvent } from '../../../../app/model/weekly-event.model';

@Component({
    selector: 'app-edit-weekly-events',
    templateUrl: './edit-weekly-events.component.html',
    styleUrls: ['./edit-weekly-events.component.scss']
})
export class EditWeeklyEventsComponent implements OnInit {

    events: WeeklyEvent[] | undefined;
    selectedEvent: WeeklyEvent | undefined;

    newEventName = '';
    showDeleteEventModal = false;

    showAddEventModal = false;
    addEventName = '';

    dirtyTimeDetails: TimeDetails[] = [];

    timeDetailToDelete: TimeDetails | undefined;

    newTimeDetail: TimeDetails | undefined;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getWeeklyEvents()
            .then(data => {
                this.events = data;
                this.selectedEvent = this.events[0];
                this.onChangeSelectedEvent();
            })
            .catch(err => {
                alert(err);
            })
    }

    changeEventName(event: any) {
        const value = event.target.value;
        this.newEventName = value;
    }

    onChangeSelectedEvent() {
        this.dirtyTimeDetails =
            this.selectedEvent ?
                this.selectedEvent.timeDetails.map(detail => Object.assign({}, detail))
                : [];
    }

    onDeleteEvent() {
        this.showDeleteEventModal = true;
    }

    onCloseDeleteEventModal(confirm: boolean) {
        if (!confirm || !this.selectedEvent || !this.events) {
            this.showDeleteEventModal = false;
        }
        else {
            const eventToDelete = this.selectedEvent;
            this.apiService.deleteWeeklyEvent(eventToDelete.id)
                .then(() => {
                    const index = this.events?.indexOf(eventToDelete);
                    if (index !== undefined && index > -1) {
                        this.events?.splice(index, 1);
                    }

                    this.selectedEvent = undefined;
                    this.showDeleteEventModal = false;
                })
                .catch(() => {
                    alert('An error has occurred!');
                    this.showDeleteEventModal = false;
                })
        }
    }

    addEvent() {
        if (this.addEventName.length > 0) {
            this.apiService.insertWeeklyEvent(this.addEventName)
                .then(team => {
                    alert('Hinzufügen erfolgreich!');

                    this.events?.push(team);
                    this.showAddEventModal = false;
                })
                .catch(() => {
                    alert('An error has occurred!');
                    this.showDeleteEventModal = false;
                })
        }
    }

    onCloseDeleteTimeDetailModal(confirm: boolean) {
        if (!confirm || !this.timeDetailToDelete) {
            this.timeDetailToDelete = undefined;
        }
        else {
            const timeDetailToDelete = this.timeDetailToDelete;
            this.apiService.deleteWeeklyTimeDetail(timeDetailToDelete.id)
                .then(() => {
                    const index = this.dirtyTimeDetails?.indexOf(timeDetailToDelete);
                    if (index !== undefined && index > -1) {
                        this.selectedEvent?.timeDetails.splice(index, 1);
                        this.dirtyTimeDetails.splice(index, 1);
                    }

                    this.timeDetailToDelete = undefined;
                })
                .catch(() => {
                    alert('An error has occurred!');
                    this.timeDetailToDelete = undefined;
                })
        }
    }

    updateEvent() {
        if (this.newEventName.length > 0 && this.selectedEvent) {
            this.apiService.updateWeeklyEvent(this.selectedEvent.id, this.newEventName)
                .then(() => {
                    alert('Speichern erfolgreich!');
                    if (this.selectedEvent) {
                        this.selectedEvent.name = this.newEventName;
                    }
                })
        }
    }

    checkTimeDetailsValid(detail: TimeDetails) {
        if (this.selectedEvent) {
            const index = this.dirtyTimeDetails?.indexOf(detail);
            const originalDetail = this.selectedEvent.timeDetails[index];

            return JSON.stringify(detail) === JSON.stringify(originalDetail);
        }

        return false;
    }

    updateTimeDetail(detail: TimeDetails) {
        this.apiService.updateTimeDetail(detail)
            .then(() => {
                alert('Speichern erfolgreich!');
                const index = this.dirtyTimeDetails.indexOf(detail);
                if (index > -1) {
                    if (this.selectedEvent) this.selectedEvent.timeDetails[index] = detail;
                }
            })
    }

    showAddTimeDetail() {
        if (this.selectedEvent) {
            this.newTimeDetail = {
                id: '', //will be set after API response
                durationInMin: '90',
                location: 'Fußballplatz Schwarzach',
                startTimeHour: '18',
                startTimeMinute: '00',
                day: '1',
                weeklyEventid: this.selectedEvent.id
            }
        }
    }

    addTimeDetail() {
        if (this.newTimeDetail) {
            this.apiService.insertTimeDetail(this.newTimeDetail)
                .then(timeDetail => {
                    alert('Hinzufügen erfolgreich!');

                    this.selectedEvent?.timeDetails.push(timeDetail);
                    this.dirtyTimeDetails.push(timeDetail);

                    this.newTimeDetail = undefined;
                })
                .catch(() => {
                    alert('An error has occurred!');
                    this.newTimeDetail = undefined;
                })
        }
    }
}
