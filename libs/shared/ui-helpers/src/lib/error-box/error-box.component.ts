import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-ui-helpers-error-box',
    templateUrl: './error-box.component.html',
    styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent {

    @Input() title = '';
    @Input() message = '';

}
