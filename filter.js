var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
let FilterSource = class FilterSource extends LitElement {
  render() {
    return html`
      <h4>Location</h4>
      <label><input type="checkbox" /> Location 1</label>
      <label><input type="checkbox" /> Location 2</label>
      <label><input type="checkbox" /> Location 3</label>
      <label><input type="checkbox" /> Location 4</label>
    `;
  }
};
FilterSource.styles = css``;
FilterSource = __decorate([customElement('filter-source')], FilterSource);
export {FilterSource};
//# sourceMappingURL=filter.js.map
