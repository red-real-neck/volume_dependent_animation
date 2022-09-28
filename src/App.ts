
import componentsController from "./components/componentsController"
import AudioContextController from "./AudioAPI/AudioContextController"
export default class App {
    private _audioContextController: AudioContextController;
    private _source: MediaStreamAudioSourceNode;
    private _componentsController: componentsController;
    private _analyzerNode: AnalyserNode;
    private pcmData: Float32Array;

    constructor() {
        this._componentsController = new componentsController()
        this._componentsController.register();
    }

    public run() {
        window.addEventListener("click", this.setupAudioContext.bind(this))
    }

    private async setupAudioContext() {
        this._audioContextController = new AudioContextController()
        this.setupAudioConnection()
    }

    private setupAudioConnection() {
        this._audioContextController.setupAudioConnection()
    }
}