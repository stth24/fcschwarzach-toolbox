import * as ical from 'node-ical';
import { TeamData } from '../model/team.model';
import { fetch } from './dynamicFetchImport';


export function fetchTeamDataFromApi() {

    const url = 'https://fcschwarzach.com/api/generalplan';

    console.log('Fetch from ' + url);
    console.log();

    return new Promise<TeamData[]>((resolve, reject) => {
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        const teams: TeamData[] = [];

                        if (Array.isArray(data)) {
                            data.forEach((d: any) => {
                                teams.push({
                                    name: d.name,
                                    url: d.url,
                                    events: readAndSortIcalData(d.data)
                                })
                            })
                            resolve(teams);
                        }
                        else {
                            reject('Cannot parse data!');
                        }
                    })
                }
                else {
                    reject('An unexpected Error occurred');
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}

function readAndSortIcalData(data) {
    const directEvents = ical.sync.parseICS(data);
    return Object.values(directEvents).sort((v1, v2) => v1.start > v2.start ? 1 : -1);
}