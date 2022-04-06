import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ContentComponent } from './components/content/content.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { TeamPageComponent } from './components/team-page/team-page.component';

export const NEWS_ID_ROUTE_PARAM = 'newsid';
export const TEAM_ID_ROUTE_PARAM = "teamid";


const routes: Routes = [
    {
        path: '',
        component: ContentComponent
    },
    {
        path: 'news/:' + NEWS_ID_ROUTE_PARAM,
        component: NewsPageComponent,

    },
    {
        path: 'team/:' + TEAM_ID_ROUTE_PARAM,
        component: TeamPageComponent,
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
