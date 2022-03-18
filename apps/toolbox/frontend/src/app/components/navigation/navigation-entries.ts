import { EditTeamsComponent } from "../admin/edit-teams/edit-teams.component";
import { EditWeeklyEventsComponent } from "../admin/edit-weekly-events/edit-weekly-events.component";
import { GeneralplanComponent } from "../generalplan/generalplan.component";
import { NewplayerFormComponent } from "../newplayer-form/newplayer-form.component";
import { WeekplanComponent } from "../weekplan/weekplan.component";

export interface NavigationEntry {
    id: string,
    label: string,
    component: any,
    admin: boolean
}

export const GeneralplanNavigationEntry: NavigationEntry = {
    id: 'generalplan',
    label: 'Generalplan',
    component: GeneralplanComponent,
    admin: false
}

export const navigationEntriesList: NavigationEntry[] = [
    GeneralplanNavigationEntry,
    {
        id: 'weekplan',
        label: "Wochenplan",
        component: WeekplanComponent,
        admin: false
    },
    {
        id: 'newplayerform',
        label: 'Spieleranmeldung',
        component: NewplayerFormComponent,
        admin: false
    },
    {
        id: 'teamsdata',
        label: 'Team Daten',
        component: EditTeamsComponent,
        admin: true
    },
    {
        id: 'weeklyevents',
        label: "Wöchentliche Events",
        component: EditWeeklyEventsComponent,
        admin: true
    }
]