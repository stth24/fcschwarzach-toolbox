import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentComponent } from './content/content.component';
import { NewplayerFormComponent } from './newplayer-form/newplayer-form.component';
import { GeneralplanComponent } from './generalplan/generalplan.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
    declarations: [HeaderComponent, NavigationComponent, ContentComponent, NewplayerFormComponent, GeneralplanComponent],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        NavigationComponent,
        ContentComponent
    ]
})
export class ComponentsModule { }
