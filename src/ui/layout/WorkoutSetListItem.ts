/// <reference path="../../model/WorkoutSet.ts" />
import {PolymerElement} from "../../../node_modules/@polymer/polymer/polymer-element";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import "../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";
import "../../../node_modules/@polymer/iron-iconset-svg/iron-iconset-svg.js";
import { deleteSet } from "../../state/actions/Actions";

const html = (template:any) => template.toString();

class WorkoutSetListItem extends PolymerElement {
    @Property()
    workoutSet:WorkoutSet;

    @Property()
    liftTypeKey:string;

    @Property()
    selectWeight:any;

    @Property()
    selectRep:any;

    @Property()
    deleteSet:(key:string,liftTypeKey:string)=>{};

    static get template() {
        return html`
            <style>
                :host {
                    @apply --layout-horizontal;
                }

                reps {
                    @apply --layout-flex-auto;
                }

                weight {
                    @apply --layout-flex-auto;
                }
            </style>
            <iron-iconset-svg name="inline">
                <svg>
                    <defs>
                        <g id="delete">
                            <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                            />
                        </g>
                    </defs>
                </svg>
            </iron-iconset-svg>
            <reps on-click="_selectRep">[[workoutSet.reps]]</reps>
            <weight on-click="_selectWeight">[[workoutSet.weight]]</weight>
            <paper-icon-button on-click="_deleteSet" icon="inline:delete"></paper-icon-button>
        `
    }

    private _selectWeight(){
        this.selectWeight(this.workoutSet,this.liftTypeKey);
    }

    private _selectRep(){
        this.selectRep(this.workoutSet,this.liftTypeKey);
    }

    private _deleteSet(){
        this.deleteSet(this.workoutSet.key,this.liftTypeKey);
    }
}

customElements.define('workout-set-list-item', WorkoutSetListItem);

export {WorkoutSetListItem};