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



@NgModule({
    declarations: [HeaderComponent, NavigationComponent, ContentComponent, NewplayerFormComponent, GeneralplanComponent, ModalComponent, LoginFormComponent],
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
