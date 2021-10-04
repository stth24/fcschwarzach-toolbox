import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    @Input() navOpen = true;

    menuEntries = [
        {
            label: 'Generalplan',
            path: '/generalplan'
        },
        {
            label: 'Spieleranmeldung',
            path: '/newplayerform'
        }
    ]

    private nativeElement: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.nativeElement = elementRef.nativeElement;
    }

    ngOnInit(): void {
    }

    ngOnChanges() {
        this.nativeElement.classList.replace(
            this.navOpen ? 'nav-in' : 'nav-out',
            this.navOpen ? 'nav-out' : 'nav-in'
        )
    }

    ngAfterViewInit() {
        this.nativeElement.classList.add('nav-out');
    }

}
