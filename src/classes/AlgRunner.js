import rotations from '../util/rotations'
const allRotations = Object.keys(rotations)
import Alg from './Alg'

export default class AlgRunner {

	constructor() {

	}

	// runIfApplicable(, remainingMoves, currentCandidate, candidateExecutions=[], maxAllowedCandidates=10, hands) {

	// }

	// returns an array of algs with their scores
	run(remainingMoves, currentCandidate, candidateExecutions=[], maxAllowedCandidates=10, hands=new Hands(/*TODO customize turnign preference*/)) {
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
		
		// TODO: something isn't right here. The first move of an alg will never be transformed.
		// do first move with hands, and get score for the move
		// add score to current candidate's score
		const moveScore = hands.turn(remainingMoves[0])
		currentCandidate.moves.push(remainingMoves[0])
		currentCandidate.score += moveScore

		// search depth control
		if (currentCandidate.score > candidateExecutions[candidateExecutions.length - 1].score) {
			return
		}
		// run starting with next move as is
		// TODO: make better deep copy of current candidate
		run([...remainingMoves.slice(1)], [...currentCandidate], candidateExecutions, maxAllowedCandidates, hands)

		// run with wide turn as next move (if possible)
		const remainingMovesWideTurn = Alg.applyWideTurn(remainingMoves.slice(1))
		if (remainingMovesWideTurn[0] !== remainingMoves[1]) {
			run([...remainingMoves.slice(1)], [...currentCandidate], candidateExecutions, maxAllowedCandidates, hands)
		}

		// run with slice as next move (if possible)
		run([...remainingMoves.slice(1)], [...currentCandidate], candidateExecutions, maxAllowedCandidates, hands)
		
		// run with rotations as next move (I can see this getting out of hand. TODO: Rotations together should be treated as one move to be done by hands)
		allRotations.forEach(rotation => run([...remainingMoves.slice(1)], [...currentCandidate], candidateExecutions, maxAllowedCandidates, hands)

	}
}

// R U R' U'
