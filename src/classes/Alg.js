import normalize from 'cube-notation-normalizer'
import rotations from '../util/rotations'
import wideTurns from '../util/wideTurns'
import slices from '../util/slices'

const validRotations = new Set(['x', 'y', 'z'])
const validSliceMoves = new Set(['M', 'E', 'S'])
const validWideTurns = new Set(['u', 'r', 'd', 'l', 'f', 'b'])
const validFaceTurns = new Set(['U', 'R', 'D', 'L', 'F', 'B'])
const allRotations = [[], ["x"], ["x'"], ["y"], ["y'"], ["z"], ["z'"], ["x2"], ["y2"], ["z2"], ["y","x"],
	["y", "x'"], ["y", "x2"], ["y", "z"], ["y", "z'"], ["y'", "x"], [ "y'", "x'"], ["y'", "x2"], 
	["y'", "z"], ["y'", "z'"], ["y2", "x"], ["y2", "x'"], ["y2", "z"], ["y2", "z'"]]


export default class Alg {
	constructor(algStr) {
		this.originalInput = algStr
		this.movesStr = normalize(algStr)
		this.movesArr = this.movesStr.split(" ")
		this.htm = this.constructor.calcHtm(this.movesArr)
		this.qtm = this.constructor.calcQtm(this.movesArr)
		this.atm = this.constructor.calcAtm(this.movesArr)
		this.qstm = this.constructor.calcQstm(this.movesArr)
		this.etm = this.constructor.calcEtm(this.movesArr)
	}

	// Apply Rotation to a sequence of moves
	static rotateMoves(rotation, movesArr) {
		if (!rotation) {
			return movesArr
		}
		const rotated = movesArr.map(move => {
			const uppercaseMove = move.toUpperCase()
			const translated = rotations[rotation][uppercaseMove] 
				? rotations[rotation][uppercaseMove] 
				: rotations[rotation][uppercaseMove[0]] + uppercaseMove.slice(1)

			// check if translated move should be lowercase
			if (move !== uppercaseMove) {
				return translated.toLowerCase()
			}
			return translated
		})
		// TODO: add rotation to end
		return rotated
	}

	// get rid of existing initial rotation(s)
	static normalizeAngle(movesArr) {
		if (!this.isRotation(movesArr[0])) {
			return movesArr
		}
		return this.normalizeAngle(this.rotateMoves(this.invertMove(movesArr[0]), movesArr.slice(1)))
	}

	// Apply all possible rotations to a sequence of moves
	// TODO: Consider returning one moves array to reduce operations
	static getAllRotations(movesArr) {
		const normalizedMoves = this.normalizeAngle(movesArr)
		if (!normalizedMoves.length) {
			return [{ rotation: [], transformedMoves: [] }]
		}

		return allRotations.map(rotation => ({
			rotation,
			transformedMoves: rotation.reduce((acc, currentRotation) => this.rotateMoves(currentRotation, acc), normalizedMoves)
		}))
	}

	// TODO: Should this only apply wide turns when a move follows a rotation?
	// return the array of moves, transformed by turning the first turn into a wide turn (or undoing a wide turn)
	static applyWideTurn(movesArr) {
		// TODO: guard against empty moves
		if (this.isFaceTurn(movesArr[0]) || this.isWideTurn(movesArr[0])) {
			const { equivalentMove: firstTransformedMove, rotation } = wideTurns[movesArr[0]]
			return [firstTransformedMove, ...this.rotateMoves(rotation, movesArr.slice(1))]
		}
		return movesArr
	}

	// turns first two moves into slice (if possible), and transform the rest of the moves
	// if first move is a slice, this function expands the slice moves
	static applySlice(movesArr, rotationOptions) {
		// TODO: guard against empty move
		if (this.isSlice(movesArr[0])) {
			// Turn slice into two separate moves
			const { moves: firstTwoMoves, rotation } = slices[movesArr[0]]
			return [...firstTwoMoves, ...this.rotateMoves(rotation, movesArr.slice(1))]
		}

		if (movesArr.length < 2) {
			return movesArr
		}

		const firstTwoMovesStr = movesArr.slice(0, 2).sort().join(", ")
		let { moves: sliceMove, rotation } = slices[firstTwoMovesStr]
		if (sliceMove) {
			// Turn two separate moves into slice
			return [...sliceMove, ...this.rotateMoves(rotation, movesArr.slice(2))]
		} 	
		return movesArr
	}

	// for now this doesn't invert double moves. 
	static invertMove(move) {
		if (move[1] === "2") {
			return move
		} else if (move[1] === "'") {
			return move.slice(0, 1)
		}
		return `${move}'`
	}

	static calcHtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			if (this.isWideTurn(currentMove) || this.isFaceTurn(currentMove)) {
				return acc + 1
			} else if (this.isSlice(currentMove)) {
				return acc + 2
			}
			return acc
		}, 0)
	}

	static calcAtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => !this.isRotation(currentMove) ? acc + 1 : acc, 0)
	}

	static calcQuarterMoves(move) {
		return (move.length === 1 || move[1] === "'") ? 1 : 2
	}

	static calcQtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			if (this.isWideTurn(currentMove) || this.isFaceTurn(currentMove)) {
				return acc + this.calcQuarterMoves(currentMove)
			} else if (this.isSlice(currentMove)) {
				return acc + (2 * this.calcQuarterMoves(currentMove))
			}
			return acc
		}, 0)
	}

	static calcQstm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			if (this.isWideTurn(currentMove) || this.isFaceTurn(currentMove) || this.isSlice(currentMove)) {
				return acc + this.calcQuarterMoves(currentMove)
			}
			return acc
		}, 0)
	}

	static calcEtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			// R2/L2/r2/l2 is 1 etm, everything else is 2
			const upperMove = currentMove.toUpperCase()
			if (upperMove[0] === "R" || upperMove[0] === "L") {
				return acc + 1
			}
			return acc + this.calcQuarterMoves(currentMove)
		}, 0)
	}

	static isRotation(move) {
		return validRotations.has(move[0])
	}

	static isSlice(move) {
		return validSliceMoves.has(move[0])
	}

	static isWideTurn(move) {
		return validWideTurns.has(move[0])
	}

	static isFaceTurn(move) {
		return validFaceTurns.has(move[0])
	}

	static isDoubleTurn(move) {
		return move.includes('2')
	}
}