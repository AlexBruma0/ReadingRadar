const axios = require("axios");

// set up the request parameters
const params = {
  api_key: "5C34E3D2794B4C448573F4E730AA68E9",
  amazon_domain: "amazon.ca",
  asin: "B01FTC8I84",
  type: "product",
};

// make the http GET request to ASIN Data API
axios
  .get("https://api.asindataapi.com/request", { params })
  .then((response) => {
    // print the JSON response from ASIN Data API
    console.log(response.data.product.main_image.link);
  })
  .catch((error) => {
    // catch and print the error
    console.log(error);
  });
