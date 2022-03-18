import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

    paramId = '';

    loggedIn = false;

    stateServiceSubscription: Subscription | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private stateService: StateService,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.paramId = params['nav'];

            this.loadContent();
        })

        this.stateService.getStateStream().subscribe(state => {
            this.loggedIn = state.loggedIn;

            this.loadContent();
        })
    }

    ngAfterViewInit() {
        this.loadContent();
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
        }
    }
}
