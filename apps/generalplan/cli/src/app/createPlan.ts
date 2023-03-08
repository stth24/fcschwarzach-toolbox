import * as exceljs from 'exceljs';
import * as path from 'path';
import { TeamData } from './model/team.model';

export function createPlan(teamEvents: TeamData[], startDate: Date, endDate: Date, outputPath: string) {
    return new Promise<void>((resolve, reject) => {
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Spielplan');

        const firstRowValues = [''];
        teamEvents.forEach(t => {
            firstRowValues.push(t.name);
            firstRowValues.push('');
            firstRowValues.push('');
        })

        worksheet.addRow(firstRowValues);

        for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            const matches = []

            teamEvents.forEach(team => {
                let teamHasMatch = false;

                team.events.forEach(event => {
                    const datePlusOne = new Date(currentDate);
                    datePlusOne.setDate(datePlusOne.getDate() + 1);

                    if (event.start >= currentDate && event.start < datePlusOne) {
                        matches.push(event.summary);

                        const timeString =
                            (event.start.getHours().toString().length === 1 ? '0' : '') +
                            event.start.getHours() +
                            ':' +
                            (event.start.getMinutes().toString().length === 1 ? '0' : '') +
                            event.start.getMinutes();
                        matches.push(timeString);
                        matches.push(event.location);
                        teamHasMatch = true;

                        console.log('Added Event:', new Date(new Date(currentDate).setHours(currentDate.getHours() + 2)), event.summary, timeString);
                    }
                });

                if (!teamHasMatch) {
                    matches.push('');
                    matches.push('');
                    matches.push('');
                }
            })

            const rowData = [new Date(new Date(currentDate).setHours(currentDate.getHours() + 2))];

            if (matches.length > 0) {
                rowData.push(...matches);
            }

            const row = worksheet.addRow(rowData);

            if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: "ccff99"
                    },
                    bgColor: { argb: 'ccff99' }
                }
            }
        }

        // set auto width of columns
        worksheet.columns.forEach((column, index) => {

            let maxLength = 0;
            column.eachCell(cell => {
                const columnLength = cell.value ? cell.value.toString().length : 10;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }

                // set borders
                if (index % 3 === 0) {
                    cell.border = {
                        right: { style: 'thin' }
                    }
                }

                // set home games font color
                const firstStringPart = cell.value?.toString().split(':')[0] ?? '';
                if (firstStringPart.includes('Schwarzach') || firstStringPart.includes('Hofsteig')) {
                    cell.font = { color: { argb: "ff0000" } }
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });

        console.log('');

        const savePath = path.join(outputPath, 'matches.xlsx')

        workbook.xlsx.writeFile(savePath)
            .then(() => {
                console.log('FILE SUCCESSFULLY WRITTEN');
                console.log('File saved here: ' + path.resolve(savePath));
                resolve();
            })
            .catch(err => {
                console.error('File could not be written!')
                console.error(err);
                reject();
            })
    })
}