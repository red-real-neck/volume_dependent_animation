
import componentsController from "./components/componentsController"
export default class App {
    _audioContext: AudioContext;
    _source: MediaStreamAudioSourceNode;
    _componentsController: componentsController;
    constructor() {
        this._componentsController = new componentsController();
        this._componentsController.register();
    }

    run() {
        window.addEventListener("click", this.setupContext.bind(this))
    }

    getMic() {
        return navigator.mediaDevices.getUserMedia({
            audio: true
        })
    }

    async setupContext() {
        this._audioContext = new AudioContext()
        const mic = await this.getMic()
        if (this._audioContext.state === "suspended") {
            await this._audioContext.resume()
        }
        this._source = this._audioContext.createMediaStreamSource(mic)
    }
}