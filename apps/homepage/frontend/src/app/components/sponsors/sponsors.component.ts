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

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getSponsorenFromApi()
            .then(list => this.sponsors = list);
    }

}
