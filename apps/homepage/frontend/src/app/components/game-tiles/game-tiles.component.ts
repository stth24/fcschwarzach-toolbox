import { Component, Input } from '@angular/core';
import { TeamData } from '@fcschwarzach/shared-generalplan-api';

@Component({
    selector: 'app-game-tiles',
    templateUrl: './game-tiles.component.html',
    styleUrls: ['./game-tiles.component.scss']
})
export class GameTilesComponent {

    @Input() teams: TeamData[] = [];
}
