import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const styles = StyleSheet.create({});

const PlacesListScreen = ({ navigation }) => {
  const { places } = useSelector((state) => state.places);

  const renderItemHandler = ({ item: { title, id } }) => {
    return (
      <PlaceItem
        title={title}
        image={'https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/08/Kauai-lead.jpg'}
        address={null}
        onSelect={() => navigation.navigate('PlaceDetail', { title, id })}
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
