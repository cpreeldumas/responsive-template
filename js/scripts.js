mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-73.90641, 40.70407],
    zoom: 14
});

var dummyPolygonGeojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [
                    [
                        [
                            -73.90240102877888,
                            40.69225961915524
                        ],
                        [
                            -73.90063835855649,
                            40.69301160281523
                        ],
                        [
                            -73.89959174832947,
                            40.695100145268725
                        ],
                        [
                            -73.89452458506521,
                            40.70061332988624
                        ],
                        [
                            -73.8966743469728,
                            40.706083592775
                        ],
                        [
                            -73.90030887295401,
                            40.71268190818182
                        ],
                        [
                            -73.91545777469034,
                            40.71372969173805
                        ],
                        [
                            -73.91948036967227,
                            40.71197649337091
                        ],
                        [
                            -73.92609305635537,
                            40.7057526171412
                        ],
                        [
                            -73.90240102877888,
                            40.69225961915524
                        ]
                    ]
                ],
                "type": "Polygon"
            }
        }
    ]
}



map.addControl(new mapboxgl.NavigationControl());

// code is only executed when map has finished initial load
map.on('load', () => {

    map.addSource('dummyPolygon', {
        "type": "geojson",
        "data": dummyPolygonGeojson
    })

    // fill layer
    map.addLayer({
        'id': 'dummyPolygon-fill',
        'type': 'fill',
        'source': 'dummyPolygon',
        'layout': {},
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.2
        }
    }, 'path-pedestrian-label');

    // line layer
    map.addLayer({
        'id': 'dummyPolygon-line',
        'type': 'line',
        'source': 'dummyPolygon',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3,
            'line-dasharray': [5, 5]
        }
    }, 'path-pedestrian-label');

    // list all layers on map in the console
    console.log(
        map.getStyle().layers
    )

    // add pluto data
    map.addSource('ridgewood', {
        "type": "geojson",
        "data": "data/ridgewood.geojson"
    })

    // line layer
    map.addLayer({
        'id': 'ridgewood-line',
        'type': 'line',
        'source': 'ridgewood',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 0.5
        }
    }, 'path-pedestrian-label');

      // fill layer
      map.addLayer({
        'id': 'ridgewood-fill',
        'type': 'fill',
        'source': 'ridgewood',
        'layout': {},
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'UnitsRes'],
                0,
                '#ece7f2',
                4,
                '#a6bddb',
                10,
                '#2b8cbe'
            ], 
            'fill-opacity': 0.8
        }
    }, 'path-pedestrian-label');

})