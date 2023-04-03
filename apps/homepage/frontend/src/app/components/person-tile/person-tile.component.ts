import { Component, Input } from '@angular/core';
import { Vorstandsmitglied } from '../../model/model';

@Component({
    selector: 'app-person-tile',
    templateUrl: './person-tile.component.html',
    styleUrls: ['./person-tile.component.scss']
})
export class PersonTileComponent {
    @Input() person?: Vorstandsmitglied;
}
