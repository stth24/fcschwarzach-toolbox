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

    console.log('Creating Simple Home Plan...');
    createSimpleHomePlan(startDate, endDate).then(() => {
        asyncWait.finishAndExit();
    })
})



