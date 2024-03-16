import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamData } from '@fcschwarzach/shared-generalplan-api';
import { ApiService } from '../../api/api.service';
import { Kontakt, Mannschaft, NWInfo, News, NewsletterInfo, Vorstandsmitglied } from '../../model/model';

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
    teamData: TeamData[] | undefined;
    newsletterInfo: NewsletterInfo | undefined;

    currentNewsElement = 0;

    kontaktMapsSrc: SafeResourceUrl | undefined;

    nachwuchsleiter: Vorstandsmitglied | undefined;

    constructor(private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.apiService.getNewsFromApi()
            .then(news => {
                this.news = news
                    .filter(n => n.active)
                    .sort((a, b) => a.modified > b.modified ? -1 : 1)
            });

        this.apiService.getVorstandFromApi()
            .then(vorstand => this.vorstand = vorstand);

        this.apiService.getHistoryFromApi()
            .then(history => this.historyText = history.text);

        this.apiService.getKontaktFromApi()
            .then(kontakt => {
                this.kontakt = kontakt;

                this.apiService.getGoogleDevToken()
                    .then(token => {
                        const url = `https://www.google.com/maps/embed/v1/place?key=${token}&q=${kontakt.addresse.trim().replace(' ', '+')},+${kontakt.plz}+${kontakt.ort}`
                        this.kontaktMapsSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    })
            });

        this.apiService.getMannschaftenFromApi()
            .then(teams => this.mannschaften = teams);

        this.apiService.getNwInfoFromApi()
            .then(info => {
                this.nachwuchsleiter = {
                    name: info.name,
                    funktion: 'Nachwuchsleiter',
                    email: info.email,
                    phone: '',
                    image: info.image,
                };
                this.nwinfo = info;
            });

        this.apiService.getGeneralPlanData()
            .then(teamData => this.teamData = teamData);

        this.apiService.getNewsletterInfo()
            .then(newsletterInfo => {
                this.newsletterInfo = newsletterInfo;
            });
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
