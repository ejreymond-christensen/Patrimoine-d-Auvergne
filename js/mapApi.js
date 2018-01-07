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
        catagory: catagory,
        unique: loc.unique,
      });
      locations[i].marker = marker;
      //console.log(marker.title);
      //console.log(marker.position);
      markers.push(marker);

      //Creates an onclick event to open infoWindow and bounce marker
      marker.addListener('click', function(){
        populateInfoWindow(this, largeInfoWindow);
        map.setCenter(this.getPosition());
        for (var i = 0; i < markers.length; i++) {
          markers[i].setAnimation(null);
        }
        markerBounce(this);
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

  //Bounce function for on click
  function markerBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null); }, 1450);
    }
  }

  //Infowindow functionality
  function populateInfoWindow(markers, infoWindow){
    if (infoWindow.markers != markers) {
      infoWindow.markers = markers;
      //infoWindow.setContent('<div class = "topSection">'+'<div>'+'<h3>'+markers.title+'</h3>'+'</div>'+'<div>'+'<b>Ville:</b> '+markers.city+", France" + '</div>'+'<div>' +'<b>Type:</b> '+markers.catagory+'</div>'+'<div>'+'<b>Photos:</b>'+'</div>'+'</div>'+'<div class = "botSection">'+'<div class="photo">'+photoList+'</div>'+'</div>');
      //infoWindow.setContent(photoList);
      infoWindow.open(map, markers);
      infoWindow.addListener('closeclick', function(){
        infoWindow.markers = null;
        setBoundry();
      });

      // JQuery - Ajax function for Flickr Api
      var photoList = ' ';
      var flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=03da237dd6b2bf5116125320aa5b915a&text="+markers.title+"&per_page=15&format=json&nojsoncallback=1";
      console.log(flickrUrl);
      $.getJSON(flickrUrl, {
        tagmode: "any",
        format: "json"
      })
      .done(function(data){
        $.each(data.photos.photo, function(i,items){
          var url = 'http://farm' + items.farm + '.static.flickr.com/' + items.server + '/' + items.id + '_' + items.secret + '_m.jpg';
          var urlTag = '<img class ="indvPhoto" src="'+url+'">';
          photoList += urlTag;
        });
        console.log(photoList);
        infoWindow.setContent('<div class = "topSection">'+'<div>'+'<h3>'+markers.title+'</h3>'+'</div>'+'<div>'+'<b>Ville:</b> '+markers.city+", France" + '</div>'+'<div>' +'<b>Type:</b> '+markers.catagory+'</div>'+'<div>'+'<b>Photos:</b>'+'</div>'+'</div>'+'<div class = "botSection">'+'<div class="photo">'+photoList+'</div>'+'</div>');
      }).fail(function (jqXHR, textStatus) {
            window.alert("Oh no! Flickr could not be reached! Try again later.");
        });
    }
  }

  //function pulls knockout title binding from selected div and displays the correct markers infoWindow
  self.listClick = function(listedClick) {
    for (var i = 0; i < markers.length; i++) {
      if (listedClick.title === markers[i].title) {
        populateInfoWindow(markers[i], largeInfoWindow);
        map.setCenter(markers[i].getPosition());
        markerBounce(markers[i]);
      }
    }
  };

  //function toggles the list pane on the left side for searching.
  document.getElementById("listButton").addEventListener("click", function (toggle){
    var getPane = document.getElementById("listPane").style;
    var getMap = document.getElementById("map").style;
    if(getPane.width === "0px"){
      getPane.width = "20%";
      getMap.width = "80%";
      setBoundry();
    }
    else{
      getPane.width = "0px";
      getMap.width = "100px";
      setBoundry();
    }
  });

  //Sets markers on map
  setMarkers(map);
  //Sets the frame
  setBoundry();
  //invokes the knockout viewmodel
  ko.applyBindings(new ViewModel());
}

function runError() {
  alert('Oppps Google Maps could not be reached. Please try again later.');
}
