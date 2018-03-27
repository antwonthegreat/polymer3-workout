import {PolymerElement} from "../../../node_modules/@polymer/polymer/polymer-element";
import "../../../node_modules/@polymer/paper-listbox/paper-listbox.js";
import "../../../node_modules/@polymer/paper-item/paper-item.js";
import "../../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "../../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";
import "../../../node_modules/@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "../../../node_modules/@polymer/paper-button/paper-button.js";

import {appState} from "../../state/store";
import {connectToRedux, ReduxBindable} from "../util/ReduxConnector";
import { activeLiftTypeSelector } from "../../state/reducers/lift-type-reducer";
import { workoutTypeSelector } from "../../state/reducers/workout-type-reducer";
import { addLiftAsync } from "../../state/actions/Actions";

import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import Observe from "../../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";

const html = (template:any) => template.toString();

class AddLift extends PolymerElement implements ReduxBindable {
    @Property()
    activeLiftTypes:Array<LiftType>;

    @Property()
    workoutTypes:Array<WorkoutType>;

    @Property()
    workoutTypeKey:string;

    @Property()
    liftTypeKey:string;
    
    @Property()
    state:AppStateModel;

    @Observe('workoutTypeKey')
    workoutTypeKeyChanged(workoutTypeKey:string){
        this.activeLiftTypes = activeLiftTypeSelector(this.state,workoutTypeKey);
    }

    static get template() {
        return html`
            <style>
                :host {
                    @apply --layout-vertical;
                }
                
                [hidden] {
                    display:none !important;
                }
            </style>
            <iron-iconset-svg name="inline">
                <svg>
                    <defs>
                        <g id="done">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </g>
                    </defs>
                </svg>
            </iron-iconset-svg>
            <paper-dropdown-menu no-animations label="Muscle Group" dynamic-align>
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected="{{workoutTypeKey}}" attr-for-selected="value">
                    <dom-repeat items="[[workoutTypes]]">
                        <template>
                            <paper-item value="[[item.key]]">[[item.name]]</paper-item>
                        </template>
                    </dom-repeat>
                </paper-listbox>
            </paper-dropdown-menu>
            <paper-dropdown-menu no-animations label="Lift Type" dynamic-align>
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected="{{liftTypeKey}}" attr-for-selected="value">
                    <dom-repeat items="[[activeLiftTypes]]">
                        <template>
                            <paper-item value="[[item.key]]">
                                <lift-type-name>[[item.name]]</lift-type-name>
                                <paper-icon-button icon="inline:done" hidden$="[[!item.completed]]"></paper-icon-button>
                            </paper-item>
                        </template>
                    </dom-repeat>
                </paper-listbox>
            </paper-dropdown-menu>
            <paper-button on-click="_cancel">Cancel</paper-button>
            <paper-button on-click="_add">Add Lift</paper-button>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        connectToRedux(this);
    }

    stateReceiver(state: any) {
        this.state = state;
        this.workoutTypes = workoutTypeSelector(state);
        if (this.workoutTypeKey) {
            this.activeLiftTypes = activeLiftTypeSelector(this.state, this.workoutTypeKey);
        }    
    }

    protected _cancel() {
        (this as any).dispatchEvent(new CustomEvent('add-lift-canceled', {composed: true, bubbles: true} as any));
    }

    protected _add() {
        if (this.liftTypeKey) {
            appState.dispatch(addLiftAsync(this.liftTypeKey,new Date()));
        }
        (this as any).dispatchEvent(new CustomEvent('lift-added', {composed: true, bubbles: true} as any));
    }

}

customElements.define('add-lift', AddLift);

export {AddLift};