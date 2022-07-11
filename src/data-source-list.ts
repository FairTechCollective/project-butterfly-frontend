import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-input/paper-input.js';
import './data-source';
import './butterfly-table';

import {LitElement, html, css, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {until} from 'lit/directives/until.js';
import {guard} from 'lit/directives/guard.js';

import {BenzeneReport} from './data-connectors';
import {DataSource} from './data-source';

@customElement('data-source-list')
export class DataSourceList extends LitElement {
  @state() private loaded = false;
  @property({type: Array}) dataSources: DataSource[] = [];

  static override styles = css`
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 36px;
      background-color: var(--gray-background);
    }

    .container > * {
      background-color: white;
    }

    .search-container {
      align-items: center;
      background: repeating-linear-gradient(
        135deg,
        #eee,
        #eee 2px,
        white 2px,
        white 5px
      );
      display: flex;
      justify-content: flex-end;
      padding: 36px;
    }

    .search-container > paper-input {
      background: white;
      width: 360px;
    }

    .search-container > paper-icon-button {
      background: black;
      color: white;
    }

    .search-container > paper-icon-button:hover {
      background: #333;
    }

    .table-container {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    butterfly-table {
      height: 560px;
      overflow: scroll;
    }
  `;

  override render() {
    return html`
      <div class="container">
        <div class="search-container">
          <paper-input
            class="search"
            ?disabled="${!this.loaded}"
            placeholder="${'enter search term'}"
          >
          </paper-input>
          <paper-icon-button
            icon="icons:search"
            class="search-button"
          ></paper-icon-button>
        </div>
        <div class="table-container">
          ${guard([this.loaded, this.dataSources], () =>
            until(
              this.loadDataSources(),
              html` <p class="loading">Loading...</p> `
            )
          )}
        </div>
      </div>
    `;
  }

  async loadDataSources() {
    if (!this.loaded) {
      const dataSources = await new BenzeneReport().getDataSources();
      this.dataSources = dataSources;
      this.loaded = true;
    }
    return html` <butterfly-table
      .tableData="${this.dataSources.map((data) => {
        return {
          'Refinery Name': data.name,
          'Company Name': data.company,
          City: data.city,
          State: data.state,
        };
      })}"
    >
    </butterfly-table>`;
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'data-source-list': DataSourceList;
  }
}
