var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './filter-list';
import './file-format-selector';
import './data-connectors';
import './time-selector';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { deepCopy } from './utils';
export var TwoWeekPollutants;
(function (TwoWeekPollutants) {
    TwoWeekPollutants["Benzene"] = "Benzene";
})(TwoWeekPollutants || (TwoWeekPollutants = {}));
export var ContinuousPollutants;
(function (ContinuousPollutants) {
    ContinuousPollutants["One_Three_Butadiene"] = "1,3 Butadiene";
    ContinuousPollutants["One_Two_Three_Trimethylbenzene"] = "1,2,3 trimethylbenzene";
    ContinuousPollutants["One_Two_Four_Trimethylbenzene"] = "1,2,4 trimethylbenzene";
    ContinuousPollutants["One_Three_Five_Trimethylbenzene"] = "1,3,5 trimethylbenzene";
    ContinuousPollutants["Two_Two_Four_Trimethylpentane"] = "2,2,4 trimethylpentane";
    ContinuousPollutants["Three_Methylpentane"] = "3-Methylpentane";
    ContinuousPollutants["Acetaldehyde"] = "Acetaldehyde";
    ContinuousPollutants["Acrolein"] = "Acrolein";
    ContinuousPollutants["Ammonia"] = "Ammonia";
    ContinuousPollutants["Benzene"] = "Benzene";
    ContinuousPollutants["Black_Carbon"] = "Black carbon";
    ContinuousPollutants["Butane"] = "Butane";
    ContinuousPollutants["Carbon_Disulfide"] = "Carbon Disulfide";
    ContinuousPollutants["Carbonyl_Sulfide"] = "Carbonyl Sulfide";
    ContinuousPollutants["Carbon_Monoxide"] = "Carbon monoxide";
    ContinuousPollutants["Ethane"] = "Ethane";
    ContinuousPollutants["Ethanol"] = "Ethanol";
    ContinuousPollutants["Ethylbenzene"] = "Ethylbenzene";
    ContinuousPollutants["Ethylene"] = "Ethylene";
    ContinuousPollutants["Formaldehyde"] = "Formaldehyde";
    ContinuousPollutants["Hydrogen_Cyanide"] = "Hydrogen cyanide";
    ContinuousPollutants["Hydrogen_Flouride"] = "Hydrogen flouride";
    ContinuousPollutants["Hydrogen_Sulfide"] = "Hydrogen sulfide";
    ContinuousPollutants["Mercaptan"] = "Mercaptan";
    ContinuousPollutants["Methane"] = "Methane";
    ContinuousPollutants["MTBE"] = "MTBE";
    ContinuousPollutants["N_Heptane"] = "n-Heptane";
    ContinuousPollutants["N_Hexane"] = "n-Hexane";
    ContinuousPollutants["N_Octane"] = "n-Octane";
    ContinuousPollutants["Nitrogen_Dioxide"] = "Nitrogen dioxide";
    ContinuousPollutants["Nitrous_Oxide"] = "Nitrous oxide";
    ContinuousPollutants["Ozone"] = "Ozone";
    ContinuousPollutants["Pentane"] = "Pentane";
    ContinuousPollutants["PM2_5"] = "PM2.5";
    ContinuousPollutants["Propane"] = "Propane";
    ContinuousPollutants["Styrene"] = "Styrene";
    ContinuousPollutants["Sulfur_Dioxide"] = "Sulfur Dioxide";
    ContinuousPollutants["Toluene"] = "Toluene";
    ContinuousPollutants["Xylene"] = "Xylene";
    ContinuousPollutants["M_xylene"] = "m-xylene";
    ContinuousPollutants["O_xylene"] = "o-xylene";
    ContinuousPollutants["P_xylene"] = "p-xylene";
})(ContinuousPollutants || (ContinuousPollutants = {}));
export var DataSourceEvent;
(function (DataSourceEvent) {
    DataSourceEvent["REQUEST_CLOSE"] = "request-close";
    DataSourceEvent["REQUEST_DOWNLOAD"] = "request-download";
    DataSourceEvent["REQUEST_EXPAND"] = "request-expand";
})(DataSourceEvent || (DataSourceEvent = {}));
let DataSourceElement = class DataSourceElement extends LitElement {
    constructor() {
        super(...arguments);
        this.data = {
            name: "",
            tags: new Set([]),
            startTime: new Date(0),
            endTime: new Date(0),
            address: "",
            city: "",
            state: "",
            company: "",
            twoWeekPollutants: [],
            continuousPollutants: [],
            ranking: 0,
            benzeneConcentration: 0,
            benzeneWeeksExceeding: 0,
        };
        this.asPopup = false;
        this.selectedStartTime = new Date(0);
        this.selectedEndTime = new Date(0);
    }
    firstUpdated() {
        this.selectedStartTime = new Date(this.data.startTime);
        this.selectedEndTime = new Date(this.data.endTime);
    }
    render() {
        if (this.asPopup) {
            return this.renderPopup();
        }
        else {
            return this.renderRefineryPage();
        }
    }
    renderPopup() {
        return html `
            <article>
                ${this.renderDescription()}
            </article>
        `;
    }
    renderDescription() {
        return html `
            <h3>${this.data.name}</h3>
        `;
    }
    renderTimeSummary() {
        function summarizeDate(d) {
            const year = d.getFullYear();
            const date = d.getDate();
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            const monthIndex = d.getMonth();
            const monthName = months[monthIndex];
            return `${monthName} ${date}, ${year}`;
        }
        let startTime = this.data.startTime;
        let endTime = this.data.endTime;
        return html `<section>
            <p>
                <span>Time Range:</span>
                ${summarizeDate(startTime)} to ${summarizeDate(endTime)}
            </p>
        </section>`;
    }
    renderRefineryPage() {
        return html `
            <article>
                <div class="row button-container">
                    <div class="row close-container">
                        <paper-icon-button
                            icon="icons:close"
                            @click="${() => {
            this.dispatchEvent(new CustomEvent(DataSourceEvent.REQUEST_CLOSE));
        }}">
                        </paper-icon-button>
                        <h3>${this.data.name}</h3>
                    </div>
                    <div class="row">
                        <paper-button
                            @click="${this.requestQueue}">
                            Add to Queue
                        </paper-button>
                        <file-format-download></file-format-download>
                    </div>
                </div>
                ${this.renderTimeSummary()}
                <time-selector
                  .startTime="${this.data.startTime}"
                  .endTime="${this.data.endTime}"
                  @set-time=${(e) => {
            this.selectedStartTime = e.detail[0];
            this.selectedEndTime = e.detail[1];
        }}
                ></time-selector>
            </article>`;
    }
    requestQueue() {
        const data = deepCopy(this.data);
        data.startTime = this.selectedStartTime;
        data.endTime = this.selectedEndTime;
        this.dispatchEvent(new CustomEvent(DataSourceEvent.REQUEST_DOWNLOAD, {
            detail: data,
            bubbles: true,
            composed: true
        }));
    }
};
DataSourceElement.styles = css `
        article {
            background-color: #e6e4e4;
            border-radius: 8px;
            margin: 15px;
            padding: 30px;
        }

        h3 {
            margin: 0;
        }

        span.title {
            font-weight: bold;
        }

        .row {
            align-items: center;
            display: flex;
            justify-content: space-between;
        }

        section > p > span {
            font-weight: bold;
        }

        .tag {
            background-color: springgreen;
            color: white;
            display: inline-block;
            margin: 2px;
            padding: 5px;
            text-decoration: none;
            border-radius: 8px;
        }

        .button-container {
            margin-top: -20px;
        }

        .close-container {
            margin-left: -20px;
        }
    `;
__decorate([
    property({ type: Object })
], DataSourceElement.prototype, "data", void 0);
__decorate([
    property({ type: Boolean })
], DataSourceElement.prototype, "asPopup", void 0);
__decorate([
    property({ type: Object })
], DataSourceElement.prototype, "selectedStartTime", void 0);
__decorate([
    property({ type: Object })
], DataSourceElement.prototype, "selectedEndTime", void 0);
DataSourceElement = __decorate([
    customElement('data-source')
], DataSourceElement);
export { DataSourceElement };
//# sourceMappingURL=data-source.js.map