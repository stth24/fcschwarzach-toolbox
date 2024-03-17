import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { COCKPIT_URL } from '../../api/url';
import { DocumentInfo, SocialMediaLinks } from '../../model/model';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input() darkMode = true;
    @Output() toggleMode = new EventEmitter<void>();

    COCKPIT_URL = COCKPIT_URL;

    documentsInfo: DocumentInfo | undefined;
    socialMediaLinks: SocialMediaLinks | undefined;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getDocumentsFromApi()
            .then(docs => this.documentsInfo = docs)

        this.apiService.getSocialMediaLinks()
            .then(links => this.socialMediaLinks = links);
    }

    toggleDarkMode() {
        this.toggleMode.emit();
    }
}
