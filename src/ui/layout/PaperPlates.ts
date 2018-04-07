import {PolymerElement} from "../../../node_modules/@polymer/polymer/polymer-element";
import Property from "../../../node_modules/@leavittsoftware/polymer-ts/property-decorator";
import "../../../node_modules/@polymer/iron-pages/iron-pages.js";
import "../../../node_modules/@polymer/paper-tabs/paper-tabs.js";
import "../../../node_modules/@polymer/paper-tabs/paper-tab.js";
import "../../../node_modules/@polymer/paper-button/paper-button.js";
import "../../../node_modules/@polymer/paper-slider/paper-slider.js";
import "../../../node_modules/@polymer/iron-icon/iron-icon.js";
import "../../../node_modules/@polymer/iron-iconset-svg/iron-iconset-svg.js";
import Observe from "../../../node_modules/@leavittsoftware/polymer-ts/observe-decorator";

import "../../styles/shared-styles";


import "./PlateDrawing";
import "./DumbbellDrawing";


const html = (template:any) => template.toString();

class PaperPlates extends PolymerElement {
    @Property()
    amount: number;

    @Property()
    barbellWeight: number = 45;

    @Property()
    isReps: boolean;

    @Property()
    plates: Array<number> = [];

    @Property()
    flippedBarbellPlates: Array<number>;

    @Property()
    barbellPlates: Array<number>;

    @Property()
    plateAmounts: Array<number> = [45, 35, 25, 10, 5, 2.5];

    @Property()
    dumbbellAmounts: Array<number> = [2.5, 5, 7.5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 160];

    @Property()
    entryType: string = 'barbell';

    @Property()
    dumbbellSliderIndex: number;

    @Property()
    maxDumbbellIndex: number;

    @Property()
    hasChanges: boolean;

    @Property()
    saveAmount:(amount:number)=>{};

    static get template() {
        return html`
            <style include="shared-styles">

            :host {
                @apply --layout-flex-auto;
                @apply --layout-vertical;
            }

            paper-tabs {
                display: block;
                overflow: initial;
                --paper-tabs-selection-bar-color: var(--paper-purple-100);
            }

            paper-tab {
                --paper-tab-ink: var(--app-primary-color);
                background-color: var(--app-primary-color);
                color: var(--app-text-color);
            }

            paper-tabs[no-bar] paper-tab.iron-selected {
                color: var(--app-primary-color);
            }

            .button-container {
                background-color: var(--primary-color);
                @apply --layout-vertical;
                @apply --shadow-elevation-2dp;
            }

            .button-container-row {
                @apply --layout-flex-auto;
                @apply --layout-horizontal;
            }

            .button-container-row>paper-button {
                @apply --layout-flex-auto;
                @apply --paper-font-title;
                color: var(--app-grey-1);
                margin: 0;
            }

            .draw-area {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-flex-4;
                min-height: 128px;
                margin: 16px;
            }

            .plate-draw-area {
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-center-center;
                min-height: 128px;
                margin: 16px;
            }

            .dumbbell-draw-area {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-center-center;
                min-height: 128px;
                margin: 16px;
            }

            iron-pages>div {
                @apply --layout-vertical;
                @apply --layout-flex-auto;
                height: calc(100vh - 112px);
            }

            iron-pages>div.reduced-iron-page-height {
                height: calc(100vh - 64px);
            }

            .spacer {
                @apply --layout-flex-auto;
                background-color: var(--app-grey-1);
            }

            .total-weight-area {
                @apply --layout-horizontal;
                @apply --layout-center-center;
                @apply --layout-flex-3;
                min-height: 128px;
                background-color: var(--app-grey-1);
                color: var(--app-text-color);
            }

            .total-weight-area-amount {
                @apply --layout-self-center;
                @apply --paper-font-display3;
            }

            .barbell-button {
                @apply --layout-flex-2;
            }

            .barbell {
                background-color: var(--app-grey-3);
                min-height: 10px;
                @apply --layout-flex;
            }

            .action {
                @apply --layout-horizontal;
                @apply --layout-end;
                @apply --layout-end-justified;
                position: fixed;
                bottom: 8px;
                right: 8px;
            }

            iron-pages>div {
                @apply --layout-vertical;
                @apply --layout-flex-auto;
            }

            paper-slider {
                --paper-slider-knob-color: var(--app-primary-color);
                --paper-slider-active-color: var(--app-primary-color);
                --paper-slider-pin-color: var(--app-primary-color);
                --paper-slider-height: 4px;
                --paper-slider-markers-color: transparent;
                --paper-slider-knob-start-color: var(--app-primary-color);
                --paper-slider-knob-start-border-color: var(--app-primary-color);
                width: 100%;
                margin-top: 32px;
            }

            .plate-amounts {
                @apply --layout-center-center;
                margin: 16px auto;
            }

            .plate {
                background-color: var(--app-grey-4);
                color: var(--app-grey-1);
                @apply --paper-font-caption;
                width: 30px;
                min-width: 0;
                height: 80px;
            }

            .plate:nth-child(1) {
                height: 120px;
            }

            .plate:nth-child(2) {
                height: 100px;
            }

            .plate:nth-child(3) {
                height: 80px;
            }

            .plate:nth-child(4) {
                height: 60px;
            }

            .plate:nth-child(5) {
                height: 40px;
            }

            .plate:nth-child(6) {
                height: 30px;
            }

                .hidden {
                    display:none:!important;
                }
            </style>
            <iron-iconset-svg name="inline">
                <svg>
                    <defs>
                        <g id="backspace">
                        <path d="M22,3H7C6.31,3 5.77,3.35 5.41,3.88L0,12L5.41,20.11C5.77,20.64 6.31,21 7,21H22A2,2 0 0,0 24,19V5A2,2 0 0,0 22,3M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12"/>
                        </g>
                    </defs>
                </svg>
            </iron-iconset-svg>

            <paper-tabs no-bar attr-for-selected="name" selected="{{entryType}}">
                <paper-tab name="barbell">Barbell</paper-tab>
                <paper-tab name="dumbbell">Dumbbell</paper-tab>
                <paper-tab name="manual">Manual</paper-tab>
            </paper-tabs>
            <iron-pages selected="[[entryType]]" attr-for-selected="name" fallback-selection="main">
                <div name="barbell">
                    <div class="draw-area">
                        <dom-repeat items="[[flippedBarbellPlates]]">
                            <plate-drawing plate="[[item]]" on-tap="removeBarbellPlate"></plate-drawing>
                        </dom-repeat>
                        <div class="barbell"></div>
                        <dom-repeat items="[[barbellPlates]]">
                            <plate-drawing plate="[[item]]" on-tap="removeBarbellPlate"></plate-drawing>
                        </dom-repeat>
                    </div>
                    <div class="total-weight-area-amount">[[amount]]</div>
                    <div class="plate-amounts">
                        <dom-repeat items="[[plateAmounts]]">
                            <paper-button class="plate" on-tap="addBarbellPlate">[[item]]</paper-button>
                        </dom-repeat>
                    </div>
                    <div class="spacer"></div>
                    <paper-button class="flat-button-primary" on-tap="okButton">OK</paper-button>
                </div>
                <div name="dumbbell">
                    <div class="dumbbell-draw-area">
                        <dumbbell-drawing weight="[[amount]]"></dumbbell-drawing>
                    </div>
                    <paper-slider snaps value="{{dumbbellSliderIndex}}" id="dumbbellSlider" immediate-value="{{dumbbellSliderIndex}}" min="0"
                        max="[[maxDumbbellIndex]]"></paper-slider>
                    <div class="spacer"></div>
                    <paper-button class="flat-button-primary" on-tap="okButton">OK</paper-button>
                </div>
                <div name="manual" class$="[[calculateIronPageHeightClass(isReps)]]">
                    <div class="total-weight-area">
                        <div class="total-weight-area-amount">[[amount]]</div>
                    </div>
                    <div class="spacer"></div>
                    <div class="button-container">
                        <div class="button-container-row">
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="1">1</paper-button>
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="2">2</paper-button>
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="3">3</paper-button>
                        </div>
                        <div class="button-container-row">
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="4">4</paper-button>
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="5">5</paper-button>
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="6">6</paper-button>
                        </div>
                        <div class="button-container-row">
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="7">7</paper-button>
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="8">8</paper-button>
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="9">9</paper-button>
                        </div>
                        <div class="button-container-row">
                            <paper-button class="flat-button-primary" on-tap="clear">
                                <iron-icon icon="inline:backspace"></iron-icon>
                            </paper-button>
                            <!-- <paper-button class="flat-button-primary" on-tap="decrement">-</paper-button> -->
                            <paper-button class="flat-button-primary" on-tap="addDigit" value="0">0</paper-button>
                            <!-- <paper-button class="flat-button-primary" on-tap="increment">+</paper-button> -->
                            <paper-button class="flat-button-primary" on-tap="okButton">OK</paper-button>
                        </div>
                        <div class="button-container-row">
                            <!-- <paper-button class="flat-button-primary" on-tap="addDigit" value=".">.</paper-button> -->
                        </div>
                    </div>
                </div>
            </iron-pages>
        `
    }

    okButton() {
        if (this.hasChanges) {
            this.saveAmount(this.amount);
        }
        this.hasChanges = false;
        //TODO:exit paper-plates without saving
    }

    @Observe('amount')
    weightChanged(weight: number) {
        if (weight) {
            let dumbbellSliderIndex = this.dumbbellAmounts.indexOf(parseInt(weight.toString(), 10));
            if (dumbbellSliderIndex > -1) {
                this.dumbbellSliderIndex = dumbbellSliderIndex;
            }
            this.barbellWeight = parseInt(this.barbellWeight.toString());
            let barbellPlates:Array<any> = [];
            let plates:Array<any> = [];
            let remainingBarbellWeight = weight - this.barbellWeight;

            let plateAmountIndex = 0;
            while (remainingBarbellWeight > 0 && plateAmountIndex < this.plateAmounts.length) {
                let plateToAdd = this.plateAmounts[plateAmountIndex];
                if (remainingBarbellWeight < plateToAdd * 2) {
                    plateAmountIndex += 1;
                } else {
                    barbellPlates.push({ weight: plateToAdd });
                    remainingBarbellWeight -= (plateToAdd * 2);
                }
            }
            super.set('barbellPlates', barbellPlates);
            super.set('flippedBarbellPlates', barbellPlates.slice().reverse());

            let remainingWeight = weight;
            plateAmountIndex = 0;
            while (remainingWeight > 0 && plateAmountIndex < this.plateAmounts.length) {
                let plateToAdd = this.plateAmounts[plateAmountIndex];
                if (remainingWeight < plateToAdd) {
                    plateAmountIndex += 1;
                } else {
                    plates.push({ weight: plateToAdd });
                    remainingWeight -= plateToAdd;
                }
            }
            super.set('plates', plates.reverse());
        }
    }

    addPlate(e:any) {
        let plateAmount: number = e.model.item;
        super.set('amount', this.amount * 1 + plateAmount);
        this.hasChanges = true;
    }

    removePlate(e:any) {
        let weight = e.model.item;
        super.set('amount', this.amount * 1 - weight);
        this.hasChanges = true;
    }

    addBarbellPlate(e:any) {
        let plateAmount: number = e.model.item;
        super.set('amount', Math.max(this.amount * 1 + plateAmount * 2, this.barbellWeight * 1 + plateAmount * 2));
        this.hasChanges = true;
    }

    removeBarbellPlate(e:any) {
        let weight = e.model.item;
        super.set('amount', this.amount * 1 - weight * 2);
        this.hasChanges = true;
    }

    addDigit(e:any) {
        let digit = e.currentTarget.getAttribute('value');
        super.set('amount', Number((this.amount || '').toString() + digit));
        this.hasChanges = true;
    }

    selectDumbbell(e:any) {

    }

    increment() {
        super.set('amount', parseInt(this.amount.toString() || '0', 10) + 5);
        this.hasChanges = true;
    }

    decrement() {
        super.set('amount', Math.max(parseInt(this.amount.toString() || '0', 10) - 5, 0));
        this.hasChanges = true;
    }

    clear() {
        if (!this.amount)
            return;
        let amount = this.amount.toString();
        amount = amount.substr(0, amount.length - 1);
        super.set('amount', parseInt(amount, 10) || null);
        this.hasChanges = true;
    }

    open() {
        super.$.dialog.open();
    }

    connectedCallback() {
        super.connectedCallback();
    }


}

customElements.define('paper-plates', PaperPlates);

export {PaperPlates};