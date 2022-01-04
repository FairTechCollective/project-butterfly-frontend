import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './filter-list';
import { LitElement, TemplateResult, nothing } from 'lit';
import { FilterSource } from './filter-source';
export interface DataSource {
    title: string;
    description: string;
    tags: Set<string>;
    startTime: Date;
    endTime: Date;
    filters: FilterSource[];
}
export declare enum DataSourceEvent {
    REQUEST_EXPAND = "request-expand",
    REQUEST_CLOSE = "request-close"
}
export declare class DataSourceElement extends LitElement {
    data: DataSource;
    expand: boolean;
    hide: boolean;
    showTags: Set<string>;
    forExport: boolean;
    selectedStartTime: Date;
    selectedEndTime: Date;
    static styles: import("lit").CSSResult;
    render(): typeof nothing | TemplateResult<1>;
    renderSummary(): TemplateResult<1>;
    renderFilterSummary(showChecked: boolean): TemplateResult<1>;
    renderTimeSummary(showSelectedTime: boolean): TemplateResult<1>;
    renderSummaryButtons(): TemplateResult<1>;
    renderModal(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'data-source': DataSourceElement;
    }
}
//# sourceMappingURL=data-source.d.ts.map