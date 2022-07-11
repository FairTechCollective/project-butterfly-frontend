import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

function makeInputDate(d: Date): string {
  return (
    d.getFullYear().toString().padStart(4, '0') +
    '-' +
    (d.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    d.getDate().toString().padStart(2, '0')
  );
}

@customElement('time-selector')
export class TimeSelector extends LitElement {
  @property({type: Object}) startTime = new Date();
  @property({type: Object}) endTime = new Date();

  @query('.start') startDateElement!: HTMLInputElement;
  @query('.end') endDateElement!: HTMLInputElement;

  static override styles = css``;

  override firstUpdated() {
    this.startDateElement.value = makeInputDate(this.startTime);
    this.endDateElement.value = makeInputDate(this.endTime);
  }

  override render() {
    return html`
            <label>
                <b>Start Date:</b>
                <input 
                    type="date"
                    class="start"
                    min="${makeInputDate(this.startTime)}"
                    max="${makeInputDate(this.endTime)}"
                    @change="${this.dispatchTimeEvent}">
            </label>
            <label>
                <b>End Date:</b>
                <input 
                    type="date"
                    class="end"
                    min="${this.startTime.toISOString()}"
                    max="${this.endTime.toISOString()}"
                    @change="${this.dispatchTimeEvent}">
            </label>
            </label>
        `;
  }

  private dispatchTimeEvent() {
    this.dispatchEvent(
      new CustomEvent<Date[]>('set-time', {
        detail: [
          new Date(this.startDateElement.value),
          new Date(this.endDateElement.value),
        ],
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'time-selector': TimeSelector;
  }
}
