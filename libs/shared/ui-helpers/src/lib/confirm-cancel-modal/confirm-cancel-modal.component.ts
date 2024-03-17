import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'shared-ui-helpers-confirm-cancel-modal',
    templateUrl: './confirm-cancel-modal.component.html',
    styleUrls: ['./confirm-cancel-modal.component.scss']
})
export class ConfirmCancelModalComponent {

    @Input() message = '';

    @Output() close = new EventEmitter<boolean>();

    closeModal(result: boolean) {
        this.close.emit(result);
    }

}
