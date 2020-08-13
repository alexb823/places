import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import { setPlaces } from '../store/placesActions';

const styles = StyleSheet.create({});

const PlacesListScreen = ({ navigation }) => {
  const { places } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaces());
  }, []);

  const renderItemHandler = ({ item }) => {
    return (
      <PlaceItem
        title={item.title}
        image={item.imageUri}
        address={item.address}
        onSelect={() => navigation.navigate('PlaceDetail', { item })}
      />
    );
  };

  return <FlatList data={places} renderItem={renderItemHandler} />;
};

PlacesListScreen.navigationOptions = ({ navigation }) => {
  const headerRight = () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Add Place"
        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
        onPress={() => navigation.navigate('NewPlace')}
      />
    </HeaderButtons>
  );
  return {
    headerTitle: 'All Places',
    headerRight,
  };
};

export default PlacesListScreen;
