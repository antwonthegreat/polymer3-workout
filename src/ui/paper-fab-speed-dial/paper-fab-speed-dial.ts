import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import "../../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../../../node_modules/@polymer/paper-fab/paper-fab.js";
import "./paper-fab-speed-dial-overlay.js";

const html = (template:any) => template.toString();

class PaperFabSpeedDial extends PolymerElement {

    @Property()
    icon:string = 'add';

    @Property({notify:true})
    opened:boolean;  

    @Property()
    disabled:boolean = false;  

    @Property()
    withBackdrop:boolean;  

    static get template() {
        return html`
        <style>
            .open,.overlay {
                position: var(--paper-fab-speed-dial-position, absolute);
                bottom: var(--paper-fab-speed-dial-bottom, 16px);
                right: var(--paper-fab-speed-dial-right, 16px);
            }
            .open {
                --paper-fab-background: var(--paper-fab-speed-dial-background);
                --paper-fab-keyboard-focus-background: var(--paper-fab-speed-dial-keyboard-focus-background);
            }
            .close {
                --paper-fab-background: var(--paper-fab-speed-dial-background-close, var(--paper-grey-500));
                --paper-fab-keyboard-focus-background: var(--paper-fab-speed-dial-keyboard-focus-background-close, var(--paper-grey-500));
                margin-top: 20px;
                display: inline-block;
            }
            .overlay {
                text-align: right;
            }

            hidden {
                display:none !important;
            }
        </style>

        <paper-fab icon="[[icon]]" class="open" on-tap="open" hidden$="[[opened]]" disabled="[[disabled]]"></paper-fab>

        <paper-fab-speed-dial-overlay id="overlay" class="overlay" opened="{{opened}}" with-backdrop="[[withBackdrop]]">
            <slot></slot>
            <paper-fab icon="close" class="close" on-tap="close"></paper-fab>
        </paper-fab-speed-dial-overlay>
        `
    }

    open(e:Event){
        if(e)
            e.preventDefault();

        this.opened = true;
    }

    close(e:Event){
        if(e)
            e.preventDefault();

        this.opened = false;
    }
}

customElements.define('paper-fab-speed-dial', PaperFabSpeedDial);

export{PaperFabSpeedDial};