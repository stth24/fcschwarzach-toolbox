import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NextKmGamesComponent } from './next-km-games/next-km-games.component';
import { GameTilesComponent } from './game-tiles/game-tiles.component';
import { NextNwGamesComponent } from './next-nw-games/next-nw-games.component';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        NextKmGamesComponent,
        GameTilesComponent,
        NextNwGamesComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ContentComponent
    ]
})
export class ComponentsModule { }
