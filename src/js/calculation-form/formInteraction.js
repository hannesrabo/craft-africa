// Calculate new position of distribution
function getNewDistribution(calculationStats) {
	let volumeLeft = 1.0

	let active = -1
	let inactive = -1
	let locked = -1

	// Create a copy and remove the current slider
	// const tempData = Object.assign({}, stats.containerDistribution)
	const tempData = []
	const tempNames = []
	Object.keys(calculationStats.containerDistribution).forEach((el, index) => {
		tempData.push(calculationStats.containerDistribution[el])
		tempNames.push(el)

		// Extracting key status
		if(el === calculationStats.distributionLock[0]) {
			locked = index
		} else if(el === calculationStats.distributionLock[1]) {
			inactive = index
		} else {
			active = index
		}
	})

	volumeLeft -= tempData[locked]

	// Try to remove everything from the slider moved least resently

	// Calculate the updated value
	volumeLeft -= tempData[inactive]
	tempData[active] = volumeLeft

	if(tempData[active] > 1) {
		console.log('Something went wrong. Larger than 1')
	} else if(tempData[active] < 0) {
		tempData[inactive] += tempData[active]
		tempData[active] = 0
	}

	// Create the return data
	const data = {}
	tempNames.forEach((element, index) => {
		data[element] = tempData[index]
	})

	return data
}

function extractFormData() {
	// Extract form data and insert it into a object
	const formdata = new FormData(document.querySelector('form.calculation-form'))
	const entries = formdata.entries()
	const dataObject = { containerDistribution: {} }

	/* eslint-disable no-restricted-syntax */
	for(const entry of entries) {
		switch (entry[0]) {
		case 'keg':
			dataObject.containerDistribution[entry[0]] = parseFloat(entry[1])
			break
		case 'bottle':
			dataObject.containerDistribution[entry[0]] = parseFloat(entry[1])
			break
		case 'tap':
			dataObject.containerDistribution[entry[0]] = parseFloat(entry[1])
			break

		default:
			if(entry[1] % 1 === 0) {
				dataObject[entry[0]] = parseInt(entry[1], 10)
			} else {
				dataObject[entry[0]] = parseFloat(entry[1])
			}
			break
		}
	}
	/* eslint-enable no-restricted-syntax */

	return dataObject
}

function loadFormInputs(calculationStats) {
	const stats = calculationStats

	// Loading values from form
	document.querySelectorAll('.calculation-form .container-distribution')
	.forEach((el) => {
		stats.containerDistribution[el.name] = parseFloat(el.value)
	})
}

function saveFormInputs(calculationStats) {
	// Assigning values to form
	document.querySelectorAll('.calculation-form .container-distribution')
	.forEach((el) => {
		/* eslint-disable no-param-reassign */
		el.value = calculationStats.containerDistribution[el.name]
		/* eslint-enable no-param-reassign */
	})
}

function updateDistributionSliders(calculationStats, event) {
	const stats = calculationStats

	loadFormInputs(stats)

	// Change tracking status
	if(event) {
		if(event.name !== stats.distributionLock[0]) {
			stats.distributionLock[1] = stats.distributionLock[0]
		}
		// Add current
		stats.distributionLock[0] = event.name
	} else {
		stats.distributionLock = ['tap', 'bottle']
	}

	// Calculate
	stats.containerDistribution =
			getNewDistribution(stats)

	saveFormInputs(stats)
}


module.exports = {
	getNewDistribution,
	updateDistributionSliders,
	extractFormData
}
