var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
function makeInputDate(d) {
    return d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
}
let TimeSelector = class TimeSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.startTime = new Date();
        this.endTime = new Date();
    }
    firstUpdated() {
        this.startDateElement.value = makeInputDate(this.startTime);
        this.endDateElement.value = makeInputDate(this.endTime);
    }
    render() {
        return html `
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
    dispatchTimeEvent() {
        this.dispatchEvent(new CustomEvent('set-time', {
            detail: [
                new Date(this.startDateElement.value),
                new Date(this.endDateElement.value),
            ]
        }));
    }
};
TimeSelector.styles = css ``;
__decorate([
    property({ type: Object })
], TimeSelector.prototype, "startTime", void 0);
__decorate([
    property({ type: Object })
], TimeSelector.prototype, "endTime", void 0);
__decorate([
    query('.start')
], TimeSelector.prototype, "startDateElement", void 0);
__decorate([
    query('.end')
], TimeSelector.prototype, "endDateElement", void 0);
TimeSelector = __decorate([
    customElement('time-selector')
], TimeSelector);
export { TimeSelector };
//# sourceMappingURL=time-selector.js.map