import './filter-source';

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {Filter, FilterSource} from './filter-source';

const DEBOUNCE_TIMER = 10;

export enum FilterListEvent {
    TAGS_CHANGED='tags-changed',
}

@customElement('filter-list')
export class FilterListElement extends LitElement {
    private timer: number|null = null;

    @property({type: Object}) disableTags = new Set<string>();
    @property({type: Array}) filters: FilterSource[] = [];

    static override styles = css``;

    override render() {
        return this.filters.map((filter) => html`
            <filter-source
                .header="${filter.header}"
                .disableTags="${this.disableTags}"
                .filters="${filter.filters}"
                @checked-changed="${this.handleCheckedChanged}"
            >
            </filter-source>
        `);
    }

    handleCheckedChanged() {
        if (this.timer != null) {
            clearTimeout(this.timer)
        }
        this.timer = window.setTimeout(() => {
            this.dispatchEvent(
                new CustomEvent<Set<string>>(FilterListEvent.TAGS_CHANGED, {
                    detail: this.getShownTags(),
                }));
        }, DEBOUNCE_TIMER);
    }

    getShownTags() {
        const tags: Set<string> = new Set();
        function findLeafTags(filters: Filter[]) {
            for (const filter of filters) {
                if (filter.options.length) {
                    findLeafTags(filter.options);
                } else {
                    if (filter.checked) {
                        tags.add(filter.tag);
                    }
                }
            }
        }
        for (const filter of this.filters) {
            findLeafTags(filter.filters)
        }
        return tags
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'filter-list': FilterListElement;
    }
}
