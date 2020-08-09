import { ADD_PLACE } from './placesActions';
import Place from '../models/place';

const initialState = {
  places: [],
};

export const places = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: [
          ...state.places,
          new Place(Date.now().toString(), action.place.title),
        ],
      };
    default:
      return state;
  }
};
