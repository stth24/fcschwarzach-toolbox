import { Component, ElementRef } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'homepage-frontend';

    readonly DARK_MODE_KEY = 'dark_mode';

    darkMode = false;

    apiTokenLoaded = false;

    element: HTMLElement;

    constructor(elementRef: ElementRef, private apiService: ApiService) {
        this.element = elementRef.nativeElement;
    }

    ngOnInit() {
        this.apiService.getApiToken()
            .then(() => this.apiTokenLoaded = true);

        const darkModeFromLS = localStorage.getItem(this.DARK_MODE_KEY);

        if (!darkModeFromLS) {
            localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(this.darkMode));
        }
        else {
            this.darkMode = JSON.parse(darkModeFromLS);
            this.element.classList.toggle('dark-mode', this.darkMode);
        };
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.element.classList.toggle('dark-mode', this.darkMode);
        localStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(this.darkMode));
    }
}
