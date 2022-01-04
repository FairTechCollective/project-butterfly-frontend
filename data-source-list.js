var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './filter-list';
import './data-source';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { deepCopy } from './utils';
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
];
const DATA_SOURCES = [
    {
        title: 'The Benzene Report',
        description: 'Refineries reporting of two-week average benzene levels to the EPA every three months.',
        tags: new Set(['benzene', 'valero', 'valero-benicia', 'marathon-martinez', 'martinez', 'benicia']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: deepCopy(FILTERS),
    },
    {
        title: "Valero Benicia",
        description: "Valero Refinery self reporting, real-time data",
        tags: new Set(['benzene', 'xylene', 'valero', 'valero-benicia', 'benicia']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: deepCopy(FILTERS),
    },
    {
        title: "Marathon Martinez",
        description: "Marathon Martinez Refinery self reporting, real-time data",
        tags: new Set(['benzene', 'carbon-monoxide', 'martinez', 'marathon-martinez']),
        startTime: new Date(0),
        endTime: new Date(0),
        filters: deepCopy(FILTERS),
    },
];
let DataSourceList = class DataSourceList extends LitElement {
    constructor() {
        super(...arguments);
        this.dataSources = DATA_SOURCES;
        this.filterTags = new Set();
        this.disableTags = new Set();
        this.expanded = false;
    }
    render() {
        return html `
            <div class="row">
                <filter-list
                    style="${styleMap({
            display: this.expanded ? 'none' : 'block',
        })}"
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
        return this.dataSources.map((data) => html `
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
        `);
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
            }
            else {
                for (const tag of dataSource.tags) {
                    filteredOutTags.add(tag);
                }
            }
        }
        const disableTags = new Set([...filteredOutTags]
            .filter(x => !unfilteredTags.has(x)));
        this.disableTags = disableTags;
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
            height: calc(100vh - 100px);
        }

        data-source {
            display: block;
            position: relative;
        }
    `;
__decorate([
    property({ type: Array })
], DataSourceList.prototype, "dataSources", void 0);
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