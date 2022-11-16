import { Injectable, NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';
import { EditTeamsComponent } from './components/admin/edit-teams/edit-teams.component';
import { EditWeeklyEventsComponent } from './components/admin/edit-weekly-events/edit-weekly-events.component';
import { ContentComponent } from './components/content/content.component';
import { GeneralplanComponent } from './components/generalplan/generalplan.component';
import { NewplayerFormComponent } from './components/newplayer-form/newplayer-form.component';
import { StateService } from './components/services/state/state.service';
import { WeekplanComponent } from './components/weekplan/weekplan.component';


@Injectable({ providedIn: 'root' })
class AdminCanActive implements CanActivate {
    constructor(private stateService: StateService) { }

    canActivate() {
        return this.stateService.getStateStream().pipe(map(state => state.loggedIn));
    }
}

const routes: Routes = [
    {
        path: '',
        component: ContentComponent
    },
    {
        path: 'generalplan',
        component: GeneralplanComponent
    },
    {
        path: 'weekplan',
        component: WeekplanComponent
    },
    {
        path: 'newplayerform',
        component: NewplayerFormComponent
    },
    {
        path: 'teamsdata',
        component: EditTeamsComponent,
        canActivate: [AdminCanActive]
    },
    {
        path: 'weeklyevents',
        component: EditWeeklyEventsComponent,
        canActivate: [AdminCanActive]
    },
    {
        path: '**',
        redirectTo: '',
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
