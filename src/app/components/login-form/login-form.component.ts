import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { StateService } from '../services/state/state.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    @Output() closeModal = new EventEmitter<void>();

    username = '';
    password = '';

    errorMessage = '';

    loggedIn = false;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void { }

    close() {
        this.closeModal.emit();
    }

    login() {
        this.errorMessage = '';

        this.apiService.login(this.username, this.password)
            .then(() => this.close())
            .catch((err: string) => this.errorMessage = err);
    }

}
