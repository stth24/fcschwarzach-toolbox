import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LOGIN_STORAGE_KEY } from '../helpers/login-helper';
import { StateService } from '../services/state/state.service';
import { adminNavigationEntriesList, navigationEntries, navigationEntriesList, NavigationEntry } from './navigation-entries';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    @Input() navOpen = true;

    menuEntries = navigationEntriesList;
    adminMenuEntries = adminNavigationEntriesList;

    showAdminLogin = false;

    loggedIn = false;

    stateSubscription: Subscription | undefined;

    private nativeElement: HTMLElement;

    constructor(
        elementRef: ElementRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private stateService: StateService) {
        this.nativeElement = elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.stateSubscription = this.stateService.getStateStream().subscribe(state => {
            this.loggedIn = state.loggedIn;
        })
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

    ngOnDestroy() {
        this.stateSubscription?.unsubscribe();
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

    adminLogin() {
        const token = localStorage.getItem(LOGIN_STORAGE_KEY);

        if (token) {
            const body = new FormData();
            body.append('token', token);

            const options = {
                method: 'POST',
                body
            };

            fetch('http://localhost/api/admin/getdata.php', options)
                .then(res => {
                    if (res.status === 200) {
                        this.stateService.updateState({
                            loggedIn: true
                        })
                    }
                    else {
                        localStorage.removeItem(LOGIN_STORAGE_KEY);
                        this.showAdminLogin = true;
                    }
                })
                .catch(err => {
                    this.showAdminLogin = true;
                });
        }
        else {
            this.showAdminLogin = true;
        }
    }

    adminLogout() {
        localStorage.removeItem(LOGIN_STORAGE_KEY);

        this.stateService.updateState({
            loggedIn: false
        })
    }

    closeLoginModal() {
        this.showAdminLogin = false;
    }

}
