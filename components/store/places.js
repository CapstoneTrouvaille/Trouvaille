import axios from 'axios'

const GET_PLACES = "GET_PLACES"

export const _getPlaces = (places) => ({
  type: GET_PLACES,
  places
})

export const getLocationId = async () => {
  try {
    const {data: {data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/locations/search`, {
      params: {
      query:"new york",
      limit: '30',
      offset: '0',
      units: 'km',
      location_id: '1',
      currency: 'USD',
      sort: 'relevance',
      lang: 'en_US'},
      headers:  {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': '61deca7304msh88be34d763afafdp120af6jsnef5a29b6ce65'
      },
    });
    console.log("LOCATION ID FROM API:",data[0].result_object.location_id)
    return data[0].result_object.location_id;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaces = (locationInput) => {
  return async (dispatch) => {
    try {
      const locationId = await getLocationId(locationInput)
      const {data: {data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/attractions/list`, {
      params: {
        location_id: locationId,
        currency: 'USD',
        lang: 'en_US',
        lunit: 'km',
        sort: 'recommended'
      },
      headers:  {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': '61deca7304msh88be34d763afafdp120af6jsnef5a29b6ce65'
      },
    });
    console.log("PLACES FROM API", data[0].name)
    return data
    } catch (error) {
      console.log(error)
    }
  }
}


const placesReducer = (state = [], action) => {
  switch(action.type) {
    case GET_PLACES:
      return action.places
    default:
      return state
  }
}

export default placesReducer
