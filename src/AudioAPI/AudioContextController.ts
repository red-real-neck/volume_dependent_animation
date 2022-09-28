export default class AudioContextController {
    private _audioContext: AudioContext;
    private _source: MediaStreamAudioSourceNode;
    private _analyzerNode: AnalyserNode;
    private pcmData: Float32Array;

    constructor() {

    }

    async setupAudioConnection() {
        this._audioContext = new AudioContext()
        this._analyzerNode = new AnalyserNode(this._audioContext, {fftSize: 256})
        const mic = await this.getMic()
        if (this._audioContext.state === "suspended") {
            await this._audioContext.resume()
        }
        this._source = this._audioContext.createMediaStreamSource(mic)
        this._source.connect(this._analyzerNode)
        
        this.pcmData = new Float32Array(this._analyzerNode.fftSize);
        window.requestAnimationFrame(this.onFrame.bind(this));
    }

    private getMic() {
        return navigator.mediaDevices.getUserMedia({
            audio: true
        })
    }

    private onFrame() {
        this._analyzerNode.getFloatTimeDomainData(this.pcmData);
        let sumSquares = 0.0;
        for (let index = 0; index < this.pcmData.length; index++) {
            sumSquares += this.pcmData[index]*this.pcmData[index];
        }
        console.log("volumeMeter:", Math.sqrt(sumSquares / this.pcmData.length) * 1000);
        window.requestAnimationFrame(this.onFrame.bind(this));
    }
}