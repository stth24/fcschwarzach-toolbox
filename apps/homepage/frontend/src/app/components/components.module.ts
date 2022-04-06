import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiHelpersModule } from '@fcschwarzach/shared-ui-helpers';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { GameTilesComponent } from './game-tiles/game-tiles.component';
import { HeaderComponent } from './header/header.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NextKmGamesComponent } from './next-km-games/next-km-games.component';
import { NextNwGamesComponent } from './next-nw-games/next-nw-games.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { TeamPageComponent } from './team-page/team-page.component';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        NextKmGamesComponent,
        GameTilesComponent,
        NextNwGamesComponent,
        NewsItemComponent,
        NewsPageComponent,
        SponsorsComponent,
        TeamPageComponent
    ],
    imports: [
        CommonModule,
        SharedUiHelpersModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ContentComponent
    ]
})
export class ComponentsModule { }
