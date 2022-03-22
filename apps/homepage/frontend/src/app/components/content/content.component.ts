import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Kontakt, News, Vorstandsmitglied } from '../../model/model';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    news: News[] = [];
    vorstand: Vorstandsmitglied[] = [];
    historyText = 'Lädt...';
    kontakt: Kontakt | undefined;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getNewsFromApi()
            .then(news => this.news = news);

        this.apiService.getVorstandFromApi()
            .then(vorstand => this.vorstand = vorstand);

        this.apiService.getHistoryFromApi()
            .then(history => this.historyText = history.text);

        this.apiService.getKontaktFromApi()
            .then(kontakt => this.kontakt = kontakt);
    }
}
