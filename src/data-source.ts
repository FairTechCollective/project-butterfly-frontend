import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import './filter-list';

import {LitElement, TemplateResult, html, css, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {Filter, FilterSource} from './filter-source';

export interface DataSource {
    title: string;
    description: string;
    tags: Set<string>;
    startTime: Date;
    endTime: Date;
    filters: FilterSource[];
}

export enum DataSourceEvent {
    REQUEST_EXPAND='request-expand',
    REQUEST_CLOSE='request-close',
}

@customElement('data-source')
export class DataSourceElement extends LitElement {
    
    @property({type: Object}) data:DataSource = {
        title: "",
        description: "",
        tags: new Set<string>([]),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: [],
    };
    
    @property({type: Boolean}) expand = false;
    @property({type: Boolean}) hide = false;
    @property({type: Object}) showTags = new Set<string>([]);
    @property({type: Boolean}) forExport = false;
    @property({type: Object}) selectedStartTime = new Date(0);
    @property({type: Object}) selectedEndTime = new Date(0);

    static override styles = css`

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

    override render() {
        if ((this.hide && !this.expand) || this.showTags.size && 
            [...this.showTags].some(tag=>!this.data.tags.has(tag))) {
            return nothing;    
        } else if (this.expand) {
            return this.renderModal();
        } else {
            return this.renderSummary();
        }
    }

    renderSummary() {
        return html`
            <article>
                <h3>${this.data.title}</h3>
                <p>${this.data.description}</p>
                ${this.renderFilterSummary(this.forExport)}
                ${this.renderTimeSummary(this.forExport)}
                ${this.renderSummaryButtons()}
            </article>
        `;
    }

    renderFilterSummary(showChecked: boolean) {
        const summary: TemplateResult[] = [];
        const findLeafTags = (filters: Filter[], labels: TemplateResult[]) => {
            for (const filter of filters) {
                if (filter.options.length) {
                    findLeafTags(filter.options, labels);
                } else {
                    if (!showChecked || filter.checked) {
                        labels.push(
                            html`<a class="tag" href="#">
                                ${filter.label}
                            </a>`);
                    }
                }
            }
        };
        for (const source of this.data.filters) {
            const labels: TemplateResult[] = [];
            findLeafTags(source.filters, labels)
            summary.push(html`<p>
                <span>${source.header}: </span>
                ${labels}
            </p>`);
        }
        return html`<section>
            ${summary}
        </section>`;
    }

    renderTimeSummary(showSelectedTime: boolean) {
        function summarizeDate(d: Date) {
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
            const monthName = months[monthIndex]
            return `${monthName} ${date}, ${year}`
        }
        let startTime = this.data.startTime;
        let endTime = this.data.startTime;
        if (showSelectedTime) {
            startTime = this.selectedStartTime;
            endTime = this.selectedEndTime;
        }
        return html`<section>
            <p>
                <span>Time Range:</span>
                ${summarizeDate(startTime)} to ${summarizeDate(endTime)}
            </p>
        </section>`;
    }

    renderSummaryButtons() {
        let buttons = html`<paper-button
            @click="${() => {
                this.dispatchEvent(
                    new CustomEvent(DataSourceEvent.REQUEST_EXPAND));
            }}">Select</paper-button>`;
        if (this.forExport) {
            buttons = html`<paper-button>Download</paper-button>`;
        }
        return buttons;
    }

    renderModal() {
        return html`
            <article>
                <div class="row button-container">
                    <div class="row close-container">
                        <paper-icon-button
                            icon="icons:close"
                            @click="${() => {
                                this.dispatchEvent(
                                    new CustomEvent(DataSourceEvent.REQUEST_CLOSE));
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
}

declare global {
    interface HTMLElementTagNameMap {
        'data-source': DataSourceElement;
    }
}
