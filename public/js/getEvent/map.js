import { MAPBOX_API_KEY } from '../utilities/config';

const mapEl = document.querySelector('#map');

export function addMap() {
  const map = L.map('map', {
    scrollWheelZoom: false,
    dragging: !L.Browser.mobile,
  }).setView([49.883226, -97.155884], 2);

  L.tileLayer(`https://api.mapbox.com/styles/v1/saman2111/cl79xjeka001714n0hqhmd9mg/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEY}`).addTo(map);

  map.setView([49.883226, -97.155884], 2, {
    animate: true,
    pan: {
      duration: 2,
    },
  });

  let marker = undefined;

  function mapSetView(lat, lng, zoom, locationName) {
    // Remove marker
    if (marker !== undefined) {
      map.removeLayer(marker);
    }

    // Create marker
    if (locationName !== '') {
      marker = L.marker([lat, lng]).addTo(map).bindPopup(`<p>${locationName}</p>`).openPopup();
    }

    // Center map on location
    map.setView([lat, lng], zoom, {
      animate: true,
      pan: {
        duration: 2,
      },
    });
  }

  mapSetView(mapEl.dataset.lat, mapEl.dataset.lng, 11, mapEl.dataset.addressDescription);
}
