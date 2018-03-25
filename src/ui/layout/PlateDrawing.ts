/// <reference path="../../model/WorkoutSet.ts" />
import {PolymerElement} from "../../../node_modules/@polymer/polymer/polymer-element";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import Observe from "../../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";


const html = (template:any) => template.toString();

class PlateDrawing extends PolymerElement {
    @Property()
    weight:number;

    static get template() {
        return html`
        <style>
        --app-primary-color: var(--paper-light-blue-400);
            --primary-color: var(--app-primary-color);
            --app-dark: var(--paper-grey-100);
            --app-grey-1: var(--paper-grey-100);
            --app-grey-2: var(--paper-grey-300);
            --app-grey-3: var(--paper-grey-500);
            --app-grey-4: var(--paper-grey-800);
            --app-text-color: var(--paper-grey-700);
            :host {
                width: 20px;
                height: 20px;
                background-color: var(--app-grey-4);
                border: 1px solid var(--paper-grey-700);
                border-radius: 2px;
                color: var(--app-grey-1);
                @apply --paper-font-caption;
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-justified;
                transition: .6s ease;
            }
        </style>
        <div>[[weight]]</div>
        `
    }

    @Observe('weight')
    protected _weightChanged(weight:number){
        if (weight) {
            if (weight >= 25)
                (this as any).style.height = `${weight * 2.2}px`;
        
            if (weight === 10)
                (this as any).style.height = `${weight * 6}px`;
        
            if (weight <= 5)
                (this as any).style.height = `${weight * 10}px`;
        }
            
    }

}

customElements.define('plate-drawing', PlateDrawing);

export {PlateDrawing};