var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './data-source';
import './file-format-selector';
import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';
var DownloadQueueEvents;
(function (DownloadQueueEvents) {
    DownloadQueueEvents["REQUEST_DELETE"] = "request-delete";
})(DownloadQueueEvents || (DownloadQueueEvents = {}));
let DownloadQueue = class DownloadQueue extends LitElement {
    constructor() {
        super(...arguments);
        this.downloadData = [];
    }
    render() {
        return html `
            <div class="row">
                </paper-icon-button>
                <file-format-selector></file-format-selector>
                <paper-button ?disabled="${!this.downloadData.length}">
                    Download All
                </paper-button>
            </div>
            ${this.renderDownloads()}
        `;
    }
    renderDownloads() {
        if (!this.downloadData.length) {
            return html `<h3>No data sources selected.</h3>`;
        }
        return this.downloadData.map((data) => html ` <div class="row">
          <data-source .data="${data}" .forExport="${true}"> </data-source>
          <div class="delete-container">
            <paper-icon-button
              icon="icons:delete"
              @click="${() => {
            this.dispatchEvent(new CustomEvent(DownloadQueueEvents.REQUEST_DELETE, { detail: data }));
        }}"
            >
            </paper-icon-button>
          </div>
        </div>`);
    }
};
DownloadQueue.styles = css `
    :host {
      height: 100%;
      overflow: auto;
    }

    h3 {
      color: gray;
      font-weight: 100;
      padding: 20px;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
    }

    .delete-container {
      padding-right: 14px;
    }
  `;
__decorate([
    property({ type: Array })
], DownloadQueue.prototype, "downloadData", void 0);
__decorate([
    query('file-format-selector')
], DownloadQueue.prototype, "fileFormatSelector", void 0);
DownloadQueue = __decorate([
    customElement('download-queue')
], DownloadQueue);
export { DownloadQueue };
//# sourceMappingURL=download-queue.js.map