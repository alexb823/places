import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const styles = StyleSheet.create({
  locationPicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});

const LocationPicker = ({ navigation, onLocationPicked }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = navigation.getParam('selectedLocation');

  useEffect(() => {
    if(mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const verifyPermissions = () => {
    return Permissions.askAsync(Permissions.LOCATION)
      .then((res) => {
        if (res.status !== 'granted') {
          Alert.alert(
            'Insufficient Permissions',
            'Need to grant location access to use this app',
            [{ text: 'Okay' }]
          );
          return false;
        }
        return true;
      })
      .catch((e) => console.log(e));
  };
  const getLocationHandler = () => {
    verifyPermissions().then((permission) => {
      if (!permission) return;
      setIsFetching(true);
      return Location.getCurrentPositionAsync({ timeout: 5000 })
        .then(({ coords: { latitude, longitude } }) => {
          setPickedLocation({ latitude, longitude });
          onLocationPicked({ latitude, longitude });
        })
        .catch((e) => {
          console.log(e);
          Alert.alert(
            'Could not get location!',
            'Please try again later, or pick a location on the map',
            [{ text: 'Okay' }]
          );
        })
        .finally(() => setIsFetching(false));
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Location Set</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;
