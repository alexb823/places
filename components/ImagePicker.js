import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  imagePicker: {},
  imagePreview: {},
  image: {},

})


const ImagePicker = () => {
  const takeImageHandler = () => {};

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No Image Yet</Text>
        <Image style={styles.image} />
        </View>
      <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler}/>

    </View>
  )
}

export default ImagePicker
