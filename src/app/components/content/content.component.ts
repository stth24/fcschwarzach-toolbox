import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { adminNavigationEntries, adminNavigationEntriesList, navigationEntries, navigationEntriesList, NavigationEntry } from '../navigation/navigation-entries';
import { StateService } from '../services/state/state.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    navEntries = navigationEntries;
    adminNavEntries = adminNavigationEntries;
    navEntry: NavigationEntry | undefined;

    loggedIn = false;

    stateServiceSubscription: Subscription | undefined;

    constructor(private activatedRoute: ActivatedRoute, private stateService: StateService) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.navEntry = navigationEntriesList.find(n => n.id === params.nav);

            if (!this.navEntry) {
                this.navEntry = adminNavigationEntriesList.find(n => n.id === params.nav);
            }
        })

        this.stateService.getStateStream().subscribe(state => {
            this.loggedIn = state.loggedIn;
        })
    }

    ngOnInit(): void {
    }

}
