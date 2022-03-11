import * as ical from 'node-ical';
import { fetch } from './dynamicFetchImport';
import { Team } from "./teams";

export function fetchFromWebcal(
    teams: Team[],
    index: number,
    eventsByTeams,
    createTable: (eventsByTeams, startDate: Date, endDate: Date, resolve, reject) => void,
    startDate: Date,
    endDate: Date,
    resolve,
    reject) {
    const url = teams[index].url.replace('webcal://', 'http://');

    console.log('Team: ', teams[index].name);
    console.log('Fetch from ' + url);
    console.log();

    fetch(url)
        .then((res) => {
            res.text().then(data => {
                eventsByTeams.push({
                    name: teams[index].name,
                    events: readAndSortIcalData(data)
                });
                index++;

                if (index >= teams.length) {
                    createTable(eventsByTeams, startDate, endDate, resolve, reject);
                }
                else {
                    fetchFromWebcal(teams, index, eventsByTeams, createTable, startDate, endDate, resolve, reject);
                }
            });
        })
}

function readAndSortIcalData(data) {
    const directEvents = ical.sync.parseICS(data);
    return Object.values(directEvents).sort((v1, v2) => v1.start > v2.start ? 1 : -1);
}