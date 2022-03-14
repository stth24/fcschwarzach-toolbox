import { EditTeamsComponent } from "../admin/edit-teams/edit-teams.component";
import { EditWeeklyEventsComponent } from "../admin/edit-weekly-events/edit-weekly-events.component";
import { GeneralplanComponent } from "../generalplan/generalplan.component";
import { NewplayerFormComponent } from "../newplayer-form/newplayer-form.component";
import { WeekplanComponent } from "../weekplan/weekplan.component";

export interface NavigationEntry {
    id: string,
    label: string,
    component: any
}

export const navigationEntriesList: NavigationEntry[] = [
    {
        id: 'generalplan',
        label: 'Generalplan',
        component: GeneralplanComponent
    },
    {
        id: 'weekplan',
        label: "Wochenplan",
        component: WeekplanComponent
    },
    {
        id: 'newplayerform',
        label: 'Spieleranmeldung',
        component: NewplayerFormComponent
    }
]

export const adminNavigationEntriesList: NavigationEntry[] = [
    {
        id: 'teamsdata',
        label: 'Team Daten',
        component: EditTeamsComponent
    },
    {
        id: 'weeklyevents',
        label: "Wöchentliche Events",
        component: EditWeeklyEventsComponent
    }
]