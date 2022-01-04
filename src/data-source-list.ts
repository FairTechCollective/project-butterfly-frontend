import './filter-list';
import './data-source';

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {Filter, FilterSource} from './filter-source';
import {deepCopy} from './utils';

const FILTERS = [
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
                            label: 'Valero Benicia',
                            tag: 'valero-benicia',
                            options: [],
                            checked: false,
                        },
                        {
                            label: 'Marathon Martinez',
                            tag: 'marathon-martinez',
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
];

const DATA_SOURCES = [
    {
        title: 'The Benzene Report',
        description: 'Refineries reporting of two-week average benzene levels to the EPA every three months.',
        tags: new Set(['benzene', 'valero', 'valero-benicia', 'marathon-martinez', 'martinez', 'benicia']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: deepCopy<FilterSource[]>(FILTERS),
    },
    {
        title: "Valero Benicia",
        description: "Valero Refinery self reporting, real-time data",
        tags: new Set(['benzene', 'xylene', 'valero', 'valero-benicia', 'benicia']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: deepCopy<FilterSource[]>(FILTERS),
    },
    {
        title: "Marathon Martinez",
        description: "Marathon Martinez Refinery self reporting, real-time data",
        tags: new Set(['benzene', 'carbon-monoxide', 'martinez', 'marathon-martinez']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: deepCopy<FilterSource[]>(FILTERS),
    },
]

@customElement('data-source-list')
export class DataSourceList extends LitElement {

    @property({type: Array}) dataSources = DATA_SOURCES;
    @property({type: Object}) filterTags = new Set<string>();
    @property({type: Object}) disableTags = new Set<string>();

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
            overflow: auto;
            height: calc(100vh - 100px);
        }

        data-source {
            display: block;
            position: relative;
        }
    `;

    override render() {
        return html`
            <div class="row">
                <filter-list
                    .filters="${FILTERS}"
                    .disableTags="${this.disableTags}"
                    @tags-changed="${this.handleTagsChanged}">
                </filter-list>
                <div class="sources">
                    ${this.renderDataSources()}
                </div>
            </div>
        `;
    }

    renderDataSources() {
        return this.dataSources.map((data) => html`
            <data-source
                .data="${data}"
                .showTags="${this.filterTags}">
            </data-source>
        `);
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
            let hasTag = false;
            for (const tag of dataSource.tags) {
                if (this.filterTags.has(tag)) {
                    hasTag = true;
                }
            }
            if (hasTag) {
                for (const tag of dataSource.tags) {
                    unfilteredTags.add(tag);
                }
            } else {
                for (const tag of dataSource.tags) {
                    filteredOutTags.add(tag);
                }
            }
        }
        const disableTags = new Set([...filteredOutTags]
                            .filter(x => !unfilteredTags.has(x)));
        this.disableTags = disableTags;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'data-source-list': DataSourceList;
    }
}