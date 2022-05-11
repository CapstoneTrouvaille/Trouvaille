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

export const getPlacesData = async () => {
  try {
    const response= await axios.get(`https://travel-advisor.p.rapidapi.com/locations/search`, {
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
    console.log("TRIP API:",response.data.data[0].result_object.location_id)
    // return data;
  } catch (error) {
    console.log(error);
  }
};
