import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const ImgPicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = () => {
    return Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      .then((res) => {
        if (res.status !== 'granted') {
          Alert.alert(
            'Insufficient Permissions',
            'Need to grant camera access to use this app',
            [{ text: 'Okay' }]
          );
          return false;
        }
        return true;
      })
      .catch((e) => console.log(e));
  };

  const takeImageHandler = () => {
    verifyPermissions()
      .then((permission) => {
        if (!permission) return;

        return ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.7,
        });
      })
      .then((image) => {
        setPickedImage(image.uri);
        onImageTaken(image.uri);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image Yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImgPicker;
