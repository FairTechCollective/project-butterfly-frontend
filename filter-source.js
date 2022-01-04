var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/paper-checkbox/paper-checkbox.js';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
export var FilterEvent;
(function (FilterEvent) {
    FilterEvent["CHECKED_CHANGED"] = "checked-changed";
})(FilterEvent || (FilterEvent = {}));
let FilterSourceElement = class FilterSourceElement extends LitElement {
    constructor() {
        super(...arguments);
        this.header = "";
        this.filters = [];
        this.disableTags = new Set();
    }
    render() {
        return html `
            <h4>${this.header}</h4>
            ${this.renderFilters(this.filters)}
        `;
    }
    renderFilters(filters, level = 0) {
        if (!filters.length) {
            return nothing;
        }
        const filterList = filters.map((filter) => {
            if (filter.options.length) {
                return html `
                        <paper-checkbox
                            ?disabled="${this.disableTags.has(filter.tag)}"
                            ?checked="${filter.checked}"
                            @checked-changed="${this.updateFilter(filter)}">
                            ${filter.label}
                        </paper-checkbox>
                        ${this.renderFilters(filter.options, level + 1)}
                    </details>`;
            }
            else {
                return html `
                    <paper-checkbox
                        ?disabled="${this.disableTags.has(filter.tag)}"
                        ?checked="${filter.checked}"
                        @checked-changed="${this.updateFilter(filter)}">
                        ${filter.label}
                    </paper-checkbox>`;
            }
        }).map((filter) => html `<li>${filter}</li>`);
        return html `<ul>
            ${filterList}
        </ul>`;
    }
    updateFilter(filter) {
        return (e) => {
            filter.checked = !!(e.target.checked);
            if (filter.options && filter.options.length) {
                for (const option of filter.options) {
                    option.checked = filter.checked;
                }
            }
            this.dispatchEvent(new CustomEvent(FilterEvent.CHECKED_CHANGED));
            this.requestUpdate();
        };
    }
};
FilterSourceElement.styles = css `

        h4 {
            margin-left: 5px;
        }

        ul {
            padding-inline-start: 25px;
        }

        li {
            list-style: none;
            margin: 10px 0;
        }
    `;
__decorate([
    property({ type: String })
], FilterSourceElement.prototype, "header", void 0);
__decorate([
    property({ type: Array })
], FilterSourceElement.prototype, "filters", void 0);
__decorate([
    property({ type: Object })
], FilterSourceElement.prototype, "disableTags", void 0);
FilterSourceElement = __decorate([
    customElement('filter-source')
], FilterSourceElement);
export { FilterSourceElement };
//# sourceMappingURL=filter-source.js.map