var express = require('express');
// var routes = require('./routes/index');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app=module.exports=express();

//All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

//development only
if('development' == app.get('env')){
app.use(express.errorHandler());
app.use(express.logger('dev'));
}

// app.get('/', routes.index);
// app.get('/users', user.list);

// app.get('/', function(req, res, next){
//  res.send('Here is my texr');
// });

// app.get('/api', function(req, res, next	){
// res.send({name: 'Madasamy'});
// });

// app.get('/', function(req, res, next){
// 	res.render('index', {title: 'My App'});
// });

require('./routes');

http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port', app.get('port'));
});