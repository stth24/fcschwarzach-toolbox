import { Component } from "@angular/core";
import { EditTeamsComponent } from "../admin/edit-teams/edit-teams.component";
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
        id: 'newplayerform',
        label: 'Spieleranmeldung',
        component: NewplayerFormComponent
    },
    {
        id: 'weekplan',
        label: "Wochenplan",
        component: WeekplanComponent
    }
]

export const adminNavigationEntriesList: NavigationEntry[] = [
    {
        id: 'teamsdata',
        label: 'Team Daten',
        component: EditTeamsComponent
    }
]