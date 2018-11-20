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
		this.htmLength = this.calcHtmLength(this.movesArr)
		this.qtmLength = this.calcQtmLength(this.movesArr)
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

	strToArr(movesStr) {
		return movesStr.split(' ')
	}

	calcHtmLength(movesArr) {
		return movesArr.length
	}

	calcQtmLength(movesArr) {
		return movesArr.reduce((acc, currentMove) => {
			return acc + ((currentMove.length === 1 || currentMove[1] === "'") ? 1 : 2)
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