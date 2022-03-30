import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Kontakt, Mannschaft, News, NWInfo, Vorstandsmitglied } from '../../model/model';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

    news: News[] = [];
    vorstand: Vorstandsmitglied[] = [];
    historyText = 'Lädt...';
    kontakt: Kontakt | undefined;
    mannschaften: Mannschaft[] = [];
    nwinfo: NWInfo | undefined;

    currentNewsElement = 0;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getNewsFromApi()
            .then(news => {
                news.sort((a, b) => a.modified > b.modified ? -1 : 1)

                this.news = news;
            });

        this.apiService.getVorstandFromApi()
            .then(vorstand => {
                vorstand.sort((a, b) => Number.parseInt(a.prio) < Number.parseInt(b.prio) ? -1 : 1);
                this.vorstand = vorstand
            });

        this.apiService.getHistoryFromApi()
            .then(history => this.historyText = history.text);

        this.apiService.getKontaktFromApi()
            .then(kontakt => this.kontakt = kontakt);

        this.apiService.getMannschaftenFromApi()
            .then(teams => this.mannschaften = teams);

        this.apiService.getNwInfoFromApi()
            .then(info => this.nwinfo = info);
    }

    scrollSlider(left: boolean) {
        this.currentNewsElement += left ? -1 : 1;
        if (this.currentNewsElement < 0) {
            this.currentNewsElement = this.news.length - 1;
        }
        if (this.currentNewsElement >= this.news.length) {
            this.currentNewsElement = 0;
        }
    }
}