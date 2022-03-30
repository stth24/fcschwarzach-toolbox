import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../model/model';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
    @Input() newsItem: News | undefined;

    constructor(private router: Router, private route: ActivatedRoute) { }

    navigateToNewsItem(newsItem: News) {
        this.router.navigate(['news', newsItem.id], { relativeTo: this.route });
    }
}
