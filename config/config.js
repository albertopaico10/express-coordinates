var pkg = require('../package.json');

var config = {};
config.port = process.env.PORT || 3000;
config.file_live="./data/live-map-";
config.file_history="./data/history-map-";
config.code_response_error="ERROR";
config.code_response_register_success="SUCCESS_REGISTER";
config.code_response_get_success="SUCCESS_GET";
config.date_now=Date.now();
config.format_txt=".txt";

module.exports = config;