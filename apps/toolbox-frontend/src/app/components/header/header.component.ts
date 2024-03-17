import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../services/state/state.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input()
    navOpen = true;

    @Output()
    toggleNav = new EventEmitter();

    loggedIn = false;

    stateSubscription: Subscription | undefined;

    nativeElement: HTMLElement;

    constructor(private stateService: StateService, elementRef: ElementRef) {
        this.nativeElement = elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.stateSubscription = this.stateService.getStateStream().subscribe(state => {
            this.loggedIn = state.loggedIn;

            if (this.loggedIn) {
                this.nativeElement.style.backgroundColor = 'var(--dark-gray)';
            }
            else {
                this.nativeElement.style.backgroundColor = 'darkred';
            }
        })
    }

    ngOnDestroy() {
        this.stateSubscription?.unsubscribe();
    }

    toggleMenu() {
        this.toggleNav.emit();
    }

}
