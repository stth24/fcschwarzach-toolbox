import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Sponsor } from '../../model/model';

@Component({
    selector: 'app-sponsors',
    templateUrl: './sponsors.component.html',
    styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

    sponsors: Sponsor[] = [];

    SPONSOR_CONTAINER_ID = 'sponsor_container_element';

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getSponsorenFromApi()
            .then(list => {
                this.sponsors = list;
                this.calcSponsorContainerAnimationDuration();
            });
    }

    calcSponsorContainerAnimationDuration() {
        const sponsorContainerElement = document.getElementById(this.SPONSOR_CONTAINER_ID);

        if (sponsorContainerElement) {
            sponsorContainerElement.style.animationDuration = this.sponsors.length * 2 + 's';
        }
    }

}
