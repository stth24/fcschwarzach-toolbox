import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { navigationEntries, navigationEntriesList, NavigationEntry } from '../navigation/navigation-entries';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    navEntries = navigationEntries;
    navEntry: NavigationEntry | undefined;

    constructor(private activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.navEntry = navigationEntriesList.find(n => n.id === params.nav);
        })
    }

    ngOnInit(): void {
    }

}
