import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-ui-helpers-zoom-image',
    templateUrl: './zoom-image.component.html',
    styleUrls: ['./zoom-image.component.scss']
})
export class ZoomImageComponent {

    @Input() src = '';
    @Input() height = '';
}
