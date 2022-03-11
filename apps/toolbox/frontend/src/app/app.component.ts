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
    }

    toggleMenu() {
        this.navOpen = !this.navOpen;
    }
}
