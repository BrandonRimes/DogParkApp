// let map, service, infoWindow;

// function initMap() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const pos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 };
//                 infoWindow.setPosition(pos);
//                 infoWindow.setContent("You are here");
//                 infoWindow.open(map);
//                 map.setCenter(pos);
//             },
//             () => {
//                 handleLocationError(true, infoWindow, map.getCenter());
//             }
//         );
//     } else {
//         handleLocationError(false, infoWindow, map.getCenter());
//     }
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: 27.2621, lng: -80.2621 },
//         zoom: 6,
//     });
//     var request = {
//         location: map.getCenter(),
//         radius: '1500',
//         type: ['food']
//     };
//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
//     infoWindow = new google.maps.InfoWindow();
// }
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(
//         browserHasGeolocation
//             ? "Error: The Geolocation service failed."
//             : "Error: Your browser doesn't support geolocation."
//     );
//     infoWindow.open(map);
// }
// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             var marker = new google.maps.Marker({
//                 position: results[i].geometry.location,
//             });
//             console.log(results[i].geometry.location)
//             new google.maps.Marker(map.getCenter());
//             marker.setMap(map);
//         }
//     }
// }

const vm = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        pos: {},
        map: undefined,
        parks: [],
        infoWindow: undefined,
        markers: [],
        searchResults: [],
        csrf_token: '',
    },
    methods: {
        getLocation: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        this.map = new google.maps.Map(document.getElementById("map"), {
                            center: this.pos,
                            zoom: 6,
                        });
                        this.infoWindow = new google.maps.InfoWindow();
                        this.infoWindow.setPosition(this.pos);
                        this.infoWindow.setContent("You are here");
                        this.infoWindow.open(this.map);
                    },
                    () => {
                        handleLocationError(true, infoWindow, map.getCenter());
                    }
                );
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            };
            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                this.infoWindow.setPosition(pos);
                this.infoWindow.setContent(
                    browserHasGeolocation
                        ? "Error: The Geolocation service failed."
                        : "Error: Your browser doesn't support geolocation."
                );
                this.infoWindow.open(map);
            }
        },
        createMap: function () {
            console.log('createMap')            
            // Create script tag, set attributes
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GM_API_KEY}&libraries=places&callback=initMap`;
            script.async = true;

            // Attach callback function to `window` object
            window.initMap = function() {
                console.log('window.initMap')
                this.map = new google.maps.Map(document.getElementById("map"), {
                center: this.pos,
                zoom: 6,
                });
            // JS API is loaded and available
        };
        
            // Append 'script' element to 'head'
            document.head.appendChild(script);
        },
        findParks: function () {
            console.log('findParks');
            const request = {
                location: this.map.getCenter(),
                radius: '9000',
                type: ['park'],
                keyword: 'dog',
            };
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    this.searchResults = results;
                    this.saveParks();
                    this.loadParks();
                }
            })
        },
        saveParks: function () {
            console.log('saveParks')
            axios({
                method: 'get',
                url: '/apis/v1/'
            }).then(response => {
                this.parks = response.data
                this.searchResults.forEach( park => {
                    const parkObject = {
                        place_id: park.place_id,
                        title: park.name,
                        lat: park.geometry.location.lat(),
                        lng: park.geometry.location.lng(),
                    }
                    const parkIds = this.parks.map(park => park.place_id)
                    if (!parkIds.includes(park.place_id)) {
                        console.log(park.place_id, parkIds)
                        axios({
                            headers: {
                                'X-CSRFToken': this.csrf_token
                            },
                            method: 'post',
                            url: '/apis/v1/',
                            data: parkObject,
                        }).then(response => {
                        })
                    }
                })
            }).catch(error => console.log(error))
        },
        loadParks: function () {
            console.log('loadParks');
            axios({
                method: 'get',
                url: '/apis/v1/'
            }).then(response => {
                this.parks = response.data
                // this.parks.forEach( park => {
                    
                // })
                this.addMarkers()
            }).catch(error => console.log(error))
        }, 
        addMarkers: function () {
            console.log('addMarkers')
            this.parks.forEach( park => {
                const marker = new google.maps.Marker({
                    position: {lat: park.lat, lng: park.lng},
                    map: this.map,
                    title: park.title,
                });
                const infowindow = new google.maps.InfoWindow({
                    content: park.title,
                });
                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });
                marker.setMap(this.map);
            })
        },
    },
    created: function() {
        console.log('created')
        this.getLocation()
        this.createMap()
    },
    mounted: function() {
        console.log('mounted')
        this.csrf_token = document.querySelector('input[name="csrfmiddlewaretoken"]').value
    },
    watch: {
        pos: function() {
            console.log('pos watch')
        },
        map: function() {
            console.log('map watch')
            this.findParks()
        }
    }
})