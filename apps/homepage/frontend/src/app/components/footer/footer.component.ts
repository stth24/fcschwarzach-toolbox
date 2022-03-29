import { Component } from '@angular/core';
import { COCKPIT_URL } from '../../api/url';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    COCKPIT_URL = COCKPIT_URL;
}
