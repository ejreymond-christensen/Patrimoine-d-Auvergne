  var map;
  var markers= [];
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.560, lng: 2.965},
      zoom: 9,
      mapTypeId: 'terrain',
      styles:[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "stylers": [
            {
              "color": "#5e5e5e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#5e5e5e"
            },
            {
              "weight": 1
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
            {
              "weight": 1
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            },
            {
              "weight": 0.5
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]
    });
    //Creates infoWindow on init
    var largeInfoWindow = new google.maps.InfoWindow();

    //Creates markers, pushes them to the Markers array and sets them on the map.

    function setMarkers(map){
      for (var i = 0; i < locations.length; i++) {
        var loc = locations[i];
        var title = loc.title;
        var city = loc.city;
        var catagory = loc.catagory;
        var position = loc.location;
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: position,
          title: title,
          city: city,
          catagory: catagory
        })
        //console.log(marker.title);
        //console.log(marker.position);
        markers.push(marker);
        //Creates an onclick event to open infoWindow
        marker.addListener('click', function(){
          populateInfoWindow(this, largeInfoWindow);
        });
      }
    }
    //Pulls geocode from markers array and sets frame of the map to include all points
    function setBoundry() {
      var frame = new google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++) {
        frame.extend(markers[i].position);
      }
      map.fitBounds(frame);
    }

    //Infowindow functionality
    function populateInfoWindow(markers, infoWindow){
      if (infoWindow.markers != markers) {
        infoWindow.markers = markers;
        infoWindow.setContent('<div>' +'<h2>'+ markers.title +'</h2>'+'</div>'+'<div>' +'Ville: '+ markers.city +", France" + '</div>'+'<div>' +'Type: '+ markers.catagory+ '</div>');
        infoWindow.open(map, markers);
        infoWindow.addListener('closeclick', function(){
          infoWindow.markers = null;
        });
      }
    }
    //Sets markers on map
    setMarkers(map);
    //Sets the frame
    setBoundry();
  }
