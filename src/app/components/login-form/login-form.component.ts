import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LOGIN_STORAGE_KEY } from '../helpers/login-helper';
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

    constructor(private stateService: StateService) { }

    ngOnInit(): void { }

    close() {
        this.closeModal.emit();
    }

    login() {
        this.errorMessage = '';

        const body = new FormData();
        body.append('username', this.username);
        body.append('pw', this.password);

        const options = {
            method: 'POST',
            body
        };

        fetch('http://localhost/api/admin/login.php', options)
            .then(res => {
                if (res.status === 200) {
                    res.text().then(t => {
                        localStorage.setItem(LOGIN_STORAGE_KEY, t)

                        this.stateService.updateState({
                            loggedIn: true
                        })

                        this.close();
                    });

                }
                else {
                    res.text().then(t => this.errorMessage = t);
                }
            })
            .catch(err => this.errorMessage = err);
    }

}
