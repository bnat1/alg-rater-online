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
		this.movesArr = this.strToArr(this.movesStr)
		this.htm = this.calcHtm(this.movesArr)
		this.qtm = this.calcQtm(this.movesArr)
		this.atm = this.calcAtm(this.movesArr)
		this.qstm = this.calcQstm(this.movesArr)
		this.etm = this.calcEtm(this.movesArr)
	}

	
	rotateMove(rotation, move) {
		const uppercaseMove = move.toUpperCase()
		const translated = rotations[rotation][uppercaseMove]
		// check if translated move should be lowercase
		if (move !== uppercaseMove) {
			return translated.toLowerCase()
		}
		return translated
	}

	// Apply Rotation to given sequence of moves
	// This may make better sense in the rater class, but it's here for now.
	rotateMoves(rotation, movesArr) {
		return movesArr.map(move => this.rotateMove(rotation, move))
	}

	// This one definitely should be in the cube manipulator
	// return the array of moves, transformed by turning the first turn into a wide turn (or undoing a wide turn)
	applyWideTurn(movesArr) {
		if (this.isFaceTurn(move) || this.isWideTurn(move)) {
			const { equivalentMove: firstTransformedMove, rotation } = wideTurns[movesArr[0]]
			return [firstTransformedMove, ...rotateMoves(rotation, movesArr.slice(1))]
		}
		return movesArr
	}

	invertMove(move) {
		if (move[move.length - 1] === "'") {
			return move.slice(0, move.length - 1)
		}
		return `${move}'`
	}

	strToArr(movesStr) {
		return movesStr.split(' ')
	}


	calcHtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			if (this.isWideTurn(currentMove) || this.isFaceTurn(currentMove)) {
				return acc + 1
			}
			return acc
		}, 0)
	}

	calcAtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => !this.isRotation(currentMove) ? acc + 1 : acc, 0)
	}

	calcQuarterMoves(move) {
		return (move.length === 1 || move[1] === "'") ? 1 : 2
	}

	calcQtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			if (this.isWideTurn(currentMove) || this.isFaceTurn(currentMove)) {
				return acc + this.calcQuarterMoves(currentMove)
			}
			return acc
		}, 0)
	}

	calcQstm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			if (this.isWideTurn(currentMove) || this.isFaceTurn(currentMove) || this.isSlice(currentMove)) {
				return acc + this.calcQuarterMoves(currentMove)
			}
			return acc
		}, 0)
	}

	calcEtm(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			// R2/L2/r2/l2 is 1 etm, everything else is 2
			const upperMove = currentMove.toUpperCase()
			if (upperMove[0] === "R" || upperMove[0] === "L") {
				return acc + 1
			}
			return acc + this.calcQuarterMoves(currentMove)
		}, 0)
	}

	isRotation(move) {
		return validRotations.has(move[0])
	}

	isSlice(move) {
		return validSliceMoves.has(move[0])
	}

	isWideTurn(move) {
		return validWideTurns.has(move[0])
	}

	isFaceTurn(move) {
		return validFaceTurns.has(move[0])
	}
}