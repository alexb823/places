import * as FileSystem from 'expo-file-system';
import axios from 'axios';

import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
  const { latitude, longitude } = location;

  return (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    let address;

    FileSystem.moveAsync({ from: image, to: newPath })
      .then(() =>
        axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${ENV.googleApiKey}`
        )
      )
      .then(({ data }) => {
        address = data.results[0].formatted_address;
        return insertPlace(title, newPath, address, latitude, longitude);
      })
      .then((dbResult) => {
        dispatch({
          type: ADD_PLACE,
          place: {
            id: dbResult.insertId,
            title,
            image: newPath,
            address,
            latitude,
            longitude,
          },
        });
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };
};

export const setPlaces = () => {
  return (dispatch) => {
    fetchPlaces()
      .then(({ rows }) => dispatch({ type: SET_PLACES, places: rows._array }))
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };
};
