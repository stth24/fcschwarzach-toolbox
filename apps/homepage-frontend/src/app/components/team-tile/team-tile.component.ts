import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mannschaft } from '../../model/model';

@Component({
    selector: 'app-team-tile',
    templateUrl: './team-tile.component.html',
    styleUrls: ['./team-tile.component.scss']
})
export class TeamTileComponent {
    @Input() team?: Mannschaft;

    constructor(private router: Router, private route: ActivatedRoute) { }

    navigateToTeamPage(team: Mannschaft) {
        this.router.navigate(['team', team.id], { relativeTo: this.route });
    }
}
