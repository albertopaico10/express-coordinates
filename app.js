// Express 4.x Modules
var errorHandler      = require('errorhandler');            // https://github.com/expressjs/errorhandler
var morgan = require('morgan');

// Additional Modules
var fs  = require('fs');                      // http://nodejs.org/docs/v0.10.25/api/fs.htm
var path = require('path');                    // http://nodejs.org/docs/v0.10.25/api/path.html
var config = require('./config/config');         // Get configuration file
var express = require('express');

var port = config.port;
var app    = express();

app.use(morgan('dev'));

fs.readdir('./controller',function(err,files){
	if (err) {
        throw err;
    }
    files.forEach(function(file){
    	if (file.substr(-3) === '.js') {
		    var route = require('./controller/' + file);
		    route.controller(app);
	  	}
    });
 });

app.listen(port);