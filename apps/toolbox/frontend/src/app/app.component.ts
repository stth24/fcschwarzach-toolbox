import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    navOpen = true;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        // check if there already is a valid token and login
        this.apiService.verifyToken().catch(() => console.log('No Token set'));

        // if sceen width is less than 600px do no show navigation initially
        if (window.screen.width < 601) {
            this.navOpen = false;
        }
    }

    toggleMenu() {
        this.navOpen = !this.navOpen;
    }
}
