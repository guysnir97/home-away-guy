import React from 'react';
import { Map,  Marker, GoogleApiWrapper } from 'google-maps-react';

class _Map extends React.Component {

  state = {
    width: '100%',
    height: '300px',

  }

  render() {
    const { lat, lng } = this.props
    return (
      <Map
        google={this.props.google}
        zoom={10}
        initialCenter={{ lat, lng }}
        center={{ lat, lng }}
        containerStyle={this.state}
      >
        <Marker
          title={'Marker'}
          name={'Marker'}
          position={{ lat, lng }} />

      </Map >
    )
  }

}


export const MapDetails = GoogleApiWrapper({ apiKey: ('AIzaSyBWY-vmGWLAbqqbJ6uQwlw6G1FPxlH_5Ms') })(_Map)

