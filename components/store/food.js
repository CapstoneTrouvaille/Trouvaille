import axios from "axios";
import { getLocationId } from "./places";
import Constants from "expo-constants";

const GET_FOOD = "GET_FOOD";

export const _getFood = (food) => {
  return {
    type: GET_FOOD,
    food,
  };
};

export const getFood = (locationInput) => {
  return async (dispatch) => {
    try {
      const locationId = await getLocationId(locationInput);
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/restaurants/list`,
        {
          params: {
            location_id: locationId,
            restaurant_tagcategory: "10591",
            restaurant_tagcategory_standalone: "10591",
            currency: "USD",
            lunit: "km",
            limit: "30",
            open_now: "false",
            lang: "en_US",
          },
          headers: {
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            "X-RapidAPI-Key": Constants.manifest.extra.APIKey,
          },
        }
      );
      dispatch(_getFood(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const food = (state = [], action) => {
  switch (action.type) {
    case GET_FOOD:
      return action.food;
    default:
      return state;
  }
};

export default food;
