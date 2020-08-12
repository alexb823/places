import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
  return (dispatch) => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    return FileSystem.moveAsync({ from: image, to: newPath })
      .then(() => insertPlace(title, newPath, 'Dummy Address', 15.6, 12.3))
      .then((dbResult) =>
        dispatch({
          type: ADD_PLACE,
          place: { id: dbResult.insertId, title, image: newPath },
        })
      )
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };
};

export const setPlaces = () => {
  return (dispatch) => {
    fetchPlaces()
      // .then((places) => console.log(places))
      .then(({rows}) => dispatch({ type: SET_PLACES, places: rows._array }))
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };
};
