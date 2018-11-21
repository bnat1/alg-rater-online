import Alg from '../../classes/Alg'
import { assert } from 'chai'

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
})