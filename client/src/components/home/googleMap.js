import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const style = {
    width: '100%',
    height: '100%',
  }
const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '80vh',
  }

export class SimpleMap extends Component {
  render() {
    return (
      <Map
      containerStyle={containerStyle}
      style={style}
        google={this.props.google}
        zoom={12}
        initialCenter={{
         lat: 44.261783,
         lng: 0.701881
        }}>
        <Marker
            title={'Location'}
            name={'coucou'}
            position={{lat: 44.261783, lng: 0.701881}}
            />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(SimpleMap);
