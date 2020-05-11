var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/pay', function(req, res, next) {
	const request = require('request');

	const authorizationUrl = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize?grant_type=client_credentials&client_id=' +
			process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET;

	console.log(authorizationUrl);

	const authOptions = {
		url: authorizationUrl,
		method: 'GET',
		json: true
	};

	request.get(authOptions, function (error, response, body) {
		if (response.statusCode == 200) {

			const headers = {
				'Authorization': 'Bearer ' + body.access_token,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
				'Access-Control-Allow-Visible-Redirect': '*'
			};

			const options = {
				url: "https://secure.snd.payu.com/api/v2_1/orders",
				headers: headers,
				method: "POST",
				body: req.body,
				json: true
			};
			request.post(
					options,
					function(error, response, body){
						if (error) {
							res.send({error: "something went wrong"});
						}
						res.send(body);
					}
			);
		} else {
			res.send({error: "something went wrong"});
		}
	});
});

module.exports = router;
