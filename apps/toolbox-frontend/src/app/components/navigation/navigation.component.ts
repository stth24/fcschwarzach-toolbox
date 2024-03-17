import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../../app/api/api.service';
import { LoginTokenHandler } from '../helpers/login-helper';
import { StateService } from '../services/state/state.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() navOpen = true;

    showAdminLogin = false;

    loggedIn = false;

    unsubscribe = new Subject<void>();

    private nativeElement: HTMLElement;

    constructor(
        elementRef: ElementRef,
        private router: Router,
        private stateService: StateService,
        private apiService: ApiService) {
        this.nativeElement = elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.stateService.getStateStream().pipe(takeUntil(this.unsubscribe)).subscribe(state => {
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
        this.nativeElement.classList.add(this.navOpen ? 'nav-out' : 'nav-in');
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
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

        this.router.navigate(['/']);
    }

    closeLoginModal() {
        this.showAdminLogin = false;
    }

}
