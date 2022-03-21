var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './filter-list';
import './data-source';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { until } from 'lit/directives/until.js';
import { guard } from 'lit/directives/guard.js';
import { BenzeneReport } from './data-connectors';
const DATA_SOURCES = [
    {
        title: "Valero Benicia",
        description: "Valero Refinery self reporting, real-time data",
        tags: new Set(['benzene', 'xylene', 'valero', 'valero-benicia', 'benicia']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: [
            {
                header: 'Locations',
                filters: [{
                        label: 'Bay Area',
                        tag: 'bay-area',
                        checked: false,
                        options: [
                            {
                                label: 'Cities',
                                tag: 'cities',
                                checked: false,
                                options: [
                                    {
                                        label: 'Benicia',
                                        tag: 'benicia',
                                        options: [],
                                        checked: false,
                                    },
                                ],
                            },
                            {
                                label: 'Refineries',
                                tag: 'refineries',
                                checked: false,
                                options: [
                                    {
                                        label: 'Valero Benicia',
                                        tag: 'valero-benicia',
                                        options: [],
                                        checked: false,
                                    },
                                ],
                            }
                        ],
                    }],
            },
            {
                header: 'Chemicals',
                filters: [
                    {
                        label: 'Benzene',
                        tag: 'benzene',
                        checked: false,
                        options: [],
                    },
                    {
                        label: 'Xylene',
                        tag: 'xylene',
                        checked: false,
                        options: [],
                    },
                    {
                        label: 'Carbon Monoxide',
                        tag: 'carbon-monoxide',
                        checked: false,
                        options: [],
                    },
                ]
            },
        ],
    },
    {
        title: "Tesoro Martinez",
        description: "Tesoro Martinez Refinery self reporting, real-time data",
        tags: new Set(['benzene', 'carbon-monoxide', 'martinez', 'tesoro-martinez']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: [
            {
                header: 'Locations',
                filters: [{
                        label: 'Bay Area',
                        tag: 'bay-area',
                        checked: false,
                        options: [
                            {
                                label: 'Cities',
                                tag: 'cities',
                                checked: false,
                                options: [
                                    {
                                        label: 'Martinez',
                                        tag: 'martinez',
                                        options: [],
                                        checked: false,
                                    },
                                ],
                            },
                            {
                                label: 'Refineries',
                                tag: 'refineries',
                                checked: false,
                                options: [
                                    {
                                        label: 'Tesoro Martinez',
                                        tag: 'tesoro-martinez',
                                        options: [],
                                        checked: false,
                                    },
                                ],
                            }
                        ],
                    }],
            },
            {
                header: 'Chemicals',
                filters: [
                    {
                        label: 'Benzene',
                        tag: 'benzene',
                        checked: false,
                        options: [],
                    },
                    {
                        label: 'Xylene',
                        tag: 'xylene',
                        checked: false,
                        options: [],
                    },
                    {
                        label: 'Carbon Monoxide',
                        tag: 'carbon-monoxide',
                        checked: false,
                        options: [],
                    },
                ]
            },
        ],
    },
];
let DataSourceList = class DataSourceList extends LitElement {
    constructor() {
        super(...arguments);
        this.loaded = null;
        this.dataSources = [];
        this.filters = [];
        this.filterTags = new Set();
        this.disableTags = new Set();
        this.expanded = false;
    }
    render() {
        return html `
            <div class="row">
                ${guard([this.loaded], () => until(this.loadDataSources(), nothing))}
                <filter-list
                    style="${styleMap({
            display: this.expanded ? 'none' : 'block',
        })}"
                    .filters="${this.filters}"
                    .disableTags="${this.disableTags}"
                    @tags-changed="${this.handleTagsChanged}">
                </filter-list>
                <div class="sources">
                ${this.dataSources.map((data) => html `
                    <data-source
                        .data="${data}"
                        .showTags="${this.filterTags}"
                        .hide="${this.expanded}"
                        @request-expand="${(e) => {
            e.target.expand = true;
            this.expanded = true;
        }}"
                        @request-close="${(e) => {
            e.target.expand = false;
            this.expanded = false;
        }}"
                        >
                    </data-source>
                `)}
                </div>
            </div>
        `;
    }
    async loadDataSources() {
        if (!this.loaded) {
            this.loaded = Promise.all([new BenzeneReport().getDataSource()]);
            const dataSources = await this.loaded;
            const benzeneReport = dataSources[0];
            this.dataSources = [benzeneReport, ...DATA_SOURCES];
            this.filters = benzeneReport.filters;
        }
        return nothing;
    }
    handleTagsChanged(e) {
        this.filterTags = e.detail;
        if (this.filterTags.size === 0) {
            this.disableTags = new Set();
            return;
        }
        const unfilteredTags = new Set();
        const filteredOutTags = new Set();
        for (const dataSource of this.dataSources) {
            const showSource = [...this.filterTags].every(tag => dataSource.tags.has(tag));
            if (showSource) {
                for (const tag of dataSource.tags) {
                    unfilteredTags.add(tag);
                }
            }
            else {
                for (const tag of dataSource.tags) {
                    filteredOutTags.add(tag);
                }
            }
        }
        for (const tag of unfilteredTags) {
            filteredOutTags.delete(tag);
        }
        this.disableTags = filteredOutTags;
    }
};
DataSourceList.styles = css `
        .row {
            display: flex;
            justify-content: stretch;
        }

        filter-list {
            flex-grow: 1;
        }

        .sources {
            flex-grow: 5;
            overflow: scroll;
        }

        data-source {
            display: block;
            position: relative;
        }
    `;
__decorate([
    state()
], DataSourceList.prototype, "loaded", void 0);
__decorate([
    property({ type: Array })
], DataSourceList.prototype, "dataSources", void 0);
__decorate([
    property({ type: Array })
], DataSourceList.prototype, "filters", void 0);
__decorate([
    property({ type: Object })
], DataSourceList.prototype, "filterTags", void 0);
__decorate([
    property({ type: Object })
], DataSourceList.prototype, "disableTags", void 0);
__decorate([
    property({ type: Boolean })
], DataSourceList.prototype, "expanded", void 0);
DataSourceList = __decorate([
    customElement('data-source-list')
], DataSourceList);
export { DataSourceList };
//# sourceMappingURL=data-source-list.js.map