import {Element as PolymerElement} from "@polymer/polymer/polymer-element";

const html = (template:any) => template.toString();

class WorkoutSummaryListItem extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    @apply --layout-vertical;
                }

                paper-item {
                    @apply --layout-vertical;
                    @apply --layout-start;
                    padding: 8px;
                    background-color: var(--app-grey-1);
                    border-bottom: 1px solid var(--app-grey-2);
                    pointer-events: none;
                }

                paper-item>* {
                    // pointer-events: none;
                    padding-left: 8px;
                }

                .header-container ::slotted(*) {
                    @apply --paper-font-subhead;
                    color: var(--app-primary-color);
                }

                .content-container ::slotted(*) {
                    @apply --paper-font-caption;
                }

                .content-container ::slotted(ul) {
                    margin: 4px;
                    padding: 0 16px;
                }

                .footer-container ::slotted(*) {
                    @apply --paper-font-caption;
                }
            </style>

            <paper-item>
                <!-- <paper-ripple></paper-ripple> -->
                <div class="header-container">
                    <slot name="header"></slot>
                </div>
                <div class="footer-container">
                    <slot name="footer"></slot>
                </div>
                <div class="content-container">
                    <slot name="content"></slot>
                </div>
            </paper-item>
        `
    }
}

customElements.define('workout-summary-list-item', WorkoutSummaryListItem);

export {WorkoutSummaryListItem};