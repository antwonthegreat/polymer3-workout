import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';

const html = (template:any) => template.toString();

class PaperFabSpeedDialOverlay extends PolymerElement {
    behaviors=[
        IronOverlayBehavior
    ];

    static get template() {
        return html`
            <template>
            <slot></slot>
        </template>
        `
    }
}

customElements.define('paper-fab-speed-dial-overlay', PaperFabSpeedDialOverlay);

export{PaperFabSpeedDialOverlay};