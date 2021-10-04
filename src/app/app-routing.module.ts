import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralplanComponent } from './components/generalplan/generalplan.component';
import { NewplayerFormComponent } from './components/newplayer-form/newplayer-form.component';

const routes: Routes = [
    {
        path: 'generalplan',
        component: GeneralplanComponent
    },
    {
        path: 'newplayerform',
        component: NewplayerFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
