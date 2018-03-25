/// <reference path="../custom-types.d.ts"/>

import {appState} from "../state/store";
import {PolymerElement} from "../../node_modules/@polymer/polymer/polymer-element";
import {connectToRedux, ReduxBindable} from "./util/ReduxConnector";
import {navigate, signInIfNeeded, getWorkoutTypesAsync,getLiftTypesAsync, getWorkoutSummariesAsync} from '../state/actions/Actions.js';
import {workoutSummaryWithLiftNamesSelector} from '../state/reducers/workout-summary-reducer'
import "../../node_modules/@polymer/app-route/app-location.js";
import "../../node_modules/@polymer/app-route/app-route.js";
import "../../node_modules/@polymer/iron-pages/iron-pages.js";
import {FirebaseService} from "../services/FirebaseService";

import Property from "../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import Observe from "../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";

import "../ui/pages/WorkoutList";
import "../ui/pages/EditWorkout";

const html = (template:any) => template.toString();

interface PolymerElement {
    set:any
}

class MyApp extends PolymerElement implements ReduxBindable {
    @Property()
    route:any = appState.getState().navigation.route;

    @Property()
    routeData: any;

    @Property()
    currentPage: string;

    @Property()
    uid:string;

    static get template() {
        return html`
        <style is="custom-style">
        html {
            --app-primary-color: #0000FF;
            --primary-color: var(--app-primary-color);
            --app-dark: var(--paper-grey-100);
            --app-grey-1: var(--paper-grey-100);
            --app-grey-2: var(--paper-grey-300);
            --app-grey-3: var(--paper-grey-500);
            --app-grey-4: var(--paper-grey-800);
            --app-text-color: var(--paper-grey-700);
            color: var(--app-text-color);
        }
        </style>
        <app-location route="{{route}}"></app-location>
        <app-route route="[[route]]" pattern="/:page" data="{{routeData}}"></app-route>
        <iron-pages selected="[[currentPage]]" attr-for-selected="name" fallback-selection="workout-list">
            <workout-list name="workout-list"></workout-list>
            <edit-workout name="edit-workout"></edit-workout>
        </iron-pages>
        `
    }

    async connectedCallback() {
        super.connectedCallback();
        connectToRedux(this);
        
        appState.dispatch(signInIfNeeded());
        appState.dispatch(navigate('/workout-list'));
    }

    stateReceiver(state:any) {
        if(state.navigation.route !== this.route.path){
            super.set('route.path', state.navigation.route);
        }
        if(state.user.uid){
            this.uid = state.user.uid;
        }
    }

    @Observe('route.path')
    private _routePathChanged(path:string){
        appState.dispatch(navigate(path));
    }

    @Observe('routeData.page')
    private _pageChanged(page:string){
        this.currentPage = page;
    }

    @Observe('uid')
    userChanged(){
        appState.dispatch(getWorkoutTypesAsync());
        appState.dispatch(getLiftTypesAsync());
        appState.dispatch(getWorkoutSummariesAsync());       
    }
}

customElements.define('my-app', MyApp);

export {MyApp};