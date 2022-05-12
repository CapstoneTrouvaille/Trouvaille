const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
//   params: {query: 'eiffel tower', lang: 'en_US', units: 'km'},
//   headers: {
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
//     'X-RapidAPI-Key': '61deca7304msh88be34d763afafdp120af6jsnef5a29b6ce65'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

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

export const getPlacesData = async () => {
  try {
    const {data: {data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/attractions/list`, {
      params: {
        location_id: '60763',
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
    console.log("PLACES FROM API", data[3].name)
    return data

  } catch (error) {
    console.log(error)
  }
}


export const getRestaurantsData = async () => {
  try {
    const {data: {data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list`, {
      params: {
        location_id: '60763',
        restaurant_tagcategory: '10591',
        restaurant_tagcategory_standalone: '10591',
        currency: 'USD',
        lunit: 'km',
        limit: '30',
        open_now: 'false',
        lang: 'en_US'
      },
      headers:  {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': '61deca7304msh88be34d763afafdp120af6jsnef5a29b6ce65'
      },
    });
    console.log("PLACES FROM API", data[3].name)
    return data
  } catch (error) {
    console.log(error)
  }
}
