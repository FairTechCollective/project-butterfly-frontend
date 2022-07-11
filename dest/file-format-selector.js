var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
export var FileFormat;
(function (FileFormat) {
    FileFormat["CSV"] = "csv";
    FileFormat["JSON"] = "json";
})(FileFormat || (FileFormat = {}));
let FileFormatSelector = class FileFormatSelector extends LitElement {
    constructor() {
        super(...arguments);
        this.fileFormat = FileFormat.CSV;
    }
    firstUpdated() {
        this.fileFormatDropdown.value = this.fileFormat;
    }
    render() {
        return html `
      <paper-dropdown-menu label="File format">
        <paper-listbox slot="dropdown-content">
          ${Object.values(FileFormat).map((format) => html `<paper-item>${format}</paper-item>`)}
        </paper-listbox>
      </paper-dropdown-menu>
    `;
    }
};
FileFormatSelector.styles = css `
    :host {
      height: 100%;
      overflow: auto;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: end;
    }
  `;
__decorate([
    property({ type: String })
], FileFormatSelector.prototype, "fileFormat", void 0);
__decorate([
    query('paper-dropdown-menu')
], FileFormatSelector.prototype, "fileFormatDropdown", void 0);
FileFormatSelector = __decorate([
    customElement('file-format-selector')
], FileFormatSelector);
export { FileFormatSelector };
let FileFormatDownloadButton = class FileFormatDownloadButton extends LitElement {
    constructor() {
        super(...arguments);
        this.fileFormat = FileFormat.CSV;
    }
    render() {
        return html ` <paper-menu-button>
      <paper-button slot="dropdown-trigger">
        Download Now
        <iron-icon icon="icons:arrow-drop-down"></iron-icon>
      </paper-button>
      <paper-listbox slot="dropdown-content">
        ${Object.values(FileFormat).map((format) => html `<paper-item>${format}</paper-item>`)}
      </paper-listbox>
    </paper-menu-button>`;
    }
};
FileFormatDownloadButton.styles = css ``;
__decorate([
    property({ type: String })
], FileFormatDownloadButton.prototype, "fileFormat", void 0);
__decorate([
    query('paper-dropdown-menu')
], FileFormatDownloadButton.prototype, "fileFormatDropdown", void 0);
FileFormatDownloadButton = __decorate([
    customElement('file-format-download')
], FileFormatDownloadButton);
export { FileFormatDownloadButton };
//# sourceMappingURL=file-format-selector.js.map