///<reference path='../../../node_modules/@types/w3c-image-capture/index.d.ts' />

import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import {connectToRedux, ReduxBindable} from "../util/ReduxConnector";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import Observe from "../../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";
import Listen from "../../../node_modules/@leavittsoftware/polymer-ts/listen-decorator";
import { selectChallenge,submitPhoto } from "../../state/actions/Actions";
import { appState } from "../../state/store";

const html = (template:any) => template.toString();

class TakePhoto extends PolymerElement implements ReduxBindable {
    @Property()
    selectedChallengeId:string;

    @Property()
    src?:string;

    @Property()
    mediaStream:any;

    static get template() {
        return html`
            <style>
                [hidden] {
                    display: none !important;
                }
            </style>
            <div>
                <input type="file" accept="image/*" id="fileInput" capture="environment" hidden>
                <label for="fileInput">Select an image!</label>
                <button on-click="_submitPhoto" hidden$="[[!src]]">Submit Photo</button>
                <img id="img" src="[[src]]" hidden$="[[!src]]"></img>
            </div>
        `
    }

    async connectedCallback(){
        super.connectedCallback();
        connectToRedux(this);
        this.$.fileInput.addEventListener('change', (event:any) => this._imageCaptured(event.target.files));
    }

    private _imageCaptured(files:any){
        if(files && files.length > 0)
            this.src = URL.createObjectURL(files[0]);
    }

    private _submitPhoto(){
        if(this.src){
            appState.dispatch(submitPhoto(this.src,this.selectedChallengeId,this.src));
        }
    }

    @Observe('selectedChallengeId')
    _selectedChallengeIdChanged(selectedChallengeId:string){
        this.src = undefined;
    }

    stateReceiver(state:any) {
        this.set('selectedChallengeId', state.challenge.selectedChallengeId);
    }
}


customElements.define('take-photo', TakePhoto);

export {TakePhoto};