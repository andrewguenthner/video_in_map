var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var bounds = L.latLngBounds([[ 32, -130], [ 13, -100]]);

L.rectangle(bounds).addTo(map);

map.fitBounds(bounds);


var videoUrls = [
  'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
  'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
];

var bounds = L.latLngBounds([[ 32, -130], [ 13, -100]]);

var videoOverlay = L.videoOverlay( videoUrls, bounds, {
  opacity: 0.8
}).addTo(map);

videoOverlay.on('load', function () {
  var MyPauseControl = L.Control.extend({
      onAdd: function() {
          var button = L.DomUtil.create('button');
          button.innerHTML = 'Pause ⏸';
          L.DomEvent.on(button, 'click', function () {
              videoOverlay.getElement().pause();
          });
          return button;
      }
  });
  var MyPlayControl = L.Control.extend({
      onAdd: function() {
          var button = L.DomUtil.create('button');
          button.innerHTML = '⏵';
          L.DomEvent.on(button, 'click', function () {
              videoOverlay.getElement().play();
          });
          return button;
      }
  });

  var pauseControl = (new MyPauseControl()).addTo(map);
  var playControl = (new MyPlayControl()).addTo(map);
});