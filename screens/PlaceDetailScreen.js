import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { places } from '../store/placesReducer';

const styles = StyleSheet.create({});

const PlaceDetailScreen = () => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = ({ navigation }) => {
  const placeTitle = navigation.getParam('title');

  return {
    headerTitle: placeTitle,
  };
};

export default PlaceDetailScreen;
