import * as ical from 'node-ical';
import { fetch } from './dynamicFetchImport';

export function fetchFromWebcal(
    createTable: (eventsByTeams, startDate: Date, endDate: Date, resolve, reject) => void,
    startDate: Date,
    endDate: Date,
    resolve,
    reject) {

    const url = 'https://fcschwarzach.com/api/generalplan';

    console.log('Fetch from ' + url);
    console.log();

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    const teams = [];

                    if (Array.isArray(data)) {
                        data.forEach((d: any) => {
                            teams.push({
                                name: d.name,
                                url: d.url,
                                events: readAndSortIcalData(d.data)
                            })
                        })
                        createTable(teams, startDate, endDate, resolve, reject);

                    }
                    else {
                        console.log('Cannot parse data!');
                        resolve();
                    }
                })
            }
            else {
                console.log('An unexpected Error occurred');
                resolve();
            }
        })
        .catch(err => {
            console.log(err);
            reject();
        })
}

function readAndSortIcalData(data) {
    const directEvents = ical.sync.parseICS(data);
    return Object.values(directEvents).sort((v1, v2) => v1.start > v2.start ? 1 : -1);
}