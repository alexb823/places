import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const PlaceDetailScreen = ({ navigation }) => {
  const {
    imageUri,
    address,
    latitude,
    longitude,
  } = navigation.getParam('item');

  const initialLocation = { latitude, longitude };

  const showMapHandler = () => {
    navigation.navigate('Map', {readOnly: true, initialLocation});
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={initialLocation}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = ({ navigation }) => {
  const { title } = navigation.getParam('item');

  return {
    headerTitle: title,
  };
};

export default PlaceDetailScreen;
