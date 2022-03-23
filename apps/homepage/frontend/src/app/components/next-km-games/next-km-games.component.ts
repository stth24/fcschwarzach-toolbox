import { Component, OnInit } from '@angular/core';
import { filterAbgesagt, TeamData } from '@fcschwarzach/shared-generalplan-api';
import { ApiService } from '../../api/api.service';

@Component({
    selector: 'app-next-km-games',
    templateUrl: './next-km-games.component.html',
    styleUrls: ['./next-km-games.component.scss']
})
export class NextKmGamesComponent implements OnInit {
    teams: TeamData[] = [];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getGeneralPlanData()
            .then(teamData => {
                const today = new Date();
                today.setHours(0);
                today.setMinutes(0);

                const km = teamData.find(team => team.name === 'KM')
                if (km) {
                    this.teams.push(km);
                }

                const einsB = teamData.find(team => team.name === '1b')
                if (einsB) {
                    this.teams.push(einsB);
                }

                this.teams.forEach(team => {
                    team.events =
                        team.events
                            .filter(event => filterAbgesagt(event))
                            .filter(event => event.dtstart.value >= today)
                            .slice(0, 3);
                })
            })
    }

}
