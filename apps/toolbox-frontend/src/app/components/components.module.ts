import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedUiHelpersModule } from '@fcschwarzach/shared-ui-helpers';
import { AppRoutingModule } from '../app-routing.module';
import { EditWeeklyEventsComponent } from './admin/edit-weekly-events/edit-weekly-events.component';
import { ContentComponent } from './content/content.component';
import { GeneralplanComponent } from './generalplan/generalplan.component';
import { HeaderComponent } from './header/header.component';
import { HourMinutePipe } from './helpers/hour-minute.pipe';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewplayerFormComponent } from './newplayer-form/newplayer-form.component';
import { MatchFiltersComponent } from './ui-components/match-filters/match-filters.component';
import { WeekplanComponent } from './weekplan/weekplan.component';



@NgModule({
    declarations: [HeaderComponent, NavigationComponent, ContentComponent, NewplayerFormComponent, GeneralplanComponent, LoginFormComponent, WeekplanComponent, EditWeeklyEventsComponent, HourMinutePipe, MatchFiltersComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        SharedUiHelpersModule
    ],
    exports: [
        HeaderComponent,
        NavigationComponent,
        ContentComponent,
    ]
})
export class ComponentsModule { }
