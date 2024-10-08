import * as path from 'path';
import { createPlan } from "./app/createPlan";
import { createSimpleHomePlan } from "./app/createSimpleHomePlan";
import { AsyncWait } from "./app/helpers/asyncWait";
import { fetchTeamDataFromApi } from "./app/helpers/fetchFromWebcal";

const startDate = new Date('2024-08-01');
startDate.setHours(0, 0, 0, 0);
const endDate = new Date('2024-12-01');
const outputPath = path.join('dist', 'apps', 'generalplan-cli');

const asyncWait = new AsyncWait();

asyncWait.wait();

fetchTeamDataFromApi()
    .then(teamData => {
        asyncWait.resetTimeout();

        console.log('Creating Plan...');
        createPlan(teamData, startDate, endDate, outputPath).then(() => {
            asyncWait.resetTimeout();

            console.log();
            console.log();
            console.log('Creating Simple Home Plan...');
            createSimpleHomePlan(teamData, startDate, endDate, outputPath).then(() => {
                asyncWait.finishAndExit();
            })
        })
    })
    .catch(err => console.error(err))



