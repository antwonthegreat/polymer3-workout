import {appState} from "../../state/store";
import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import {connectToRedux, ReduxBindable} from "../util/ReduxConnector";
import {workoutSummaryWithLiftNamesSelector} from "../../state/reducers/workout-summary-reducer";

import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import "../layout/WorkoutSummaryListItem";
import { selectWorkoutAsync, selectWeight,selectRep, updateSelectedWorkoutSetWeightAsync, updateSelectedWorkoutSetRepsAsync, deleteSetAsync } from "../../state/actions/Actions";
import { selectedWorkoutSelector,selectedWorkoutSetSelector } from "../../state/reducers/selected-workout-reducer";
import Observe from "../../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";
import "../../../node_modules/@polymer/iron-pages/iron-pages.js";
import "../layout/LiftListItem";
import "../layout/PaperPlates";
import { WorkoutSetListItem } from "../layout/WorkoutSetListItem";

const html = (template:any) => template.toString();

class EditWorkout extends PolymerElement implements ReduxBindable {
    @Property()
    workout:Workout|null;

    @Property()
    selectedWorkoutSet:WorkoutSet|null;

    @Property()
    selectWeight:any;

    @Property()
    selectRep:any;

    @Property()
    workoutId:string;

    @Property()
    page:string

    @Property()
    saveWeight = (weight:number)=>{
        appState.dispatch(updateSelectedWorkoutSetWeightAsync(weight));
    }

    @Property()
    saveReps = (reps:number)=>{
        appState.dispatch(updateSelectedWorkoutSetRepsAsync(reps));
    }

    @Property()
    deleteSet = (key:string,liftTypeKey:string)=>{
        appState.dispatch(deleteSetAsync(key,liftTypeKey));
    };

    static get template() {
        return html`
            <style>
                :host {
                    display:flex;
                    flex-direction:column;
                }
            </style>
            <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="main">
                <main name="main">
                    <workout-name>[[workout.name]]</workout-name>
                    <lifts-header>Lifts</lifts-header>
                    <dom-repeat items="[[workout.lifts]]" as="lift" restamp>
                        <template>
                            <lift-list-item lift="[[lift]]" select-rep="[[selectRep]]" select-weight="[[selectWeight]]" delete-set="[[deleteSet]]"></lift-list-item>
                        </template>
                    </dom-repeat>
                </main>
                <paper-plates name="rep" save-amount="[[saveReps]]" amount="[[selectedWorkoutSet.reps]]"  is-reps></paper-plates>
                <paper-plates name="weight" save-amount="[[saveWeight]]" amount="[[selectedWorkoutSet.weight]]"></paper-plates>
            </iron-pages>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.selectWeight = this._selectWeight;
        this.selectRep = this._selectRep;
        connectToRedux(this);
    }


    stateReceiver(state:AppStateModel) {
        if(state.navigation && state.navigation.route && state.navigation.route.indexOf('edit-workout') !== -1){
            this.workoutId = state.navigation.route.split('/')[3];
            this.page = state.selectedWorkout.editMode;
        }

        this.selectedWorkoutSet = selectedWorkoutSetSelector(state);
        this.workout = selectedWorkoutSelector(state);
    }

    _selectWeight(workoutSet:WorkoutSet,liftTypeKey:string){
        appState.dispatch(selectWeight(workoutSet,liftTypeKey));
    }

    _selectRep(workoutSet:WorkoutSet,liftTypeKey:string){
        appState.dispatch(selectRep(workoutSet,liftTypeKey));
    }

    @Observe('workoutId')
    workoutIdChanged(workoutId:string){
        appState.dispatch(selectWorkoutAsync(workoutId));
    }

}

customElements.define('edit-workout', EditWorkout);

export {EditWorkout};