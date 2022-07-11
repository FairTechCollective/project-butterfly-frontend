var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as d3 from 'd3';
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
let MapView = class MapView extends LitElement {
    firstUpdated() {
        const svg = document.body.querySelector('#map');
        if (!svg) {
            throw new Error('SVG map should be initialized.');
        }
        const bbox = svg.getBoundingClientRect();
        const width = bbox.width;
        const height = bbox.height;
        let projection = d3.geoMercator();
        Promise.all([d3.json('geojson/united_states.geojson'), d3.json('geojson/refineries.geojson')]).then((bbs) => {
            document.getElementById('map-container').style.visibility = 'visible';
            const usBB = bbs[0];
            const refineriesBB = bbs[1];
            projection.fitSize([width, height], refineriesBB);
            let geoGenerator = d3.geoPath().projection(projection);
            d3.select('#map').append('g').selectAll('path')
                .data(usBB.features)
                .join('path')
                .attr('d', geoGenerator)
                .attr('fill', 'white')
                .attr('stroke', '#eee');
            d3.select('#map').append('g').selectAll('path')
                .data(refineriesBB.features)
                .join('path')
                .attr('d', geoGenerator.pointRadius(() => 1))
                .attr('fill', 'black');
        });
    }
    render() {
        return html `
            <slot name="map"></slot>
        `;
    }
};
MapView.styles = css `
        slot {
            height: 480px;
        }
    `;
MapView = __decorate([
    customElement('map-view')
], MapView);
export { MapView };
//# sourceMappingURL=map-view.js.map