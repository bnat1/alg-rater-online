import rotations from '../util/rotations'
const allRotations = Object.keys(rotations)
import Alg from './Alg'
import Hands from './Hands'

export default class AlgRunner {

	constructor() {

	}

	// returns an array of algs with their scores
	run(remainingMoves, currentCandidate, candidateExecutions=[], maxAllowedCandidates=10, hands=new Hands()) {
		// insert execution into candidates if there are no more turns to do
		if (!remainingMoves.length) {
			if (!candidateExecutions.length) {
				candidateExecutions.push(currentCandidate)
				return
			}

			const index = candidateExecutions.findIndex(candidate => currentCandidate.score < candidate.score)
			candidateExecutions.splice(index, 0, currentCandidate)
			if (candidateExecutions.length > maxAllowedCandidates) {
				candidateExecutions.pop()
			}
			return
		}

		// get rotations
		// get executions for first move
		// depth control
		// run remaining moves

		if (/*move is slice or could be slice*/) {
			// transform to slice
			// get rotations
			// get executions for first moves
			// depth control
			// run remaining moves
		
		} else if (Alg.isWideTurn(remainingMoves[0]) || Alg.isFaceTurn(remainingMoves[0])) {
			// transform to wide turn
			// get rotations
			// get executions for first moves
			// depth control
			// run remaining moves
		
		}

		return candidateExecutions
	}
}