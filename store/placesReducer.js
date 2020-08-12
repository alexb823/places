import { ADD_PLACE, SET_PLACES } from './placesActions';
import Place from '../models/place';

const initialState = {
  places: [],
};

export const places = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        places: [
          ...state.places,
          new Place(
            action.place.id.toString(),
            action.place.title,
            action.place.image
          ),
        ],
      };
    case SET_PLACES:
      return {
        places: action.places.map((place) => ({
          ...place,
          id: place.id.toString(),
        })),
      };
    default:
      return state;
  }
};
