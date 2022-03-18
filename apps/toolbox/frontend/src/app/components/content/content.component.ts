import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { navigateToParam } from '../helpers/navigation-helper';
import { navigationEntriesList, NavigationEntry } from '../navigation/navigation-entries';
import { StateService } from '../services/state/state.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements AfterViewInit {

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef | undefined;

    navEntry: NavigationEntry | undefined;

    navigationEntriesListForDefault = navigationEntriesList.filter(elem => !this.loggedIn ? !elem.admin : true);

    paramId = '';

    loggedIn = false;

    showDefaultContent = true;

    stateServiceSubscription: Subscription | undefined;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private stateService: StateService,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.paramId = params['nav'];

            this.loadContent();
        })

        this.stateService.getStateStream().subscribe(state => {
            this.loggedIn = state.loggedIn;
            this.navigationEntriesListForDefault = navigationEntriesList.filter(elem => !this.loggedIn ? !elem.admin : true)

            this.loadContent();
        })
    }

    ngAfterViewInit() {
        this.loadContent();
    }

    navigate(entry: NavigationEntry) {
        navigateToParam(entry, this.router, this.activatedRoute);
    }

    loadContent() {
        this.navEntry =
            navigationEntriesList
                .filter(elem => !this.loggedIn ? !elem.admin : true)
                .find(n => n.id === this.paramId);

        this.container?.clear(); // remove all children from container

        if (this.navEntry) {
            // reload view child
            this.container?.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.navEntry?.component));
            this.showDefaultContent = false;
        }
        else {
            this.showDefaultContent = true;
        }


    }
}
