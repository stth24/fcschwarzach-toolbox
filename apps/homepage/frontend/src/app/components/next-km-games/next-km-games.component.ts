import { Component, Input, OnChanges } from '@angular/core';
import { filterAbgesagt, TeamData } from '@fcschwarzach/shared-generalplan-api';

@Component({
    selector: 'app-next-km-games',
    templateUrl: './next-km-games.component.html',
    styleUrls: ['./next-km-games.component.scss']
})
export class NextKmGamesComponent implements OnChanges {
    @Input()
    teamData?: TeamData[];

    eins: TeamData | undefined;
    einsB: TeamData | undefined;

    ngOnChanges() {
        if (!this.teamData) return;

        const km = this.teamData.find(team => team.name === 'KM')
        if (km) {
            this.filterTeam(km);
            this.eins = km;
        }

        const einsB = this.teamData.find(team => team.name === '1b')
        if (einsB) {
            this.filterTeam(einsB);
            this.einsB = einsB;
        }
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
