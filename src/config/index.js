const snackbarCfg = {
  timeout: 5000 // shackbar display time
}

const apiCfg = {
  baseUrl: 'https://mock-api.dev.lalamove.com',
  retryDelay: 5000, // retry delay when call in progress
  retryCount: 3 // maximum retry time
}

const mapCfg = {
  streetViewControl: false, // hide street view
  mapTypeControl: false, // hide map type
  zoom: 11,
  minZoom: 3,
  center: { // set default center to hong kong
    lat: 22.3529913,
    lng: 113.9876132
  }
}

const mapDirectionCfg = {
  service: {
    travelMode: 'DRIVING'
  },
  renderer: {
    preserveViewport: true, // prevent auto center (handled by mapMarker)
    suppressMarkers: true // prevent renderering marker (handled by mapMarker)
  }
}

const mapMarkerCfg = {
  label: {
    color: 'white'
  }
}

const mapPlaceCfg = {
  omponentRestrictions: 'hk', // set returned places restrict to hong kong
  location: mapCfg.center,
  radius: 40000
}

export { snackbarCfg, apiCfg, mapCfg, mapDirectionCfg, mapMarkerCfg, mapPlaceCfg }
