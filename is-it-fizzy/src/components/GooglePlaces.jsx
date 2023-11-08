import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const Component = () => (
  <div>
    <GooglePlacesAutocomplete
      apiKey = {googleApiKey}
    />
  </div>
);

export default Component;