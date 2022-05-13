import { Component, ElementRef } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'homepage-frontend';

    darkMode = false;

    apiTokenLoaded = false;

    element: HTMLElement;

    constructor(elementRef: ElementRef, private apiService: ApiService) {
        this.element = elementRef.nativeElement;
    }

    ngOnInit() {
        this.apiService.getApiToken()
            .then(() => this.apiTokenLoaded = true);
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.element.classList.toggle('dark-mode', this.darkMode);
    }
}
