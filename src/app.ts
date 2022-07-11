import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';

import './download-queue';
import './map-view';
import './data-source-list';

import {LitElement, html, css, nothing} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {PaperTabsElement} from '@polymer/paper-tabs/paper-tabs.js';

import {DataSource} from './data-source';

enum Page {
  Home = 'home',
  Refinery = 'refinery',
}

@customElement('butterfly-app')
export class App extends LitElement {
  @property({type: Boolean}) notify = false;
  @property({type: Boolean}) opened = false;
  @property({type: Array}) downloadData: DataSource[] = [];
  @property({type: Number}) selectedTab = 0;
  @property({type: String}) page = Page.Home;
  @property({type: Object}) dataSource: DataSource | null = null;

  @query('.view-tabs') viewTabs!: PaperTabsElement;

  static override styles = css`
    * {
      font-family: sans-serif;
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

    app-header {
      background-color: white;
    }

    app-drawer-layout,
    app-drawer {
      --app-drawer-width: 500px;
    }

    app-drawer {
      text-align: left;
    }

    app-toolbar h1 {
      font-size: 32px;
      text-transform: uppercase;
    }

    app-toolbar a {
      color: black;
      font-size: 12px;
      font-weight: bold;
      padding: 16px;
      text-decoration: none;
      text-transform: uppercase;
    }

    app-toolbar a:hover {
      background-color: #eee;
    }

    .view-tabs {
      text-transform: uppercase;
    }

    .view-tabs paper-tab {
      width: 50px;
      border: 1px solid black;
      color: black;
      font-weight: bold;
      --paper-tabs-selection-bar-color: rgba(0, 0, 0, 0, 0);
    }

    .view-tabs paper-tab[focused] {
      color: white;
      background-color: black;
    }

    iron-pages > div {
      background-color: #ddd;
    }

    footer {
      background-color: black;
      color: white;
      padding: 36px;
    }

    footer > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    footer .menu {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }

    footer .menu a {
      color: white;
      font-size: 12px;
      font-weight: bold;
      padding: 16px;
      text-decoration: none;
      text-transform: uppercase;
    }

    footer .menu a:hover {
      background-color: #333;
    }

    footer > div > h1 {
      margin: 0;
      text-transform: uppercase;
    }

    footer p {
      font-size: 12px;
    }

    footer p a {
      color: white;
    }
  `;

  override render() {
    return html`
      <app-drawer-layout .forceNarrow=${true}>
        <app-drawer
          slot="drawer"
          align="right"
          @opened-changed="${(e: CustomEvent<{value: boolean}>) => {
            if (this.notify && e.detail.value) {
              this.notify = false;
            }
          }}"
        >
          <div>
            <paper-icon-button drawer-toggle icon="icons:close">
            </paper-icon-button>
          </div>
        </app-drawer>
        <app-header-layout>
          <app-header slot="header" reveals effects="waterfall">
            <app-toolbar>
              <h1 main-title>Refinery Air Watch</h1>
              <a href="./">Map</a>
              <a href="./rankings">Rankings</a>
              <a href="./about">About</a>
              <a href="./list">My List</a>
            </app-toolbar>
          </app-header>
          ${this.renderPage()}
        </app-header-layout>
      </app-drawer-layout>
      <footer>
        <div>
          <div class="menu">
            <a href="./">Map</a>
            <a href="./rankings">Rankings</a>
            <a href="./about">About</a>
            <a href="./list">My List</a>
          </div>
          <h1>Refinery Air Watch</h1>
        </div>
        <p>
          Fairtech is a research organization within Drexel University Center
          for....
          <br />
          Learn more at
          <a href="https://fairtechcollective.org/" target="_blank"
            >fairtechcollective.org</a
          >
        </p>
        <p>© 2022</p>
      </footer>
    `;
  }

  renderPage() {
    switch (this.page) {
      case Page.Home:
        return this.renderHomePage();
      case Page.Refinery:
        return this.renderHomePage();
      default:
        return nothing;
    }
  }

  renderHomePage() {
    return html` <h2>
        Downloadable U.S. Oil Refinery Fenceline Monitoring Data
      </h2>
      <p>
        This site aims to collect fenceline monitoring data from oil refineries
        and other petrochemical facilities. The data here includes sampling data
        from all U.S. oil refineries and continuous data from a subset of
        California refineries.
      </p>
      <paper-tabs
        class="view-tabs"
        selected="${this.selectedTab}"
        noink
        @selected-changed="${() => {
          this.selectedTab = Number(this.viewTabs.selected);
        }}"
      >
        <paper-tab .noBar="${true}">Map View</paper-tab>
        <paper-tab .noBar="${true}">List View</paper-tab>
      </paper-tabs>
      <iron-pages selected="${this.selectedTab}">
        <map-view>
          <slot name="map" slot="map"></slot>
        </map-view>
        <data-source-list></data-source-list>
      </iron-pages>`;
  }

  renderRefineryPage() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'butterfly-app': App;
  }
}
