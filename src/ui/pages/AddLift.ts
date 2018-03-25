import {PolymerElement} from "../../../node_modules/@polymer/polymer/polymer-element";
import "../../../node_modules/@polymer/paper-listbox/paper-listbox.js";
import "../../../node_modules/@polymer/paper-item/paper-item.js";
import "../../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";

import {appState} from "../../state/store";
import {connectToRedux, ReduxBindable} from "../util/ReduxConnector";
import { activeLiftTypeSelector } from "../../state/reducers/lift-type-reducer";
import { workoutTypeSelector } from "../../state/reducers/workout-type-reducer";

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

    @Observe('workoutTypeKey')
    workoutTypeKeyChanged(workoutTypeKey:string){
        console.log(workoutTypeKey);
    }

    static get template() {
        return html`
            <style>
                
            </style>
            <paper-dropdown-menu no-animations label="Muscle Group">
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected="{{workoutTypeKey}}" attr-for-selected="value">
                    <dom-repeat items="[[workoutTypes]]">
                        <template>
                            <paper-item value="[[item.key]]">[[item.name]]</paper-item>
                        </template>
                    </dom-repeat>
                </paper-listbox>
            </paper-dropdown-menu>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        connectToRedux(this);
    }

    stateReceiver(state:any) {
        this.workoutTypes = workoutTypeSelector(state);
        this.activeLiftTypes = activeLiftTypeSelector(state,'-KQvro6SI4DfN5RsGDd6');
    }


}

customElements.define('add-lift', AddLift);

export {AddLift};