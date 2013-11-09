var express = require('express');
var jsdom = require('jsdom');
//var url = require('url');
var request = require('request');
var app = express();
app.get('/', function(req, res){
	var url = req.param('url');
	//res.write(url);

	request(url, function(err, response, body){
		if (!err && response.statusCode == 200) {
    		jsdom.env(body, ['http://code.jquery.com/jquery-1.6.min.js'], function(err, window){
    			var $ = window.jQuery;
    			console.log($('title').text());
    			res.end(JSON.stringify({title: $('title').text()}))
    		})
  		}
  		else {
  			res.end(null);
  		}
		
	})
});
app.listen(process.env.PORT || 8080);

