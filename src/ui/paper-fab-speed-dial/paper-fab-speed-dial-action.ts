import {Element as PolymerElement} from "@polymer/polymer/polymer-element";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import "../../../node_modules/@polymer/iron-flex-layout/iron-flex-layout.js";
import "../../../node_modules/@polymer/paper-fab/paper-fab.js";

const html = (template:any) => template.toString();

class PaperFabSpeedDialAction extends PolymerElement {

    @Property()
    icon:string;

    static get template() {
        return html`
        <style>
			:host {
				@apply --layout-horizontal;
				@apply --layout-center;
				@apply --layout-end-justified;
				margin-top: 15px;
				margin-right: 8px;
				/** For IE11: otherwise the label overlays the FAB */
				min-width: 270px;
			}
			.label {
				color: var(--paper-fab-speed-dial-action-label-color, black);
				background: var(--paper-fab-speed-dial-action-label-background, white);
				padding: 5px 10px;
				border-radius: 3px;
				margin-right: 20px;
			}
			.fab {
				--paper-fab-background: var(--paper-fab-speed-dial-action-background);
				--paper-fab-keyboard-focus-background: var(--paper-fab-speed-dial-action-keyboard-focus-background);
			}
			.label,.fab {
				display: inline-block;
			}
		</style>

		<div class="flex"><span class="label"><slot></slot></span></div>
		<paper-fab class="fab" icon=[[icon]] mini></paper-fab>
        `
    }
}

customElements.define('paper-fab-speed-dial-action', PaperFabSpeedDialAction);

export{PaperFabSpeedDialAction};