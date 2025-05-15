import 'dotenv/config'; // pulls from root .env

export default {
  expo: {
    name: "ctip_15",
    slug: "ctip_15",
    version: "1.0.0",
    extra: {
      API_URL: process.env.API_URL || "http://10.0.2.2:5000",
    },
  },
};
