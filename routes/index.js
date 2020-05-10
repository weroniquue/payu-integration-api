var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/pay', function(req, res, next) {
	const headers = {
		'Authorization': 'Bearer bbb36901-63a9-44e5-a42f-3aef9a53dd60',
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

	require('request').post(
			options,
			function(error, response, body){
				res.setHeader('Access-Control-Allow-Origin', '*');
				if (error) {
					res.send({error: "something went wrong"});
				}
				res.send(body);
			}
	);
});

module.exports = router;
