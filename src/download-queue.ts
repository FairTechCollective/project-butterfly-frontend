import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import './data-source';
import './file-format-selector';

import {LitElement, html, css} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';

import {DataSource} from './data-source';
import {FileFormatSelector} from './file-format-selector'

enum DownloadQueueEvents {
    REQUEST_DELETE='request-delete',
}

@customElement('download-queue')
export class DownloadQueue extends LitElement {

    @property({type: Array}) downloadData: DataSource[] = [];
    @query('file-format-selector') fileFormatSelector!: FileFormatSelector;

    static override styles = css`
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

    override render() {
        return html`
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

    private renderDownloads() {
        if (!this.downloadData.length) {
            return html`<h3>No data sources selected.</h3>`;
        }
        return this.downloadData.map((data) => 
        html`
            <div class="row">
                <data-source
                    .data="${data}"
                    .forExport="${true}">
                </data-source>
                <div class="delete-container">
                    <paper-icon-button
                        icon="icons:delete"
                        @click="${() => {
                            this.dispatchEvent(new CustomEvent<DataSource>(DownloadQueueEvents.REQUEST_DELETE, {detail: data}));
                        }}"
                    >
                    </paper-icon-button>
                </div>
            </div>`)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'download-queue': DownloadQueue;
    }
}
