import { Component, Input } from '@angular/core';
import { News } from '../../model/model';

@Component({
    selector: 'app-news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
    @Input() newsItem: News | undefined;

    showModal = false;

    toggleModal() {
        this.showModal = !this.showModal;
    }
}
