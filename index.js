'use strict'

var mongoose = require('mongoose');

var app = require('./app');

var port = process.env.PORT || 3678;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cursofavoritos',(err, res)=>{
	if (err) {
		throw err;
	}else{
		console.log('conexion a base de datos exitosa');
		app.listen(port, function(){
		console.log(`API REST FAVORITOS funcionando en http://localhost:${port}`);
		});
	}
	
});


