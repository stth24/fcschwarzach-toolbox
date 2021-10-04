import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

// const ical = require('cal-parser'); // use require as we do not have a @types declaration

import * as ical from 'cal-parser';

interface IcalEventValue<T> {
    value: T
}

interface IcalEvent {
    dtstart: IcalEventValue<Date>,
    location: IcalEventValue<string>,
    summary: IcalEventValue<string>,
    url: IcalEventValue<string>,
    description: IcalEventValue<string>
}

@Component({
    selector: 'app-generalplan',
    templateUrl: './generalplan.component.html',
    styleUrls: ['./generalplan.component.scss']
})
export class GeneralplanComponent implements OnInit {
    eventsByTeams: { name: string, events: any }[] = [];

    teams: { name: string, url: string, events: IcalEvent[] }[] = [];

    url = '/api/generalplan/';
    // url = 'http://localhost/api/generalplan';

    constructor() { }

    ngOnInit(): void {
        this.fetchFromWebcal();
    }

    fetchFromWebcal() {

        fetch(this.url)
            // fetch("http://fcschwarzach.com/api/generalplan/")
            .then(res => {
                res.json().then(data => {
                    if (Array.isArray(data)) {
                        data.forEach((d: any) => {
                            this.teams.push({
                                name: d.name,
                                url: d.url,
                                events: ical.parseString(d.data).events
                            })
                        })
                    }

                    console.log(this.teams);
                })
            })
    }

    // readAndSortIcalData(data: any) {
    //     const directEvents = sync.parseICS(data);
    //     return Object.values(directEvents).sort((v1: any, v2: any) => v1.start > v2.start ? 1 : -1);
    // }

}
