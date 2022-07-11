import '@polymer/paper-icon-button/paper-icon-button.js';

import {LitElement, html, css, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js'

type TableData = {[key: string]: string|number}

@customElement('butterfly-table')
export class Table extends LitElement {
    @property({type: Array}) tableData:TableData[] = [];
    // TODO: Implement sortable headers.
    @property({type: Object}) sortableHeaders:Set<string> = new Set([]);
    @property({type: Boolean}) expandable = false;
    @property({type: Array}) expandData:TableData[] = [];
    @property({type: Object}) expandRows:Set<number> = new Set([]);
    @property({type: Object}) hideRows:Set<number> = new Set([]);
    @property({type: Object}) highlightRows:Set<number> = new Set([]);

    static override styles = css`
        table {
            text-align: left;
            position: relative;
            border-collapse: collapse;
        }

        th, td {
           padding: 11px;
        }

        th {
            font-weight: bold;
        }

        td {
            border-bottom: 1px solid #eee;
        }
        
        tr.header-row {
            background: white;
            box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.75);
            position: sticky;
            top: 0;
        }
    `;

    override render() {
        const rowHeaders = Object.keys(this.tableData[0] || {});
        const rows = this.tableData.map((data, i) => {
            return this.hideRows.has(i) ? nothing: html`
                <tr class="${classMap({
                    highlighted: this.highlightRows.has(i),
                })}">
                    ${rowHeaders.map(
                        (header: string) => 
                            html`<td>${
                                header in data ? String(data[header]) : nothing}</td>`)}
                    ${this.expandable ? html`<td>
                        <paper-icon-button icon="icons:arrow-drop-down" @click="${() => {
                            if (this.expandRows.has(i)) {
                                this.expandRows.delete(i);
                                this.expandRows = new Set([...this.expandRows]);
                            } else {
                                this.expandRows.add(i);
                                this.expandRows = new Set([...this.expandRows]);
                            }
                        }}">
                        </paper-icon-button>
                    </td>` : nothing}
                </tr>
                ${this.renderExpandedRow(i)}
            `;
        });
        return html`<table>
            <tr class='header-row'>
                ${rowHeaders.map((header: string) => html`<th>${header}</th>`)}
                ${this.expandable ? html`<th>&nbsp;</th>` : nothing}
            </tr>
            ${rows}
        </table>`;
    }

    renderExpandedRow(i: number) {
        if (!this.expandRows.has(i)) {
            return nothing;
        }
        const rowHeaders = Object.keys(this.expandData[0] || {});
        const rows = this.expandData.map((data) => html`
                <tr>
                    ${rowHeaders.map(
                        (header: string) => 
                            html`<td>${
                                header in data ? String(data[header]) : nothing}</td>`)}
                </tr>`);
        return html`<tr>
            <td>
                <table class="nested-table">
                    <tr class='header-row'>
                        ${rowHeaders.map((header: string) => html`<th>${header}</th>`)}
                    </tr>
                    ${rows}
                </table>
            </td>
        </tr>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'butterfly-table': Table;
    }
}
