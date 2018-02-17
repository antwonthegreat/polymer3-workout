import {appState} from "../state/store";
import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
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

const html = (template:any) => template.toString();

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
        <app-location route="{{route}}"></app-location>
        <app-route route="[[route]]" pattern="/:page" data="{{routeData}}"></app-route>
        <iron-pages selected="[[currentPage]]" attr-for-selected="name" fallback-selection="workout-list">
            <workout-list name="workout-list"></workout-list>
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
            this.set('route.path', state.navigation.route);
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