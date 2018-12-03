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

		// do first move and judge it
		// this is still wrong. the first turn will never be transformed. 
		const { score, nextMoves, singleExecutedMove } = hands.doTurn(remainingMoves)
		currentCandidate.moves = [...currentCandidate.moves, ...singleExecutedMove] 
		currentCandidate.score += score
		// TODO: run
		
		// search depth control
		if (currentCandidate.score > candidateExecutions[maxAllowedCandidates.length - 1].score) {
			return
		}

		// run with wide turn as next move
		const remainingMovesWideTurn = Alg.applyWideTurn(nextMoves)
		if (remainingMovesWideTurn[0] !== nextMoves[0]) {
			// TODO: this should be doTurn and then run
			run([...remainingMovesWideTurn], currentCandidate, candidateExecutions, maxAllowedCandidates, hands)
		}

		// run with slice as next move (if possible)
		const remainingMovesSlice = Alg.applySlice(nextMoves)
		if (remainingMovesSlice[0] !== nextMoves[0]) {
			// TODO: this should be doTurn and then run
			run([...remainingMovesSlice], currentCandidate, candidateExecutions, maxAllowedCandidates, hands)
		}

		// run with rotations as next move
		// todo: prevent infinite recursion
		allRotations.forEach(rotation => {
			const remainingMovesRotation = rotateMoves(rotation, nextMoves)
			// TODO: this should be doTurn and then run
			run([rotation, ...remainingMovesRotation], currentCandidate, candidateExecutions, maxAllowedCandidates, hands)
		})

		return candidateExecutions
	}
}