import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-menu-button/paper-menu-button.js';

import {LitElement, html, css} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
import {PaperDropdownMenuElement} from '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';

export enum FileFormat {
    CSV='csv',
    JSON='json',
}

@customElement('file-format-selector')
export class FileFormatSelector extends LitElement {

    @property({type: String}) fileFormat = FileFormat.CSV;
    @query('paper-dropdown-menu') fileFormatDropdown!: PaperDropdownMenuElement;

    static override styles = css`
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

    override firstUpdated() {
        this.fileFormatDropdown.value = this.fileFormat;
    }

    override render() {
        return html`
            <paper-dropdown-menu label="File format">
                <paper-listbox slot="dropdown-content">
                    ${Object.values(FileFormat)
                            .map((format) => 
                                html`<paper-item>${format}</paper-item>`)}
                </paper-listbox>
            </paper-dropdown-menu>
        `;
    }
}

@customElement('file-format-download')
export class FileFormatDownloadButton extends LitElement {

    @property({type: String}) fileFormat = FileFormat.CSV;
    @query('paper-dropdown-menu') fileFormatDropdown!: PaperDropdownMenuElement;

    static override styles = css``;

    override render() {
        return html`
            <paper-menu-button>
                <paper-button slot="dropdown-trigger">
                    Download Now
                    <iron-icon icon="icons:arrow-drop-down"></iron-icon>
                </paper-button>
                <paper-listbox slot="dropdown-content">
                    ${Object.values(FileFormat)
                            .map((format) => 
                                html`<paper-item>${format}</paper-item>`)}
                </paper-listbox>
            </paper-menu-button>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'file-format-selector': FileFormatSelector;
        'file-format-download': FileFormatDownloadButton;
    }
}
