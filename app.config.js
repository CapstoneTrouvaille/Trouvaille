import "dotenv/config";

export default {
  name: "Trouvaille",
  version: "1.0.0",
  extra: {
    APIKey: process.env.RAPID_API_TRIP_ADVISOR_KEY,
  },
};
