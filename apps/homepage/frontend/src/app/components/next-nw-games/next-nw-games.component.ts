import { Component, OnInit } from '@angular/core';
import { filterAbgesagt, TeamData } from '@fcschwarzach/shared-generalplan-api';
import { ApiService } from '../../api/api.service';

@Component({
    selector: 'app-next-nw-games',
    templateUrl: './next-nw-games.component.html',
    styleUrls: ['./next-nw-games.component.scss']
})
export class NextNwGamesComponent implements OnInit {

    teams: TeamData[] = [];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getGeneralPlanData()
            .then(teamData => {
                const today = new Date();
                today.setHours(0);
                today.setMinutes(0);

                this.teams = teamData.filter(team => team.name !== 'KM' && team.name !== '1b');

                this.teams.forEach(team => {
                    team.events =
                        team.events
                            .filter(event => filterAbgesagt(event))
                            .filter(event => event.dtstart.value >= today)
                            .slice(0, 1);
                })
            })
    }

}
