import '@polymer/paper-checkbox/paper-checkbox.js';

import {PaperCheckboxElement} from '@polymer/paper-checkbox/paper-checkbox.js';

import {LitElement, TemplateResult, html, css, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

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

export enum FilterEvent {
  CHECKED_CHANGED = 'checked-changed',
}

@customElement('filter-source')
export class FilterSourceElement extends LitElement {
  static override styles = css`
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

  @property({type: String}) header = '';
  @property({type: Array}) filters: Filter[] = [];
  @property({type: Object}) disableTags = new Set<string>();

  override render() {
    return html`
      <h4>${this.header}</h4>
      ${this.renderFilters(this.filters)}
    `;
  }

  renderFilters(filters: Filter[], level = 0): TemplateResult | typeof nothing {
    if (!filters.length) {
      return nothing;
    }
    const filterList = filters
      .map((filter) => {
        if (filter.options.length) {
          return html`
                        <paper-checkbox
                            ?disabled="${this.disableTags.has(filter.tag)}"
                            ?checked="${filter.checked}"
                            @checked-changed="${this.updateFilter(filter)}">
                            ${filter.label}
                        </paper-checkbox>
                        ${this.renderFilters(filter.options, level + 1)}
                    </details>`;
        } else {
          return html` <paper-checkbox
            ?disabled="${this.disableTags.has(filter.tag)}"
            ?checked="${filter.checked}"
            @checked-changed="${this.updateFilter(filter)}"
          >
            ${filter.label}
          </paper-checkbox>`;
        }
      })
      .map((filter) => html`<li>${filter}</li>`);
    return html`<ul>
      ${filterList}
    </ul>`;
  }

  updateFilter(filter: Filter) {
    return (e: Event) => {
      filter.checked = !!(e.target as PaperCheckboxElement).checked;
      if (filter.options && filter.options.length) {
        for (const option of filter.options) {
          option.checked = filter.checked;
        }
      }
      this.dispatchEvent(new CustomEvent(FilterEvent.CHECKED_CHANGED));
      this.requestUpdate();
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'filter-source': FilterSourceElement;
  }
}
