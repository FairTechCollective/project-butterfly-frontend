import './filter-list';
import './data-source';

import {LitElement, html, css, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js'
import {until} from 'lit/directives/until.js'
import {guard} from 'lit/directives/guard.js'

import {Filter, FilterSource} from './filter-source';
import {BenzeneReport} from './data-connectors';
import {DataSource, DataSourceElement} from './data-source';

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
                        options: [] as Filter[],
                    },
                    {
                        label: 'Xylene',
                        tag: 'xylene',
                        checked: false,
                        options: [] as Filter[],
                    },
                    {
                        label: 'Carbon Monoxide',
                        tag: 'carbon-monoxide',
                        checked: false,
                        options: [] as Filter[],
                    },
            ]},
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
                        options: [] as Filter[],
                    },
                    {
                        label: 'Xylene',
                        tag: 'xylene',
                        checked: false,
                        options: [] as Filter[],
                    },
                    {
                        label: 'Carbon Monoxide',
                        tag: 'carbon-monoxide',
                        checked: false,
                        options: [] as Filter[],
                    },
            ]},
        ],
    },
]

@customElement('data-source-list')
export class DataSourceList extends LitElement {
    @state() private loaded:Promise<DataSource[]>|null = null;
    @property({type: Array}) dataSources:DataSource[] = [];
    @property({type: Array}) filters:FilterSource[] = [];
    @property({type: Object}) filterTags = new Set<string>();
    @property({type: Object}) disableTags = new Set<string>();
    @property({type: Boolean}) expanded = false;

    static override styles = css`
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

    override render() {
        return html`
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
                ${this.dataSources.map((data) => html`
                    <data-source
                        .data="${data}"
                        .showTags="${this.filterTags}"
                        .hide="${this.expanded}"
                        @request-expand="${(e: CustomEvent) => {
                            (e.target as DataSourceElement).expand = true;
                            this.expanded = true;
                        }}"
                        @request-close="${(e: CustomEvent) => {
                            (e.target as DataSourceElement).expand = false;
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

    handleTagsChanged(e: CustomEvent<Set<string>>) {
        this.filterTags = e.detail;
        if (this.filterTags.size === 0) {
            this.disableTags = new Set<string>();
            return;
        }
        const unfilteredTags = new Set<string>();
        const filteredOutTags = new Set<string>();
        for (const dataSource of this.dataSources) {
            const showSource = [...this.filterTags].every(tag=>dataSource.tags.has(tag));
            if (showSource) {
                for (const tag of dataSource.tags) {
                    unfilteredTags.add(tag);
                }
            } else {
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
}

declare global {
    interface HTMLElementTagNameMap {
        'data-source-list': DataSourceList;
    }
}