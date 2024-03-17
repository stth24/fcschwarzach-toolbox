import { Component, Input, OnChanges } from '@angular/core';
import { TeamData, filterAbgesagt } from '@fcschwarzach/shared-generalplan-api';

@Component({
    selector: 'app-next-nw-games',
    templateUrl: './next-nw-games.component.html',
    styleUrls: ['./next-nw-games.component.scss']
})
export class NextNwGamesComponent implements OnChanges {
    @Input()
    teamData?: TeamData[];

    teams: TeamData[] = [];

    ngOnChanges(): void {
        if (!this.teamData) return;

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);

        this.teams = this.teamData.filter(team => !team.km);

        this.teams.forEach(team => {
            team.events =
                team.events
                    .filter(event => filterAbgesagt(event))
                    .filter(event => event.dtstart.value >= today)
                    .slice(0, 1);
        })

        // remove teams without events
        this.teams = this.teams.filter(team => team.events.length > 0);
    }

}
