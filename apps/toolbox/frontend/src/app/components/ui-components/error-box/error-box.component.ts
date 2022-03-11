import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-error-box',
    templateUrl: './error-box.component.html',
    styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent implements OnInit {

    @Input() title = '';
    @Input() message = '';

    constructor() { }

    ngOnInit(): void {
    }

}
