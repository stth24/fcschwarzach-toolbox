import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    title = 'homepage-frontend';

    darkMode = true;

    element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    ngAfterViewInit() {
        this.element.classList.add('dark-mode');
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.element.classList.toggle('dark-mode', this.darkMode);
    }
}
