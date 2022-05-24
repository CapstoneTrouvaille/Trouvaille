import axios from "axios";
import Constants from "expo-constants";

const GET_PLACES = "GET_PLACES";

export const _getPlaces = (places) => {
  return {
    type: GET_PLACES,
    places,
  };
};

export const getLocationId = async (locationInput) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/locations/search`,
      {
        params: {
          query: locationInput,
          limit: "1",
          offset: "0",
          units: "km",
          location_id: "1",
          currency: "USD",
          sort: "relevance",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          "X-RapidAPI-Key": Constants.manifest.extra.APIKey,
        },
      }
    );
    return data[0].result_object.location_id;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaces = (locationInput) => {
  return async (dispatch) => {
    try {
      const locationId = await getLocationId(locationInput);
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/attractions/list`,
        {
          params: {
            location_id: locationId,
            currency: "USD",
            lang: "en_US",
            lunit: "km",
            sort: "recommended",
          },
          headers: {
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            "X-RapidAPI-Key": Constants.manifest.extra.APIKey,
          },
        }
      );
      dispatch(_getPlaces(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const places = (state = [], action) => {
  switch (action.type) {
    case GET_PLACES:
      return action.places;
    default:
      return state;
  }
};

export default places;
