
import componentsController from "./components/componentsController"
import AudioContextController from "./AudioAPI/AudioContextController"
import * as THREE from "three";

export default class App {
    private _audioContextController: AudioContextController;
    private _componentsController: componentsController;
    private _clock: THREE.Clock;
    private _sphere: THREE.Object3D<THREE.Event>;
    private _time: number;

    constructor() {
        this._sphere = document.querySelector('#sphere').object3D;
        this._clock = new THREE.Clock();
        this._time = Date.now();
        this._componentsController = new componentsController();
        this._componentsController.register();
    }

    public run() {
        window.addEventListener("click", this.setupAudioContext.bind(this));
    }

    private async setupAudioContext() {
        this._audioContextController = new AudioContextController();
        this.setupAudioConnection();
    }

    private setupAudioConnection() {
        this._audioContextController.setupAudioConnection();
        this.tick();
    }

    private tick() {
        if (this._audioContextController.pcmDataValue) {
            this._audioContextController.calculateVolume()

        // console.log('this._audioContextController.volume:', this._audioContextController.volume);

        const currentTime = Date.now();
        const deltaTime = currentTime - this._time;
        this._time = currentTime;

        if (this._audioContextController.volume > 100) {
            this._sphere.position.y += 0.01 + deltaTime * 0.001
        } else {
            this._sphere.position.y = this._sphere.position.y > 1.25 ? this._sphere.position.y -= 0.01 + deltaTime * 0.001 : 1.25;
        }
        }
        
        window.requestAnimationFrame(this.tick.bind(this));
    }
}