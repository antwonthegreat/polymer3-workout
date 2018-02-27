/// <reference path="../../model/Lift.ts" />
import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import "../../../node_modules/@polymer/iron-icon/iron-icon.js";
import "../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";
import "../../../node_modules/@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "./WorkoutSetListItem";

const html = (template:any) => template.toString();

class LiftListItem extends PolymerElement {
    @Property()
    lift:Lift;

    static get template() {
        return html`
            <style>
                :host {
                    @apply --layout-vertical;
                }

                svg {
                    width:24px;
                    height:24px;
                }

                label-container {
                    @apply --layout-horizontal;
                }

                label {
                    @apply --layout-flex-auto;
                }
            </style>
            <iron-iconset-svg name="inline">
                <svg>
                    <defs>
                        <g id="done">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </g>
                        <g id="close">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </g>
                    </defs>
                </svg>
            </iron-iconset-svg>
            <lift-header>
                <iron-icon icon="inline:[[isComplete(lift.sets.length)]]"></iron-icon>
                <lift-name>[[lift.name]]</lift-name>
                <paper-icon-button icon="inline:close"></paper-icon-button>
            </lift-header>
            <lift-body>
                <personal-best lift="[[lift]]"></personal-best>
                <label-container>
                    <label>[[lift.repLabel]] :</label>
                    <label>[[lift.weightLabel]] :</label>
                </label-container>
                <dom-repeat items="[[lift.sets]]" as="workoutSet" restamp>
                    <template>
                        <workout-set-list-item workout-set="[[workoutSet]]" lift-type-key="[[lift.liftTypeKey]]" select-weight="[[selectWeight]]" select-rep="[[selectRep]]" delete-set="[[deleteSet]]"></workout-set-list-item>
                    </template>
                </dom-repeat>
            </lift-body>
        `
    }

    isComplete(setsCount:number){
        return setsCount ? 'done':'';
    }
}

customElements.define('lift-list-item', LiftListItem);

export {LiftListItem};