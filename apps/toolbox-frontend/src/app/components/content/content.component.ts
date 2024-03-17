import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../services/state/state.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent {
    loggedIn = false;

    stateServiceSubscription: Subscription | undefined;

    constructor(
        private stateService: StateService) {
        this.stateServiceSubscription = this.stateService.getStateStream().subscribe(state => {
            this.loggedIn = state.loggedIn;
        })
    }

    ngOnDestroy() {
        this.stateServiceSubscription?.unsubscribe();
    }
}
