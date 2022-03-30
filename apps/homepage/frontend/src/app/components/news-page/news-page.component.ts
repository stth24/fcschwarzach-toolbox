import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { NEWS_ID_ROUTE_PARAM } from '../../app.module';
import { News } from '../../model/model';

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit, OnDestroy {

    private unsubscribe = new Subject<void>();

    newsItem: News | undefined;

    constructor(private route: ActivatedRoute, private apiService: ApiService) { }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribe))
            .subscribe(params => {
                const newsId = params[NEWS_ID_ROUTE_PARAM];

                if (typeof newsId === 'string') {
                    this.apiService.getSingleNewsEntryFromApi(newsId)
                        .then(entry => this.newsItem = entry)
                }
            })
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
