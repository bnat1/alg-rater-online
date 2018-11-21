import normalize from 'cube-notation-normalizer'
import rotations from '../util/rotations'
import wideTurns from '../util/wideTurns'
const validRotations = new Set(['x', 'y', 'z'])
const validSliceMoves = new Set(['M', 'E', 'S'])
const validWideTurns = new Set(['u', 'r', 'd', 'l', 'f', 'b'])
const validFaceTurns = new Set(['U', 'R', 'D', 'L', 'F', 'B'])
/*
 *Estoy reescribiendo mi programa de determinar si algoritmos son buenos para las manos. Va a ser mi primer sitio web público, y voy a hacerlo con react y semantic-ui-react. 
 */

export default class Alg {
	constructor(algStr) {
		this.originalInput = algStr
		this.movesStr = normalize(algStr)
		this.movesArr = this.constructor.strToArr(this.movesStr)
		this.htm = this.constructor.calcHtm(this.movesArr)
		this.qtm = this.constructor.calcQtm(this.movesArr)
		this.atm = this.constructor.calcAtm(this.movesArr)
		this.qstm = this.constructor.calcQstm(this.movesArr)
		this.etm = this.constructor.calcEtm(this.movesArr)
	}

	
	static rotateMove(rotation, move) {
		const uppercaseMove = move.toUpperCase()
		let translated
		if (rotations[rotation][uppercaseMove]) {
			translated = rotations[rotation][uppercaseMove]
		} else {
			translated = rotations[rotation][uppercaseMove[0]] + uppercaseMove.slice(1)
		}
		// check if translated move should be lowercase
		if (move !== uppercaseMove) {
			return translated.toLowerCase()
		}
		return translated
	}

	// Apply Rotation to given sequence of moves
	// This may make better sense in the rater class, but it's here for now.
	static rotateMoves(rotation, movesArr) {
		return movesArr.map(move => this.rotateMove(rotation, move))
	}

	// This one definitely should be in the cube manipulator
	// return the array of moves, transformed by turning the first turn into a wide turn (or undoing a wide turn)
	static applyWideTurn(movesArr) {
		if (this.isFaceTurn(move) || this.isWideTurn(move)) {
			const { equivalentMove: firstTransformedMove, rotation } = wideTurns[movesArr[0]]
			return [firstTransformedMove, ...rotateMoves(rotation, movesArr.slice(1))]
		}
		return movesArr
	}

	static invertMove(move) {
		if (move[move.length - 1] === "'") {
			return move.slice(0, move.length - 1)
		}
		return `${move}'`
	}

	static strToArr(movesStr) {
		return movesStr.split(' ')
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
}