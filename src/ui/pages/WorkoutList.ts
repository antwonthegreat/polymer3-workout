import {appState} from "../../state/store";
import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import {connectToRedux, ReduxBindable} from "../util/ReduxConnector";
import {workoutSummaryWithLiftNamesSelector} from "../../state/reducers/workout-summary-reducer";

import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import "../layout/WorkoutSummaryListItem";

const html = (template:any) => template.toString();

class WorkoutList extends PolymerElement implements ReduxBindable {
    @Property()
    workoutSummaries:Array<WorkoutSummary>;

    @Property()
    IOS = false;

    static get template() {
        return html`
            <style>
                workout-summary-item {
                    display:flex;
                    flex-direction:column;
                    padding-bottom:8px;
                    pointer-events: none;
                }
            </style>
            <div>
                <dom-repeat items="[[workoutSummaries]]" as="workoutSummary" restamp>
                    <template>
                        <workout-summary-list-item on-click="_workoutSummarySelected">
                            <div slot="header">
                                [[workoutSummary.name]]
                            </div>
                            <div slot="content">
                                <ul>
                                    <dom-repeat items="[[workoutSummary.liftTypeNames]]" as="liftTypeName">
                                        <template>
                                            <li>[[liftTypeName]]</li>
                                        </template>
                                    </dom-repeat>
                                </ul>
                            </div>
                            <div slot="footer">
                                <moment-js date="[[workoutSummary.startDate]]" from-now></moment-js>
                            </div>                        
                        </workout-summary-list-item>
                    </template>
                </dom-repeat>
            </div>
        `
    }

    _workoutSummarySelected(event:any){
        let workoutSummary = event.model.item;
        // appState.dispatch(selectChallenge(challenge.id))
    }

    connectedCallback() {
        super.connectedCallback();
        this.IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        connectToRedux(this);
    }

    stateReceiver(state:any) {
        this.workoutSummaries = workoutSummaryWithLiftNamesSelector(state);
        console.log(this.workoutSummaries);
    }


}

customElements.define('workout-list', WorkoutList);

export {WorkoutList};