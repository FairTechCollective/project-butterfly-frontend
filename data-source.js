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
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export var DataSourceEvent;
(function (DataSourceEvent) {
    DataSourceEvent["REQUEST_EXPAND"] = "request-expand";
    DataSourceEvent["REQUEST_CLOSE"] = "request-close";
})(DataSourceEvent || (DataSourceEvent = {}));
let DataSourceElement = class DataSourceElement extends LitElement {
    constructor() {
        super(...arguments);
        this.data = {
            title: "",
            description: "",
            tags: new Set([]),
            startTime: new Date(0),
            endTime: new Date(0),
            filters: [],
        };
        this.expand = false;
        this.hide = false;
        this.showTags = new Set([]);
        this.forExport = false;
        this.selectedStartTime = new Date(0);
        this.selectedEndTime = new Date(0);
    }
    render() {
        if ((this.hide && !this.expand) || this.showTags.size &&
            ![...this.data.tags].filter(x => this.showTags.has(x)).length) {
            return nothing;
        }
        else if (this.expand) {
            return this.renderModal();
        }
        else {
            return this.renderSummary();
        }
    }
    renderSummary() {
        return html `
            <article>
                <h3>${this.data.title}</h3>
                <p>${this.data.description}</p>
                ${this.renderFilterSummary(this.forExport)}
                ${this.renderTimeSummary(this.forExport)}
                ${this.renderSummaryButtons()}
            </article>
        `;
    }
    renderFilterSummary(showChecked) {
        const summary = [];
        const findLeafTags = (filters, labels) => {
            for (const filter of filters) {
                if (filter.options.length) {
                    findLeafTags(filter.options, labels);
                }
                else {
                    if (!showChecked || filter.checked) {
                        labels.push(html `<a class="tag" href="#">
                                ${filter.label}
                            </a>`);
                    }
                }
            }
        };
        for (const source of this.data.filters) {
            const labels = [];
            findLeafTags(source.filters, labels);
            summary.push(html `<p>
                <span>${source.header}: </span>
                ${labels}
            </p>`);
        }
        return html `<section>
            ${summary}
        </section>`;
    }
    renderTimeSummary(showSelectedTime) {
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
        let endTime = this.data.startTime;
        if (showSelectedTime) {
            startTime = this.selectedStartTime;
            endTime = this.selectedEndTime;
        }
        return html `<section>
            <p>
                <span>Time Range:</span>
                ${summarizeDate(startTime)} to ${summarizeDate(endTime)}
            </p>
        </section>`;
    }
    renderSummaryButtons() {
        let buttons = html `<paper-button
            @click="${() => {
            this.dispatchEvent(new CustomEvent(DataSourceEvent.REQUEST_EXPAND));
        }}">Select</paper-button>`;
        if (this.forExport) {
            buttons = html `<paper-button>Download</paper-button>`;
        }
        return buttons;
    }
    renderModal() {
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
                        <h3>${this.data.title}</h3>
                    </div>
                    <div class="row">
                        <paper-button>Add to Queue</paper-button>
                        <paper-button>Download Now <iron-icon icon="icons:arrow-drop-down"></iron-icon></paper-button>
                    </div>
                </div>
                <p>${this.data.description}</p>
                <filter-list
                    .filters="${this.data.filters}">
                </filter-list>
            </article>`;
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
], DataSourceElement.prototype, "expand", void 0);
__decorate([
    property({ type: Boolean })
], DataSourceElement.prototype, "hide", void 0);
__decorate([
    property({ type: Object })
], DataSourceElement.prototype, "showTags", void 0);
__decorate([
    property({ type: Boolean })
], DataSourceElement.prototype, "forExport", void 0);
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