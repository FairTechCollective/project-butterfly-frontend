import './filter-list';
import './data-source';
import { LitElement } from 'lit';
import { FilterSource } from './filter-source';
export declare class DataSourceList extends LitElement {
    dataSources: {
        title: string;
        description: string;
        tags: Set<string>;
        startTime: Date;
        endTime: Date;
        filters: FilterSource[];
    }[];
    filterTags: Set<string>;
    disableTags: Set<string>;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    renderDataSources(): import("lit-html").TemplateResult<1>[];
    handleTagsChanged(e: CustomEvent<Set<string>>): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'data-source-list': DataSourceList;
    }
}
//# sourceMappingURL=data-source-list.d.ts.map