const clarifai = require('clarifai');
const apiKey = require('./apiKey.js');

const clariApp = new Clarifai.App(apiKey);

const handleApiCall = (req, res) => {
	clariApp.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json(err))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0]))
		.catch(err => res.status(400).json("Error retrieving entries"))
}

module.exports = {handleImage, handleApiCall}