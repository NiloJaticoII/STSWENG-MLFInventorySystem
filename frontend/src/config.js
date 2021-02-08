// general config goes here
const configGlob = {};
// production specific config goes here
const configProd = {
  API_URI: "https://mlf-inventory.herokuapp.com"
};
// development specific config goes here
const configDev = {
  API_URI: "http://localhost:5000"
};

// merged config
const config = { configGlob, ...process.env.NODE_ENV === 'production' ? configProd : configDev };
export default config;