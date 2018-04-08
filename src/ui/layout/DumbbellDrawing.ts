import {PolymerElement} from "../../../node_modules/@polymer/polymer/polymer-element";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import Observe from "../../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";

import "../../styles/shared-styles";

const html = (template:any) => template.toString();

class DumbbellDrawing extends PolymerElement {
    @Property()
    weight: number;
    
    static get template() {
        return html`
        <style include="shared-styles">
            :host {
                border-radius: 2px;
                color: var(--app-grey-1);
                @apply --paper-font-caption;
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
                @apply --layout-wrap;
                transition: .6s ease;
                padding: 5px;
            }

            .dumbbell {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
            }

            #left,
            #right {
                background-color: var(--app-grey-4);
                border: 1px solid var(--paper-grey-700);
                width: 40px;
                height: 80px;
                border-radius: 2px;
            }

            .handle {
                @apply --paper-font-caption;
                background-color: var(--app-grey-3);
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
                width: 40px;
                height: 16px;
                color: var(--app-grey-1);
            }
        </style>
        <div class="dumbbell">
            <div id="left"></div>
            <div class="handle">[[weight]]</div>
            <div id="right"></div>
        </div>
        `;
    }

    @Observe('weight')
    protected _weightChanged(weight:number){
        if (weight && super.$) {
            super.$.left.style.width = `${10 + weight * .44}px`;
            super.$.right.style.width = `${10 + weight * .44}px`;
        
            super.$.left.style.height = `${20 + weight * .42}px`;
            super.$.right.style.height = `${20 + weight * .42}px`;
        }       
    }
}

customElements.define('dumbbell-drawing', DumbbellDrawing);

export {DumbbellDrawing};