import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});

const MapScreen = ({ navigation }) => {
  const initialLocation = navigation.getParam('initialLocation');
  const readOnly = navigation.getParam('readOnly');

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: selectedLocation?.latitude || 37.78,
    longitude: selectedLocation?.longitude || -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e) => {
    if (!readOnly) setSelectedLocation(e.nativeEvent.coordinate);
  };

  const savePickedLocationHandler = () => {
    if (selectedLocation) navigation.navigate('NewPlace', { selectedLocation });
  };

  useEffect(() => {
    navigation.setParams({ savePickedLocation: savePickedLocationHandler });
  }, [selectedLocation]);

  return (
    <MapView
      style={styles.map}
      region={region}
      provider="google"
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked Place" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = ({ navigation }) => {
  const savePickedLocation = navigation.getParam('savePickedLocation');
  const readOnly = navigation.getParam('readOnly');

  const headerRight = () => {
    if (!readOnly) {
      return (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={savePickedLocation}
        >
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      );
    }
  };

  return {
    headerRight,
  };
};

export default MapScreen;
