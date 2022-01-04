import '@polymer/paper-checkbox/paper-checkbox.js';
import { LitElement, TemplateResult, nothing } from 'lit';
export interface FilterSource {
    header: string;
    filters: Filter[];
}
export interface Filter {
    label: string;
    tag: string;
    options: Filter[];
    checked: boolean;
}
export declare enum FilterEvent {
    CHECKED_CHANGED = "checked-changed"
}
export declare class FilterSourceElement extends LitElement {
    static styles: import("lit").CSSResult;
    header: string;
    filters: Filter[];
    disableTags: Set<string>;
    render(): TemplateResult<1>;
    renderFilters(filters: Filter[], level?: number): TemplateResult | typeof nothing;
    updateFilter(filter: Filter): (e: Event) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'filter-source': FilterSourceElement;
    }
}
//# sourceMappingURL=filter-source.d.ts.map