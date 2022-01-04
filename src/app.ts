import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

import './data-source-list'

@customElement('butterfly-app')
export class App extends LitElement {
    static override styles = css`
        app-header {
            background-color: #00897B;
            color: #fff;
        }

        paper-icon-button {
            --paper-icon-button-ink-color: white;
        }
    `;


    override render() {
        return html`
            <app-header-layout>
                <app-header slot="header" reveals effects="waterfall">
                    <app-toolbar>
                        <iron-icon
                            icon="icons:help"
                        ></iron-icon>
                        <div main-title>Project Butterfly</div>
                        <input type="text">
                        <paper-icon-button icon="search"></paper-icon-button>
                        <paper-icon-button
                            icon="icons:file-download"
                        ></paper-icon-button>
                    </app-toolbar>
                </app-header>
                <data-source-list size="100"></data-source-list>
            </app-header-layout>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'butterfly-app': App;
    }
}
