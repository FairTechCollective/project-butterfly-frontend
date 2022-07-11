import * as d3 from 'd3';
import {ExtendedFeatureCollection} from 'd3-geo';
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('map-view')
export class MapView extends LitElement {

    static override styles = css`
        slot {
            height: 480px;
        }
    `;

    override firstUpdated() {
        const svg = document.body.querySelector('#map');
        if (!svg) {
            throw new Error('SVG map should be initialized.')
        }
        const bbox = svg.getBoundingClientRect();
        const width = bbox.width;
        const height = bbox.height;
        let projection = d3.geoMercator();
        Promise.all([d3.json('united_states.geojson'), d3.json('refineries.geojson')]).then((bbs) => {
            document.getElementById('map-container')!.style.visibility = 'visible';
            const usBB = bbs[0] as ExtendedFeatureCollection;
            const refineriesBB = bbs[1] as ExtendedFeatureCollection;
            projection.fitSize([width, height], refineriesBB as ExtendedFeatureCollection);
            let geoGenerator = d3.geoPath().projection(projection)
            d3.select('#map').append('g').selectAll('path')
               .data((usBB as ExtendedFeatureCollection).features)
               .join('path')
               .attr('d', geoGenerator)
               .attr('fill', 'white')
               .attr('stroke', '#eee')
            d3.select('#map').append('g').selectAll('path')
               .data((refineriesBB as ExtendedFeatureCollection).features)
               .join('path')
               .attr('d', geoGenerator.pointRadius(() => 1))
               .attr('fill', 'black')
        });
    }

    override render() {
        return html`
            <slot name="map"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'map-view': MapView;
    }
}