const router = require('express').Router()
const containerAPI = require('./../models/containerAPI')
const beerAPI = require('./../models/beerTypeAPI')
const defaultValuesAPI = require('./../models/defaultValuesAPI')

function loadFromDB(callback) {
	containerAPI.getAllContainers((err, containers) => {
		if(err) {
			callback('could not load containers')
		} else {
			defaultValuesAPI.getAllDefaultValuesCollections((err2, defaultValues) => {
				if(err2) {
					callback('could not load default values')
				} else {
					beerAPI.getAllBeers((err3, beers) => {
						if(err3) {
							callback('could not load beers')
						} else {
							const data = {
								containers, defaultValues, beers
							}
							callback(undefined, data)
						}
					})
				}
			})
		}
	})
}

// Getting all the calculation stats from the database
router.get('/stats', (req, res) => {
	loadFromDB((err, data) => {
		if(err) {
			res.json({ err })
		} else {
			// Create container object
			const containerObject = {}

			data.containers.forEach((container) => {
				if(!containerObject[container.type]) {
					containerObject[container.type] = []
				}
				containerObject[container.type].push(container)
			})
			containerObject.fermentingTime = data.defaultValues.fermentingTime
			containerObject.threshold = data.defaultValues.threshold

			res.json({
				containers: containerObject,
				ingredientCost: data.defaultValues.ingredientCost,
				sellingPrice: {
					keg: data.defaultValues.sellingPrice.kegSell,
					tap: data.defaultValues.sellingPrice.tapSell,
					bottle: data.defaultValues.sellingPrice.bottleSell
				},
				productionCost: {
					keg: data.defaultValues.productionCost.kegCost,
					bottle: data.defaultValues.productionCost.bottleCost,
					tap: data.defaultValues.productionCost.tapCost
				},
				distribution: {
					tap: data.defaultValues.defaultDistribution.tapDist,
					bottle: data.defaultValues.defaultDistribution.bottleDist,
					keg: data.defaultValues.defaultDistribution.kegDist
				},
				volume: {
					total: data.defaultValues.startValueForProduction
				},
				beerType: {
					options: data.beers
				}
			})
		}
	})
})

module.exports = router
