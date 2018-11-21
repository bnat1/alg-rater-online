import Alg from '../../classes/Alg'
import { assert } from 'chai'
describe('alg class', () => {
	it('correctly constructs a basic alg', () => {
		const testAlg = new Alg("R U R' U R U2 R'")
		assert.deepEqual(testAlg.movesArr, ["R", "U", "R'", "U", "R", "U2", "R'"])
		assert.equal(testAlg.movesStr, "R U R' U R U2 R'")
		assert.equal(testAlg.qtm, 8)
		assert.equal(testAlg.htm, 7)
		assert.equal(testAlg.atm, 7)
		assert.equal(testAlg.qstm, 8)
		assert.equal(testAlg.etm, 8)
	})

	it('correctly constructs an alg with rotations, slices, wide turns, and half turns', () => {
		const testAlg = new Alg("y R u2' M' x2 z' M2 f E' L2")
		// TODO: find way to allow for prime double turns, or find a new library, or make a new one
		// assert.deepEqual(testAlg.movesArr, ["y", "R", "u2'", "M'", "x2", "z'", "M2", "f", "E'", "L2"])
		// assert.equal(testAlg.movesStr, "y R u2' M' x2 z' M2 f E' L2")
		assert.equal(testAlg.qtm, 14)
		assert.equal(testAlg.htm, 10)
		assert.equal(testAlg.atm, 7)
		assert.equal(testAlg.qstm, 10)
		assert.equal(testAlg.etm, 13)
	})

	it('rotates a sequence MU moves correctly', () => {
		const testAlgWithWideTurn = new Alg("R' U R' d' R' F' R2 U' R' U R' F R F")
		assert.deepEqual(Alg.rotateMoves("x", testAlgWithWideTurn.movesArr), ["R'", "B", "R'", "f'", "R'", "U'", "R2", "B'", "R'", "B", "R'", "U", "R", "U"])
		const uPermWithSlices = new Alg("M2 U M U2 M' U M2")
		assert.deepEqual(Alg.rotateMoves("z'", uPermWithSlices.movesArr), ["E2", "L", "E", "L2", "E'", "L", "E2"])
		assert.deepEqual(Alg.rotateMoves("z2", uPermWithSlices.movesArr), ["M2", "D", "M'", "D2", "M", "D", "M2"])
		assert.deepEqual(Alg.rotateMoves("z", uPermWithSlices.movesArr), ["E2", "R", "E'", "R2", "E", "R", "E2"])
		assert.deepEqual(Alg.rotateMoves("x", uPermWithSlices.movesArr), ["M2", "B", "M", "B2", "M'", "B", "M2"])
		assert.deepEqual(Alg.rotateMoves("x'", uPermWithSlices.movesArr), ["M2", "F", "M", "F2", "M'", "F", "M2"])
		assert.deepEqual(Alg.rotateMoves("x2", uPermWithSlices.movesArr), ["M2", "D", "M", "D2", "M'", "D", "M2"])
		assert.deepEqual(Alg.rotateMoves("y", uPermWithSlices.movesArr), ["S2", "U", "S", "U2", "S'", "U", "S2"])
	})
})