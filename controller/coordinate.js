var _ = require('lodash');
var bodyParser = require('body-parser');
var coordinateResponse = require('../models/coordinates_response');
var config = require('../config/config');
var fs  = require('fs'); 
var errorHandler = require('errorhandler');

module.exports.controller = function (app) {

	app.use(bodyParser.json());

	// GET, for obtain coordinates
	app.get('/coordinate/get/', function(req, res) {
		res.send({ success: true, "response": "success" });
	});

	// GET, for obtain specific coordinates
	app.get('/coordinate/get/:id', function(req, res) {
		var id = req.params.id;
		var fileName_live=config.file_live+id+config.format_txt;
		var response=fs.readFileSync(fileName_live).toString();
		var array=response.split(",");
		coordinateResponse.codeResponse=config.code_response_get_success;
		coordinateResponse.latitude=array[0].trim();
		coordinateResponse.longitude=array[1].trim();
		coordinateResponse.title=array[2].trim();
		coordinateResponse.status=array[3].trim();
		coordinateResponse.messagesResponse="Se obtuvo correctamente las Coordenadas";
		res.send({ success: true, detail:coordinateResponse });
	});

	// POST, for obtain coordinates
	app.post('/coordinate/register/', function(req, res) {
		var coordinaterequest = req.body;
		if (!coordinaterequest || !coordinaterequest.idValueCar) {
			res.send({ success: false, reason: 'not exist id car' });
    		return;
		}
		//-- Prepare Data
		var data_save=coordinaterequest.longitude+", "+coordinaterequest.latitude+", "+
			coordinaterequest.completeName+", "+coordinaterequest.status+" \n";
		//-- Set Name File Live
		var fileName_live=config.file_live+coordinaterequest.idValueCar+config.format_txt;
		//-- Set Name File History
		var fileName_history=config.file_history+coordinaterequest.idValueCar+config.date_now+config.format_txt;

		//-- Update File Class
		fs.writeFile(fileName_live,data_save,function(err,data) {
			if (err) {
				coordinateResponse.codeResponse=config.code_response_error;
				coordinateResponse.messagesResponse="Se produjo un error al momento de insertar el archivo";
				res.send({ success: false, detail: coordinateResponse});
				return;
			}
		});
		//-- Update History File Class
		fs.appendFile(fileName_history,data_save,function (err,data) {
			if (err) {
				coordinateResponse.codeResponse=config.code_response_error;
				coordinateResponse.messagesResponse="Se produjo un error al momento de insertar el archivo";
				res.send({ success: false, detail: coordinateResponse});
				return;
			}
		});
		coordinateResponse.codeResponse=config.code_response_register_success;
		coordinateResponse.messagesResponse="Se Registro Correctamente la Coordenada";
		res.send({ success: true, detail: coordinateResponse })
	});
};