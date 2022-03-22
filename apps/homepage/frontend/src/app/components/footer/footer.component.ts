import { Component } from '@angular/core';
import { HOST } from '../../api/url';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    HOST = HOST;
}
