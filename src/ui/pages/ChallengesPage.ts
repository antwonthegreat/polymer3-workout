import {appState} from "../../state/store";
import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import {connectToRedux, ReduxBindable} from "../util/ReduxConnector";
import {selectChallenge} from '../../state/actions/Actions.js';
import {challengesSelector} from '../../state/reducers/challenges-reducer';

import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";

const html = (template:any) => template.toString();

class ChallengesPage extends PolymerElement implements ReduxBindable {
    @Property()
    challenges:any = appState.getState().challenges;

    static get template() {
        return html`
            <style>
                challenge {
                    display:flex;
                    flex-direction:column;
                    padding-bottom:8px;
                } 
            </style>
            <div id="challengespage">
                <dom-repeat items="[[challenges]]" restamp>
                    <template>
                        <challenge on-click="_challengeSelected">
                            <challenge-title>[[item.title]]</challenge-title>
                            <description>[[item.description]]</description>
                            <points>[[item.points]] points</points>
                        </challenge>
                    </template>
                </dom-repeat>
            </div>
        `
    }

    _challengeSelected(event:any){
        let challenge = event.model.item;
        appState.dispatch(selectChallenge(challenge.id))
    }

    connectedCallback() {
        super.connectedCallback();
        connectToRedux(this);
    }

    stateReceiver(state:any) {
        this.challenges = challengesSelector(state);
    }


}

customElements.define('challenges-page', ChallengesPage);

export {ChallengesPage};