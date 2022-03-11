import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-confirm-cancel-modal',
    templateUrl: './confirm-cancel-modal.component.html',
    styleUrls: ['./confirm-cancel-modal.component.scss']
})
export class ConfirmCancelModalComponent implements OnInit {

    @Input() message: string = '';

    @Output() close = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
    }

    closeModal(result: boolean) {
        this.close.emit(result);
    }

}
