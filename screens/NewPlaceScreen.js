import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { addPlace } from '../store/placesActions';
import ImgPicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const imageTakenHandler = (imageUri) => {
    setImage(imageUri);
  };

  const locationPickedHandler = (location) => {
    setSelectedLocation(location);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(title, image, selectedLocation));
    navigation.goBack();
  };


  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Add Place',
  };
};

export default NewPlaceScreen;
