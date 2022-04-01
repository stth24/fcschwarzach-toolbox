import { Component, EventEmitter, Input, Output } from '@angular/core';
import { COCKPIT_URL } from '../../api/url';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    @Input() darkMode = true;
    @Output() toggleMode = new EventEmitter<void>();

    COCKPIT_URL = COCKPIT_URL;

    toggleDarkMode() {
        this.toggleMode.emit();
    }
}
