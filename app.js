var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './data-source-list';
import './download-queue';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
let App = class App extends LitElement {
    constructor() {
        super(...arguments);
        this.notify = false;
        this.opened = false;
        this.downloadData = [];
    }
    render() {
        return html `
                <app-drawer-layout .forceNarrow=${true}>
                    <app-drawer
                        slot="drawer"
                        align="right"
                        @opened-changed="${(e) => {
            if (this.notify && e.detail.value) {
                this.notify = false;
            }
        }}">
                        <div>
                            <paper-icon-button drawer-toggle icon="icons:close">
                            </paper-icon-button>
                            <download-queue
                                .downloadData="${this.downloadData}"
                                @request-delete="${(e) => {
            const data = JSON.stringify(e.detail);
            if (data) {
                this.downloadData = [
                    ...new Set([...this.downloadData]
                        .map((d) => JSON.stringify(d))
                        .filter((d) => d !== data))
                ].map((s) => JSON.parse(s));
            }
        }}">
                            </download-queue>
                        </div>
                    </app-drawer>
                    <app-header-layout>
                        <app-header slot="header" reveals effects="waterfall">
                            <app-toolbar>
                                <iron-icon
                                    icon="icons:help"
                                ></iron-icon>
                                <div main-title>Project Butterfly</div>
                                <input type="text">
                                <paper-icon-button icon="search">
                                </paper-icon-button>
                                <paper-icon-button
                                    drawer-toggle
                                    class="${classMap({
            notify: this.notify,
        })}"
                                    icon="icons:file-download">
                                </paper-icon-button>
                            </app-toolbar>
                        </app-header>
                        <data-source-list
                            size="100"
                            @request-download="${this.handleDataRequest}">
                        </data-source-list>
                </app-header-layout>
            </app-drawer-layout>
        `;
    }
    handleDataRequest(e) {
        const data = e.detail;
        if (data) {
            this.downloadData = [
                ...new Set([...this.downloadData, data].map((d) => JSON.stringify(d)))
            ].map((s) => JSON.parse(s));
            this.notify = true;
        }
    }
};
App.styles = css `
        app-header {
            background-color: #00897B;
            color: #fff;
        }

        paper-icon-button {
            --paper-icon-button-ink-color: white;
        }

        paper-icon-button.notify:after {
            background-color: red;
            border-radius: 50%;
            content: '';
            position: absolute;
            height: 8px;
            width: 8px;
            top: 3px;
        }

        app-drawer-layout, app-drawer {
            --app-drawer-width: 500px;
        }

        app-drawer {
            text-align: left;
        }

        app-drawer > div {
            height: 100%;
            overflow: auto;
        }
    `;
__decorate([
    property({ type: Boolean })
], App.prototype, "notify", void 0);
__decorate([
    property({ type: Boolean })
], App.prototype, "opened", void 0);
__decorate([
    property({ type: Array })
], App.prototype, "downloadData", void 0);
App = __decorate([
    customElement('butterfly-app')
], App);
export { App };
//# sourceMappingURL=app.js.map