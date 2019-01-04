let moveExecutions = require('./MoveExecutions')
let { set } = require('lodash')

let changed = {}
Object.keys(moveExecutions).forEach(hand => {
	// console.log("\t",hand)
	Object.keys(moveExecutions[hand]).forEach(move => {
		// console.log(move)
		let executions = []
		Object.keys(moveExecutions[hand][move]).forEach(position => {
			let execution = {...moveExecutions[hand][move][position], position, hand: hand === 'rh' ? 'right' : 'left' }
			executions.push(execution)
		})
		set(changed, [move], executions)
	})
})	

console.log(JSON.stringify(changed, null, '\t'))