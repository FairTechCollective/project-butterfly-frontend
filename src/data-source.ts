import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import './filter-list';
import './file-format-selector';
import './data-connectors';
import './time-selector';

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {deepCopy} from './utils';

export enum TwoWeekPollutants {
    Benzene='Benzene',
}

export enum ContinuousPollutants {
    One_Three_Butadiene='1,3 Butadiene',
    One_Two_Three_Trimethylbenzene='1,2,3 trimethylbenzene',
    One_Two_Four_Trimethylbenzene='1,2,4 trimethylbenzene',
    One_Three_Five_Trimethylbenzene='1,3,5 trimethylbenzene',
    Two_Two_Four_Trimethylpentane='2,2,4 trimethylpentane',
    Three_Methylpentane='3-Methylpentane',
    Acetaldehyde='Acetaldehyde',
    Acrolein='Acrolein',
    Ammonia='Ammonia',
    Benzene='Benzene',
    Black_Carbon='Black carbon',
    Butane='Butane',
    Carbon_Disulfide='Carbon Disulfide',
    Carbonyl_Sulfide='Carbonyl Sulfide',
    Carbon_Monoxide='Carbon monoxide',
    Ethane='Ethane',
    Ethanol='Ethanol',
    Ethylbenzene='Ethylbenzene',
    Ethylene='Ethylene',
    Formaldehyde='Formaldehyde',
    Hydrogen_Cyanide='Hydrogen cyanide',
    Hydrogen_Flouride='Hydrogen flouride',
    Hydrogen_Sulfide='Hydrogen sulfide',
    Mercaptan='Mercaptan',
    Methane='Methane',
    MTBE='MTBE',
    N_Heptane='n-Heptane',
    N_Hexane='n-Hexane',
    N_Octane='n-Octane',
    Nitrogen_Dioxide='Nitrogen dioxide',
    Nitrous_Oxide='Nitrous oxide',
    Ozone='Ozone',
    Pentane='Pentane',
    PM2_5='PM2.5',
    Propane='Propane',
    Styrene='Styrene',
    Sulfur_Dioxide='Sulfur Dioxide',
    Toluene='Toluene',
    Xylene='Xylene',
    M_xylene='m-xylene',
    O_xylene='o-xylene',
    P_xylene='p-xylene',
}

export interface DataSource {
    name: string;
    tags: Set<string>;
    startTime: Date;
    endTime: Date;
    address: string;
    city: string;
    state: string;
    company: string;
    twoWeekPollutants: TwoWeekPollutants[];
    continuousPollutants: ContinuousPollutants[];
    ranking: number;
    benzeneConcentration: number;
    benzeneWeeksExceeding: number;
}

export enum DataSourceEvent {
    REQUEST_CLOSE='request-close',
    REQUEST_DOWNLOAD='request-download',
    REQUEST_EXPAND='request-expand',
}

@customElement('data-source')
export class DataSourceElement extends LitElement {
    
    @property({type: Object}) data:DataSource = {
        name: "",
        tags: new Set<string>([]),
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
    
    @property({type: Boolean}) asPopup = false;
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

    override firstUpdated() {
        this.selectedStartTime = new Date(this.data.startTime);
        this.selectedEndTime = new Date(this.data.endTime);
    }

    override render() {
        if (this.asPopup) {
            return this.renderPopup();
        } else {
            return this.renderRefineryPage();
        }
    }

    private renderPopup() {
        return html`
            <article>
                ${this.renderDescription()}
            </article>
        `;
    }

    private renderDescription() {
        return html`
            <h3>${this.data.name}</h3>
        `;
    }

    private renderTimeSummary() {
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
        let endTime = this.data.endTime;
        return html`<section>
            <p>
                <span>Time Range:</span>
                ${summarizeDate(startTime)} to ${summarizeDate(endTime)}
            </p>
        </section>`;
    }

    private renderRefineryPage() {
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
                  @set-time=${(e: CustomEvent<Date[]>) => {
                      this.selectedStartTime = e.detail[0];
                      this.selectedEndTime = e.detail[1];
                  }}
                ></time-selector>
            </article>`;
    }

    private requestQueue() {
        const data = deepCopy(this.data);
        data.startTime = this.selectedStartTime;
        data.endTime = this.selectedEndTime;
        this.dispatchEvent(
            new CustomEvent(
                DataSourceEvent.REQUEST_DOWNLOAD, 
                {
                    detail: data,
                    bubbles: true,
                    composed: true
                })
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'data-source': DataSourceElement;
    }
}
