import Alg from '../../classes/Alg'
import { assert } from 'chai'

it('correctly constructs an alg', () => {
	const testAlg = new Alg("R U R' U R U2 R'")
	assert.deepEqual(testAlg.movesArr, ["R", "U", "R'", "U", "R", "U2", "R'"])
	assert.equal(testAlg.movesStr, "R U R' U R U2 R'")
	assert.equal(testAlg.qtmLength, 8)
	assert.equal(testAlg.htmLength, 7)
})