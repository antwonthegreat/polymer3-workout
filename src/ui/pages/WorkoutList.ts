import {appState} from "../../state/store";
import {PolymerElement} from "../../../node_modules/@polymer/polymer/polymer-element";
import {connectToRedux, ReduxBindable} from "../util/ReduxConnector";
import {workoutSummaryWithLiftNamesSelector} from "../../state/reducers/workout-summary-reducer";

import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";

import { navigate } from "../../state/actions/Actions";
import * as moment from "../../../node_modules/moment/moment";

const html = (template:any) => template.toString();

class WorkoutList extends PolymerElement implements ReduxBindable {
    @Property()
    workoutSummaries:Array<WorkoutSummary>;

    @Property()
    userId:string;

    @Property()
    IOS = false;

    static get template() {
        return html`
            <style>
                workout-summary-list-item {
                    display:flex;
                    flex-direction:column;
                    padding-bottom:8px;
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
                                [[formatDate(workoutSummary.startDate)]]
                            </div>                        
                        </workout-summary-list-item>
                    </template>
                </dom-repeat>
            </div>
        `
    }

    _workoutSummarySelected(event:any){
        let workoutSummary:WorkoutSummary = event.model.workoutSummary;
        appState.dispatch(navigate(`/edit-workout/${this.userId}/${workoutSummary.id}/`))
    }

    async connectedCallback() {
        super.connectedCallback();
        this.IOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        connectToRedux(this);
        await import("../layout/WorkoutSummaryListItem");
    }

    formatDate(date:string){
        return moment(date).fromNow();
    }

    stateReceiver(state:any) {
        this.userId = state.user.uid;
        this.workoutSummaries = workoutSummaryWithLiftNamesSelector(state);
    }


}

customElements.define('workout-list', WorkoutList);

export {WorkoutList};