import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../../app/api/api.service';
import { LoginTokenHandler } from '../helpers/login-helper';
import { navigateToParam } from '../helpers/navigation-helper';
import { StateService } from '../services/state/state.service';
import { GeneralplanNavigationEntry, navigationEntriesList, NavigationEntry } from './navigation-entries';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() navOpen = true;

    menuEntries = navigationEntriesList.filter(elem => !elem.admin);
    adminMenuEntries = navigationEntriesList.filter(elem => elem.admin);

    showAdminLogin = false;

    loggedIn = false;

    unsubscribe = new Subject<void>();

    selectedEntry: string | undefined;

    private nativeElement: HTMLElement;

    constructor(
        elementRef: ElementRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private stateService: StateService,
        private apiService: ApiService) {
        this.nativeElement = elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.stateService.getStateStream().pipe(takeUntil(this.unsubscribe)).subscribe(state => {
            this.loggedIn = state.loggedIn;
        })

        this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe(params => {
            this.selectedEntry = params['nav'];
        })
    }

    ngOnChanges() {
        this.nativeElement.classList.replace(
            this.navOpen ? 'nav-in' : 'nav-out',
            this.navOpen ? 'nav-out' : 'nav-in'
        )
    }

    ngAfterViewInit() {
        this.nativeElement.classList.add(this.navOpen ? 'nav-out' : 'nav-in');
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    navigate(entry: NavigationEntry) {
        navigateToParam(entry, this.router, this.activatedRoute);
    }

    adminLogin() {
        this.apiService.verifyToken()
            .catch(() => this.showAdminLogin = true);
    }

    adminLogout() {
        LoginTokenHandler.removeLoginToken();

        this.stateService.updateState({
            loggedIn: false
        })

        this.navigate(GeneralplanNavigationEntry);
    }

    closeLoginModal() {
        this.showAdminLogin = false;
    }

}
