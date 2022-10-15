import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let mapboxgl: any;

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit, AfterViewInit {
	lat: number;
	lng: number;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		let geo: any = this.route.snapshot.paramMap.get('geo');
		console.log(geo);
		geo = geo.substring(4);
		geo = geo.split(',');
		this.lat = Number(geo[0]);
		this.lng = Number(geo[1]);
		console.log(this.lat, this.lng);
	}

	ngAfterViewInit() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoibGl6YW5kcm82NjYiLCJhIjoiY2w4ZzA0NHR0MGV0ZTNxbGx1ZTE0aHRuMyJ9.1qzWx84drL4-JCdWHmmPqA';
		const map = new mapboxgl.Map({
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/light-v10',
			center: [ this.lng, this.lat ],
			zoom: 15.5,
			pitch: 45,
			bearing: -17.6,
			container: 'map',
			antialias: true
		});

		map.on('load', () => {
			// Insert the layer beneath any symbol layer.
			map.resize();
			new mapboxgl.Marker().setLngLat([ this.lat, this.lng ]).addTo(map);
			const layers = map.getStyle().layers;
			const labelLayerId = layers.find((layer) => layer.type === 'symbol' && layer.layout['text-field']).id;

			// The 'building' layer in the Mapbox Streets
			// vector tileset contains building height data
			// from OpenStreetMap.
			map.addLayer(
				{
					id: 'add-3d-buildings',
					source: 'composite',
					'source-layer': 'building',
					filter: [ '==', 'extrude', 'true' ],
					type: 'fill-extrusion',
					minzoom: 15,
					paint: {
						'fill-extrusion-color': '#aaa',

						'fill-extrusion-height': [
							'interpolate',
							[ 'linear' ],
							[ 'zoom' ],
							15,
							0,
							15.05,
							[ 'get', 'height' ]
						],
						'fill-extrusion-base': [
							'interpolate',
							[ 'linear' ],
							[ 'zoom' ],
							15,
							0,
							15.05,
							[ 'get', 'min_height' ]
						],
						'fill-extrusion-opacity': 0.6
					}
				},
				labelLayerId
			);
		});
	}
}
