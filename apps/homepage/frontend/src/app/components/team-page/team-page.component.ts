import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { ApiService } from '../../api/api.service';
import { TEAM_ID_ROUTE_PARAM } from '../../app.module';
import { Mannschaft, Spieler } from '../../model/model';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

    private unsubscribe = new Subject<void>();

    teamItem: Mannschaft | undefined;
    spieler: Spieler[] = [];

    constructor(private route: ActivatedRoute, private apiService: ApiService) { }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribe))
            .subscribe(params => {
                const teamId = params[TEAM_ID_ROUTE_PARAM];

                if (typeof teamId === 'string') {
                    this.apiService.getSingleMannschaftEntryFromApi(teamId)
                        .then(entry => {
                            this.teamItem = entry;

                            this.apiService.getSpielerFromApi()
                                .then(list => {
                                    this.spieler = list.filter(player => {
                                        let match = false;
                                        this.teamItem?.spieler?.forEach(element => {
                                            if (element._id === player.id) match = true;
                                        });
                                        return match;
                                    })
                                })
                        })
                }
            })
    }

}
