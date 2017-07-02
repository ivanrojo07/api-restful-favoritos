'use strict'

var Favorito = require('../models/favorito');

function prueba (req, res){
	if (req.params.nombre) {
		var nombre = req.params.nombre;
	}else{
		var nombre = "mundo";
	}
	
	res.status(200).send({
		data:[2,3,4],
		message: "hola "+nombre+" con Nodejs y express. callback"});
}

function getFavorito(req, res){
	var favoritoId = req.params.id;
	Favorito.findById(favoritoId, function(err, favorito){
		if (err) {
			res.status(500).send({message: "Error al devolver el favorito"});
		}
		else if (!favorito) {
		res.status(400).send({message: "No se encontro el favorito"});
		}
		else{
			res.status(200).send({favorito});
		}
	});

}

function getFavoritos(req, res){
	Favorito.find({}).sort('-_id').exec((err, favoritos)=>{
		if(err) {
			res.status(500).send({message: "Error al devolver los marcadores."});

		}
		else if(!favoritos){
			res.status(400).send({message: "No hay marcadores"});

		}
		else{
			res.status(200).send({favoritos});
		}

	});
}

function saveFavorito(req, res){
	var favorito = new Favorito();
	
	var params = req.body;

	favorito.title = params.title;
	favorito.description = params.description;
	favorito.url = params.url;

	favorito.save(function(err, favoritoStored){
		if (err) {
			res.status(500).send({message: "Error al guardar el marcador"});

		}
		else{
			res.status(200).send({favorito: favoritoStored});
		}
	});

}

function updateFavorito(req, res){
	var favoritoId = req.params.id;
	var update = req.body;
	Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdated)=>{
		if (err) {
			res.status(500).send({message: 'No se pudo actualizar el favorito'});
		}
		else {
			res.status(200).send({update: true, favoritoUpdated});
		}
	});
}

function deleteFavorito(req, res){
	var favoritoId = req.params.id;
	//buscamos el favorito a eliminar
	Favorito.findById(favoritoId, (err, favorito)=>{
		if (err) {
			res.status(500).send({message: "No se puede eliminar el favorito"});
		}
		else if (!favorito) {
			res.status(400).send({message: "No se puede encontrar el favorito"});
		}
		else{
			favorito.remove(err=>{
				if (err) {
					res.status(500).send({message: "Error al eliminar el fav"});
				}
				else{
					res.status(200).send({delete: true, favorito});
				}
			});
		}
	});
	// res.status(200).send({delete: true, data: favoritoId});
}

module.exports = {
	prueba,
	getFavorito,
	getFavoritos,
	saveFavorito,
	updateFavorito,
	deleteFavorito,
}