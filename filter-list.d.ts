import './filter-source';
import { LitElement } from 'lit';
import { FilterSource } from './filter-source';
export declare enum FilterListEvent {
    TAGS_CHANGED = "tags-changed"
}
export declare class FilterListElement extends LitElement {
    private timer;
    disableTags: Set<string>;
    filters: FilterSource[];
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>[];
    handleCheckedChanged(): void;
    getShownTags(): Set<string>;
}
declare global {
    interface HTMLElementTagNameMap {
        'filter-list': FilterListElement;
    }
}
//# sourceMappingURL=filter-list.d.ts.map