import * as exceljs from 'exceljs';
import * as path from 'path';
import { fetchFromWebcal } from './fetchFromWebcal';

function createTable(teamEvents, startDate: Date, endDate: Date, resolve, reject) {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Spielplan');

    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {

        teamEvents.forEach(team => {
            team.events.forEach(event => {
                const matchData = []
                const datePlusOne = new Date(currentDate);
                datePlusOne.setDate(datePlusOne.getDate() + 1);

                if (event.start >= currentDate && event.start < datePlusOne) {
                    matchData.push(event.summary);

                    const timeString =
                        (event.start.getHours().toString().length === 1 ? '0' : '') +
                        event.start.getHours() +
                        ':' +
                        (event.start.getMinutes().toString().length === 1 ? '0' : '') +
                        event.start.getMinutes();
                    matchData.push(timeString);
                    matchData.push(event.location);

                    console.log('Added Event:', new Date(new Date(currentDate).setHours(currentDate.getHours() + 2)), event.summary, timeString);

                    const rowData = [new Date(new Date(currentDate).setHours(currentDate.getHours() + 2))];

                    if (matchData.length > 0 && event.location.includes('Schwarzach')) {
                        rowData.push(...matchData);

                        worksheet.addRow(rowData);
                    }
                }
            });
        })
    }


    const savePath = './dist/apps/generalplan/matches_simple.xlsx';

    workbook.xlsx.writeFile(savePath)
        .then(() => {
            console.log('FILE SUCCESSFULLY WRITTEN');
            console.log('File saved here: ' + path.resolve(savePath));
            // finishAndExit();
            resolve();
        })
        .catch(err => {
            console.error('File could not be written!')
            console.error(err);
            reject();
        })
}


export function createSimpleHomePlan(startDate: Date, endDate: Date) {
    return new Promise<void>((resolve, reject) => {
        fetchFromWebcal(createTable, startDate, endDate, resolve, reject);
    })
}