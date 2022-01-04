import '@polymer/paper-button/paper-button.js';
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
export declare class DataSourceElement extends LitElement {
    data: DataSource;
    expand: boolean;
    showTags: Set<string>;
    forExport: boolean;
    selectedStartTime: Date;
    selectedEndTime: Date;
    static styles: import("lit").CSSResult;
    render(): void | TemplateResult<1> | typeof nothing;
    renderSummary(): TemplateResult<1>;
    renderFilterSummary(showChecked: boolean): TemplateResult<1>;
    renderTimeSummary(showSelectedTime: boolean): TemplateResult<1>;
    renderSummaryButtons(): TemplateResult<1>;
    renderModal(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'data-source': DataSourceElement;
    }
}
//# sourceMappingURL=data-source.d.ts.map