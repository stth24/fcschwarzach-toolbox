import { createPlan } from "./app/createPlan";
import { createSimpleHomePlan } from "./app/createSimpleHomePlan";
import { AsyncWait } from "./app/wait";

const startDate = new Date('2022-01-01');
startDate.setHours(0, 0, 0, 0);
const endDate = new Date('2022-06-30');

const asyncWait = new AsyncWait();


asyncWait.wait();

console.log('Creating Plan...');
createPlan(startDate, endDate).then(() => {
    asyncWait.resetTimeout();

    console.log();
    console.log();
    console.log('Creating Simple Home Plan...');
    createSimpleHomePlan(startDate, endDate).then(() => {
        asyncWait.finishAndExit();
    })
})

// import { fetch } from './app/dynamicFetchImport';

// fetch('https://fcschwarzach.com/api/generalplan')
//     .then(res => {
//         if (res.status === 200) {
//             res.json().then(data => {
//                 const teams = [];

//                 if (Array.isArray(data)) {
//                     data.forEach((d: any) => {
//                         teams.push({
//                             name: d.name,
//                             url: d.url,
//                             events: d.data
//                         })
//                     })
//                     console.log('RESULT', teams);

//                 }
//                 else {
//                     console.log('Cannot parse data!');
//                 }
//             })
//         }
//         else {
//             console.log('An unexpected Error occurred');
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     })



