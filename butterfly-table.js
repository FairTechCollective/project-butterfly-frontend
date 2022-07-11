var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/paper-icon-button/paper-icon-button.js';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
let Table = class Table extends LitElement {
    constructor() {
        super(...arguments);
        this.tableData = [];
        // TODO: Implement sortable headers.
        this.sortableHeaders = new Set([]);
        this.expandable = false;
        this.expandData = [];
        this.expandRows = new Set([]);
        this.hideRows = new Set([]);
        this.highlightRows = new Set([]);
    }
    render() {
        const rowHeaders = Object.keys(this.tableData[0] || {});
        const rows = this.tableData.map((data, i) => {
            return this.hideRows.has(i)
                ? nothing
                : html `
            <tr
              class="${classMap({
                    highlighted: this.highlightRows.has(i),
                })}"
            >
              ${rowHeaders.map((header) => html `<td>
                    ${header in data ? String(data[header]) : nothing}
                  </td>`)}
              ${this.expandable
                    ? html `<td>
                    <paper-icon-button
                      icon="icons:arrow-drop-down"
                      @click="${() => {
                        if (this.expandRows.has(i)) {
                            this.expandRows.delete(i);
                            this.expandRows = new Set([...this.expandRows]);
                        }
                        else {
                            this.expandRows.add(i);
                            this.expandRows = new Set([...this.expandRows]);
                        }
                    }}"
                    >
                    </paper-icon-button>
                  </td>`
                    : nothing}
            </tr>
            ${this.renderExpandedRow(i)}
          `;
        });
        return html `<table>
      <tr class="header-row">
        ${rowHeaders.map((header) => html `<th>${header}</th>`)}
        ${this.expandable ? html `<th>&nbsp;</th>` : nothing}
      </tr>
      ${rows}
    </table>`;
    }
    renderExpandedRow(i) {
        if (!this.expandRows.has(i)) {
            return nothing;
        }
        const rowHeaders = Object.keys(this.expandData[0] || {});
        const rows = this.expandData.map((data) => html ` <tr>
        ${rowHeaders.map((header) => html `<td>${header in data ? String(data[header]) : nothing}</td>`)}
      </tr>`);
        return html `<tr>
      <td>
        <table class="nested-table">
          <tr class="header-row">
            ${rowHeaders.map((header) => html `<th>${header}</th>`)}
          </tr>
          ${rows}
        </table>
      </td>
    </tr>`;
    }
};
Table.styles = css `
    table {
      text-align: left;
      position: relative;
      border-collapse: collapse;
    }

    th,
    td {
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
__decorate([
    property({ type: Array })
], Table.prototype, "tableData", void 0);
__decorate([
    property({ type: Object })
], Table.prototype, "sortableHeaders", void 0);
__decorate([
    property({ type: Boolean })
], Table.prototype, "expandable", void 0);
__decorate([
    property({ type: Array })
], Table.prototype, "expandData", void 0);
__decorate([
    property({ type: Object })
], Table.prototype, "expandRows", void 0);
__decorate([
    property({ type: Object })
], Table.prototype, "hideRows", void 0);
__decorate([
    property({ type: Object })
], Table.prototype, "highlightRows", void 0);
Table = __decorate([
    customElement('butterfly-table')
], Table);
export { Table };
//# sourceMappingURL=butterfly-table.js.map