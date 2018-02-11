import {appState} from "../state/store";
import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import {connectToRedux, ReduxBindable} from "./util/ReduxConnector";
import {navigate, signInIfNeeded} from '../state/actions/Actions.js';
import "../../node_modules/@polymer/app-route/app-location.js";
import "../../node_modules/@polymer/app-route/app-route.js";
import "../../node_modules/@polymer/iron-pages/iron-pages.js";
import {FirebaseService} from "../services/FirebaseService";

import Property from "../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import Observe from "../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";

const html = (template:any) => template.toString();

class MyApp extends PolymerElement implements ReduxBindable {
    @Property()
    route:any = appState.getState().navigation.route;

    @Property()
    routeData: any;

    @Property()
    currentPage: string;

    static get template() {
        return html`
        <app-location route="{{route}}"></app-location>
        <app-route route="[[route]]" pattern="/:page" data="{{routeData}}"></app-route>
        <iron-pages selected="[[currentPage]]" attr-for-selected="name" fallback-selection="challenges">
            <challenges-page name="challenges"></challenges-page>
            <take-photo name="challenge"></take-photo>
        </iron-pages>
        `
    }

    async connectedCallback() {
        super.connectedCallback();
        connectToRedux(this);
        
        appState.dispatch(signInIfNeeded());
        appState.dispatch(navigate('/test/path'));
    }

    stateReceiver(state:any) {
        if(state.navigation.route !== this.route.path){
            this.set('route.path', state.navigation.route);
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
}

customElements.define('my-app', MyApp);

export {MyApp};