import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
    loggedIn: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private state: State;

    private stateStream: BehaviorSubject<State>;

    constructor() {
        this.state = {
            loggedIn: false
        }

        this.stateStream = new BehaviorSubject<State>(Object.assign({}, this.state));
    }

    getStateStream() {
        return this.stateStream;
    }

    updateState(newState: Partial<State>) {
        this.state = {
            ...this.state,
            ...newState
        }

        this.stateStream.next(this.state);
    }


}
