export default class App {
    _test;
    constructor(test) {
        this._test = test;
    }

    run() {
        console.log('this._test:', this._test);
    }
}