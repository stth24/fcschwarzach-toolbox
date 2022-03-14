import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentComponent } from './content/content.component';
import { NewplayerFormComponent } from './newplayer-form/newplayer-form.component';
import { GeneralplanComponent } from './generalplan/generalplan.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './ui-components/modal/modal.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { EditTeamsComponent } from './admin/edit-teams/edit-teams.component';
import { ConfirmCancelModalComponent } from './ui-components/confirm-cancel-modal/confirm-cancel-modal.component';
import { WeekplanComponent } from './weekplan/weekplan.component';
import { LoaderComponent } from './ui-components/loader/loader.component';
import { ErrorBoxComponent } from './ui-components/error-box/error-box.component';
import { EditWeeklyEventsComponent } from './admin/edit-weekly-events/edit-weekly-events.component';
import { HourMinutePipe } from './helpers/hour-minute.pipe';
import { MatchFiltersComponent } from './ui-components/match-filters/match-filters.component';



@NgModule({
    declarations: [HeaderComponent, NavigationComponent, ContentComponent, NewplayerFormComponent, GeneralplanComponent, ModalComponent, LoginFormComponent, EditTeamsComponent, ConfirmCancelModalComponent, WeekplanComponent, LoaderComponent, ErrorBoxComponent, EditWeeklyEventsComponent, HourMinutePipe, MatchFiltersComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        NavigationComponent,
        ContentComponent
    ]
})
export class ComponentsModule { }
