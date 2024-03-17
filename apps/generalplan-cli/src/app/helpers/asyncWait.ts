// wait for async stuff to be finished


export class AsyncWait {
    private timePassed = 0;

    wait() {
        setTimeout(() => {
            this.timePassed += 1000;

            if (this.timePassed >= 10000) {
                console.error('Finished after Timeout: ' + this.timePassed + 'ms');
                this.finishAndExit();
            }

            this.wait();
        }, 1000)
    };

    finishAndExit() {
        process.exit();
    }

    resetTimeout() {
        this.timePassed = 0;
    }
}

