var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './filter-source';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
const DEBOUNCE_TIMER = 10;
export var FilterListEvent;
(function (FilterListEvent) {
    FilterListEvent["TAGS_CHANGED"] = "tags-changed";
})(FilterListEvent || (FilterListEvent = {}));
let FilterListElement = class FilterListElement extends LitElement {
    constructor() {
        super(...arguments);
        this.timer = null;
        this.disableTags = new Set();
        this.filters = [];
    }
    render() {
        return this.filters.map((filter) => html `
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
            clearTimeout(this.timer);
        }
        this.timer = window.setTimeout(() => {
            this.dispatchEvent(new CustomEvent(FilterListEvent.TAGS_CHANGED, {
                detail: this.getShownTags(),
            }));
        }, DEBOUNCE_TIMER);
    }
    getShownTags() {
        const tags = new Set();
        function findLeafTags(filters) {
            for (const filter of filters) {
                if (filter.options.length) {
                    findLeafTags(filter.options);
                }
                else {
                    if (filter.checked) {
                        tags.add(filter.tag);
                    }
                }
            }
        }
        for (const filter of this.filters) {
            findLeafTags(filter.filters);
        }
        return tags;
    }
};
FilterListElement.styles = css ``;
__decorate([
    property({ type: Object })
], FilterListElement.prototype, "disableTags", void 0);
__decorate([
    property({ type: Array })
], FilterListElement.prototype, "filters", void 0);
FilterListElement = __decorate([
    customElement('filter-list')
], FilterListElement);
export { FilterListElement };
//# sourceMappingURL=filter-list.js.map