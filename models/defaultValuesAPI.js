const mongoose = require('mongoose')
const validator = require('validator')

const defaultValuesSchema = mongoose.Schema({
	ingredientCost: {
		type: String,
		required: true
	},
	defaultDistribution: {
		type: String,
		required: true
	},
	defaultThreshold: {
		type: String
	},
	defaultCost: {
		type: String,
		required: true
	},
	startValueForProduction: {
		type: Number,
		required: true
	}
})

function isEmpty(values) {
	let empty = false
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(!Number.isInteger(temp[key])) {
				if(validator.isEmpty(temp[key])) {
					empty = true
				}
			}
		})
	} else {
		empty = true
	}
	return empty
}

function isNumbers(values) {
	let areIntegers = true
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(!Number.isInteger(temp[key])) {
				if(validator.isInt(temp[key])) {
					temp[key] = parseInt(temp[key], 10)
				} else {
					areIntegers = false
				}
			}
		})
	}
	return areIntegers
}

function isInputCorrect(updatedProperties) {
	// ingredientCost
	const ic = JSON.parse(updatedProperties.ingredientCost)

	// defaultDistribution
	const dd = JSON.parse(updatedProperties.defaultDistribution)

	// defaultThreshold
	const dt = JSON.parse(updatedProperties.defaultThreshold)

	// defaultCost
	const dc = JSON.parse(updatedProperties.defaultCost)

	// startValueForProduction
	const svfp = updatedProperties.startValueForProduction

	let validated = false
	if(!isEmpty(ic) && isNumbers(ic) &&
		!isEmpty(dd) && isNumbers(dd) &&
		!isEmpty(dt) && isNumbers(dt) &&
		!isEmpty(dc) && isNumbers(dc) &&
		!isEmpty({ svfp }) && isNumbers({ svfp })
		) {
		validated = true
	}
	return validated
}


const DefaultValuesCollection = mongoose.model('defaultValuesCollection', defaultValuesSchema)
module.exports = DefaultValuesCollection

module.exports.createDefaultValuesCollection = (newDefaultValuesCollection, callback) => {
	const beerObject = new DefaultValuesCollection(newDefaultValuesCollection)
	// console.log(newBeerCollection.ingredientCost)
	beerObject.save(callback)
}

module.exports.updateDefaultValuesCollection = (updatedProperties, callback) => {
	if(isInputCorrect(updatedProperties)) {
		console.log('validated')
		DefaultValuesCollection.update({}, { $set: updatedProperties }, { upsert: true }, callback)
	} else {
		// TODO
		// Send message to page somehow
		//
		//
		//
		callback()
	}
}

module.exports.getIngredientsCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}
module.exports.getDistributionCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}
module.exports.getCostCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}
module.exports.getStartValueForProductionCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}


module.exports.getAllDefaultValuesCollections = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, (err, values) => {
		if(!values) {
			callback(err, {})
		} else {
			const updatedValues = {
				ingredientCost: JSON.parse(values.ingredientCost),
				defaultDistribution: JSON.parse(values.defaultDistribution),
				defaultThreshold: JSON.parse(values.defaultThreshold),
				defaultCost: JSON.parse(values.defaultCost),
				startValueForProduction: values.startValueForProduction
			}
			// console.log(updatedValues)
			callback(err, updatedValues)
		}
	})
}
