import { ActivatedRoute, Router } from "@angular/router";
import { NavigationEntry } from "../navigation/navigation-entries";

export function navigateToParam(
    entry: NavigationEntry,
    router: Router,
    activatedRoute: ActivatedRoute) {
    router.navigate(
        [],
        {
            relativeTo: activatedRoute,
            queryParams: { nav: entry.id },
            queryParamsHandling: 'merge'
        }
    );
}