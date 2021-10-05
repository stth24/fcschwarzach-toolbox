import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { navigationEntries, navigationEntriesList, NavigationEntry } from './navigation-entries';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    @Input() navOpen = true;

    menuEntries = navigationEntriesList;

    private nativeElement: HTMLElement;

    constructor(elementRef: ElementRef, private router: Router, private activatedRoute: ActivatedRoute) {
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

    navigate(entry: NavigationEntry) {
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: { nav: entry.id },
                queryParamsHandling: 'merge'
            }
        );
    }

}
