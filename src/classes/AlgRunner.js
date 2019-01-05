import rotations from '../util/rotations'
const allRotations = Object.keys(rotations)
import Alg from './Alg'
import MoveExecutions from '../util/MoveExecutions'
import config from '../config'

export default class AlgRunner {

	constructor() {

	}

	// TODO: construct with configuration, get rid of static classes
	static cloneCandidate(candidate) {
		return { execution: [...candidate.execution], score: candidate.score }
	}

	static washHands() {
		return { left: undefined, right: undefined }
	}

	static cloneHands(hands) {
		return { ...hands }
	}

	static getRegripDistance(originalPosition, newPosition) {
		return Math.abs(newPosition - originalPosition)
	}

	static rotateBeforeMove(moves, rotationPenalty=0, firstMoveIndex=0) {
		if (firstMoveIndex === moves.length) {
			// there is no first move
			firstMoveIndex = -1
			return { rotationPenalty, firstMoveIndex }
		} else if (!Alg.isRotation(moves[firstMoveIndex])) {
			return { rotationPenalty, firstMoveIndex }
		}
		rotationPenalty += Alg.isDoubleTurn(moves[firstMoveIndex]) 
			? 2 * config.penalties.rotation 
			: config.penalties.rotation
		firstMoveIndex++
		return this.rotateBeforeMove(moves, rotationPenalty, firstMoveIndex)
	}

	static doMove(execution, hands) {
		// standard move penalty for execution
		let newHands = this.cloneHands(hands)
		let movePenalty, regripPenalty = 0

		movePenalty = execution.penalty
		if (hands[execution.hand] !== execution.position) {
			// do regrip
			newHands[execution.hand] = execution.position
			// add regrip penalty to score
			if (hands[execution.hand] !== undefined) {
				regripPenalty = config.penalties.regrip * this.getRegripDistance(hands[execution.hand], execution.position)
			}
		}
		// change position during R / L move
		if (execution.newPosition !== undefined) {
			newHands[execution.hand] = execution.newPosition
		}

		return { 
			movePenalty,
			regripPenalty,
			newHands
		}
	}

	// create hands if needed, get all executions
	// moveExecutions object looks like: { changePosition, penalty, hand, position, follows, description }
	// returns { score, newHands, executedMoves, remainingMoves }
	// TODO: send previous move to this function
	static getSingleMoveExecutions(moves, hands, previousMove=undefined) {
		let score = 0
		let { rotationPenalty, firstMoveIndex } = this.rotateBeforeMove(moves)
		score += rotationPenalty

		// all of the moves are rotations
		// TODO: penalize score or not for final rotation here.
		// at the moment, it's always penalized.
		if (firstMoveIndex === -1) {
			return { score, newHands: this.washHands(), executedMoves: [...moves], remainingMoves: [] }
		}

		if (firstMoveIndex > 0) {
			// TODO: should both hands be undefined after rotation, or just one and the other zero?
			previousMove = undefined
			hands = this.washHands()
		}
		
		// wide turn penalty
		if (Alg.isWideTurn(moves[firstMoveIndex])) {
			score += config.penalties.wide
		}

		let upperMove = moves[firstMoveIndex].toUpperCase()
		return MoveExecutions[upperMove]
			// remove execution options that cannot be done
			.filter(execution => !execution.follows || previousMove && execution.follows.includes(previousMove.toUpperCase()))
			.map(execution => {
				// different total score for each execution.
				let rotationAndExecutionScore = score
				let { movePenalty, regripPenalty, newHands } = this.doMove(execution, hands, score, moves, firstMoveIndex)
				rotationAndExecutionScore += movePenalty
				rotationAndExecutionScore += regripPenalty
				return {
					score: rotationAndExecutionScore,
					newHands,
					executedMoves: moves.slice(0, firstMoveIndex + 1), 
					remainingMoves: moves.slice(firstMoveIndex + 1)
				}				
			})
	}

	static getCandidateAlgStr(candidate) {
		return candidate.execution.reduce((acc, step) => {
			acc.push(...step.moves)
			return acc
		}, []).join(' ')
	}

	// candidateVersions: { <id>: <score> }
	static addCandidate(currentCandidate, maxCandidates, candidates, candidateVersions={}) {

		// TODO Refactoring: can move Id be created during the algorithm to avoid a second pass over the alg?
		currentCandidate.movesId = this.getCandidateAlgStr(currentCandidate)
		let existingCandidateScore = candidateVersions[currentCandidate.movesId]
		// expect candidate to exist in both candidateVersions and candidates or neither of the two.

		if (existingCandidateScore !== undefined) {
			if (currentCandidate.score < existingCandidateScore) {
				// TODO Refactoring: can indicies be looked up in O(1) somehow without often re-assigning all of the stored indicies?
				// remove existing candidate from candidates array
				const existingIndex = candidates.findIndex(candidate => candidate.movesId === currentCandidate.movesId)
				candidates.splice(existingIndex, 1)
			} else {
				// if current candidate is worse than existing, no need to update it.
				return
			}
		}
		
		// Insert/update into dictionary.
		candidateVersions[currentCandidate.movesId] = currentCandidate.score
		
		// Insert into candidates.
		let insertionIndex = candidates.findIndex(candidate => candidate.score > currentCandidate.score)
		if (insertionIndex === -1) {
			insertionIndex = candidates.length
		}
		candidates.splice(insertionIndex, 0, currentCandidate)

		// remove worst candidate
		if (candidates.length > maxCandidates) {
			const { movesId: worstCandidateId } = candidates[candidates.length - 1]
			delete candidateVersions[worstCandidateId]
			candidates.pop()
		}
	}

	// candidate = {
	//	 execution: [...{ moves, remainingMoves, hands }],
	//   score	
	// }
	// returns an array of algs with their scores
	// TODO:
	//	special moves: small/slice turns
	//	first move shouldn't count as regrip
	//	optionally don't perform last rotation
	// 	optionally don't count first rotation or last rotation
	static run(moves, maxCandidates=10, currentCandidate={ execution: [], score: 0 }, candidates=[], candidateVersions={}) {
		// depth control: prune branches that are already worse than the max allowed candidate
		if (candidates.length === maxCandidates && currentCandidate.score > candidates[candidates.length - 1].score) {
			return
		}

		// base case: no more moves left to do
		if (!moves.length) {
			this.addCandidate(currentCandidate, maxCandidates, candidates, candidateVersions)
			return
		}

		// get rotations
		let allRotations = Alg.getAllRotations(moves)

		// TODO: make the input of these for loops include all angles for all transformations (wide turns, slices).
		// TODO: allow for choosing which rotations are allowed.
		// get executions for first move
		// angle: { rotation, transformedMoves }
		for (let rotation of allRotations) {
			let lastMove, hands
			if (currentCandidate.execution.length) {
				let lastExecution = currentCandidate.execution[currentCandidate.execution.length - 1]
				hands = lastExecution.hands
				lastMove = lastExecution.moves[lastExecution.moves.length - 1]
			} else {
				hands = this.washHands()
				lastMove = undefined
			}
			let executions = this.getSingleMoveExecutions([...rotation.rotation, ...rotation.transformedMoves], hands, lastMove) // execution: { score, newHands, executedMoves, remainingMoves }
			for (let execution of executions) {
				let newCandidate = this.cloneCandidate(currentCandidate)
				newCandidate.score += execution.score
				newCandidate.hands = execution.newHands
				newCandidate.execution.push({
					moves: execution.executedMoves, 
					hands: execution.newHands, 
					score: execution.score,
					remainingMoves: execution.remainingMoves
				})
				// recurse
				this.run(execution.remainingMoves, maxCandidates, newCandidate, candidates, candidateVersions)
			}
		}

		return candidates
	}
}