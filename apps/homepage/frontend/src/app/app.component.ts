import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'homepage-frontend';

    darkMode = false;

    element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.element.classList.toggle('dark-mode', this.darkMode);
    }
}
