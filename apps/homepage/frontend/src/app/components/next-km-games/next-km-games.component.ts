import { Component, Input, OnChanges } from '@angular/core';
import { TeamData, filterAbgesagt } from '@fcschwarzach/shared-generalplan-api';

@Component({
    selector: 'app-next-km-games',
    templateUrl: './next-km-games.component.html',
    styleUrls: ['./next-km-games.component.scss']
})
export class NextKmGamesComponent implements OnChanges {
    @Input()
    teamData?: TeamData[];

    kmTeams: TeamData[] = [];

    ngOnChanges() {
        if (!this.teamData) return;

        this.kmTeams = this.teamData.filter(team => team.km);
        this.teamData.forEach(team => this.filterTeam(team));
    }

    filterTeam(team: TeamData) {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);

        team.events = team.events
            .filter(event => filterAbgesagt(event))
            .filter(event => event.dtstart.value >= today)
            .slice(0, 3)
    }

}
