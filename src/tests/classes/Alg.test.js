import Alg from '../../classes/Alg'
import { assert } from 'chai'
describe('Alg constructor', () => {
	it('constructs a basic alg and measures metrics', () => {
		const testAlg = new Alg("R U R' U R U2 R'")
		assert.deepEqual(testAlg.movesArr, ["R", "U", "R'", "U", "R", "U2", "R'"])
		assert.equal(testAlg.movesStr, "R U R' U R U2 R'")
		assert.equal(testAlg.qtm, 8)
		assert.equal(testAlg.htm, 7)
		assert.equal(testAlg.atm, 7)
		assert.equal(testAlg.qstm, 8)
		assert.equal(testAlg.etm, 8)
	})

	it('constructs an alg with rotations, slices, wide turns, and half turns', () => {
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
})

describe('Rotation translations', () => {
	it('rotates M and U moves', () => {
		const testAlgMU = new Alg("M2 U M U2 M' U M2 U'")
		assert.deepEqual(Alg.rotateMoves("x", testAlgMU.movesArr), ["M2", "B", "M", "B2", "M'", "B", "M2", "B'"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgMU.movesArr), ["M2", "F", "M", "F2", "M'", "F", "M2", "F'"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgMU.movesArr), ["M2", "D", "M", "D2", "M'", "D", "M2", "D'"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgMU.movesArr), ["S2", "U", "S'", "U2", "S", "U", "S2", "U'"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgMU.movesArr), ["S2", "U", "S", "U2", "S'", "U", "S2", "U'"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgMU.movesArr), ["M2", "U", "M'", "U2", "M", "U", "M2", "U'"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgMU.movesArr), ["E2", "R", "E'", "R2", "E", "R", "E2", "R'"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgMU.movesArr), ["E2", "L", "E", "L2", "E'", "L", "E2", "L'"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgMU.movesArr), ["M2", "D", "M'", "D2", "M", "D", "M2", "D'"])
	})
	it ('rotates E and L moves', () => {
		const testAlgEL = new Alg("E2 L E L2 E' L E2 L'")
		assert.deepEqual(Alg.rotateMoves("x", testAlgEL.movesArr), ["S2", "L", "S", "L2", "S'", "L", "S2", "L'"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgEL.movesArr), ["S2", "L", "S'", "L2", "S", "L", "S2", "L'"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgEL.movesArr), ["E2", "L", "E'", "L2", "E", "L", "E2", "L'"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgEL.movesArr), ["E2", "B", "E", "B2", "E'", "B", "E2", "B'"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgEL.movesArr), ["E2", "F", "E", "F2", "E'", "F", "E2", "F'"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgEL.movesArr), ["E2", "R", "E", "R2", "E'", "R", "E2", "R'"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgEL.movesArr), ["M2", "U", "M", "U2", "M'", "U", "M2", "U'"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgEL.movesArr), ["M2", "D", "M'", "D2", "M", "D", "M2", "D'"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgEL.movesArr), ["E2", "R", "E'", "R2", "E", "R", "E2", "R'"])
	})
	it ('rotates S and D moves', () => {
		const testAlgSD = new Alg("S2 D S D2 S' D S2 D'")
		assert.deepEqual(Alg.rotateMoves("x", testAlgSD.movesArr), ["E2", "F", "E'", "F2", "E", "F", "E2", "F'"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgSD.movesArr), ["E2", "B", "E", "B2", "E'", "B", "E2", "B'"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgSD.movesArr), ["S2", "U", "S'", "U2", "S", "U", "S2", "U'"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgSD.movesArr), ["M2", "D", "M", "D2", "M'", "D", "M2", "D'"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgSD.movesArr), ["M2", "D", "M'", "D2", "M", "D", "M2", "D'"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgSD.movesArr), ["S2", "D", "S'", "D2", "S", "D", "S2", "D'"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgSD.movesArr), ["S2", "L", "S", "L2", "S'", "L", "S2", "L'"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgSD.movesArr), ["S2", "R", "S", "R2", "S'", "R", "S2", "R'"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgSD.movesArr), ["S2", "U", "S", "U2", "S'", "U", "S2", "U'"])
	})
	it ('rotates R and F moves', () => {
		const testAlgRF = new Alg("R2 F R F R' F' R' F' R' F R' F2")
		assert.deepEqual(Alg.rotateMoves("x", testAlgRF.movesArr), ["R2", "U", "R", "U", "R'", "U'", "R'", "U'", "R'", "U", "R'", "U2"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgRF.movesArr), ["R2", "D", "R", "D", "R'", "D'", "R'", "D'", "R'", "D", "R'", "D2"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgRF.movesArr), ["R2", "B", "R", "B", "R'", "B'", "R'", "B'", "R'", "B", "R'", "B2"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgRF.movesArr), ["F2", "L", "F", "L", "F'", "L'", "F'", "L'", "F'", "L", "F'", "L2"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgRF.movesArr), ["B2", "R", "B", "R", "B'", "R'", "B'", "R'", "B'", "R", "B'", "R2"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgRF.movesArr), ["L2", "B", "L", "B", "L'", "B'", "L'", "B'", "L'", "B", "L'", "B2"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgRF.movesArr), ["D2", "F", "D", "F", "D'", "F'", "D'", "F'", "D'", "F", "D'", "F2"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgRF.movesArr), ["U2", "F", "U", "F", "U'", "F'", "U'", "F'", "U'", "F", "U'", "F2"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgRF.movesArr), ["L2", "F", "L", "F", "L'", "F'", "L'", "F'", "L'", "F", "L'", "F2"])
	})
	it ('rotates r and B moves', () => {
		const testAlgrB = new Alg("r2 B r B r' B' r' B' r' B r' B2")
		assert.deepEqual(Alg.rotateMoves("x", testAlgrB.movesArr), ["r2", "D", "r", "D", "r'", "D'", "r'", "D'", "r'", "D", "r'", "D2"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgrB.movesArr), ["r2", "U", "r", "U", "r'", "U'", "r'", "U'", "r'", "U", "r'", "U2"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgrB.movesArr), ["r2", "F", "r", "F", "r'", "F'", "r'", "F'", "r'", "F", "r'", "F2"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgrB.movesArr), ["f2", "R", "f", "R", "f'", "R'", "f'", "R'", "f'", "R", "f'", "R2"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgrB.movesArr), ["b2", "L", "b", "L", "b'", "L'", "b'", "L'", "b'", "L", "b'", "L2"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgrB.movesArr), ["l2", "F", "l", "F", "l'", "F'", "l'", "F'", "l'", "F", "l'", "F2"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgrB.movesArr), ["d2", "B", "d", "B", "d'", "B'", "d'", "B'", "d'", "B", "d'", "B2"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgrB.movesArr), ["u2", "B", "u", "B", "u'", "B'", "u'", "B'", "u'", "B", "u'", "B2"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgrB.movesArr), ["l2", "B", "l", "B", "l'", "B'", "l'", "B'", "l'", "B", "l'", "B2"])
	})
	it ('rotates f and u moves', () => {
		const testAlgfu = new Alg("f2 u f u f' u' f' u' f' u f' u2")
		assert.deepEqual(Alg.rotateMoves("x", testAlgfu.movesArr), ["u2", "b", "u", "b", "u'", "b'", "u'", "b'", "u'", "b", "u'", "b2"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgfu.movesArr), ["d2", "f", "d", "f", "d'", "f'", "d'", "f'", "d'", "f", "d'", "f2"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgfu.movesArr), ["b2", "d", "b", "d", "b'", "d'", "b'", "d'", "b'", "d", "b'", "d2"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgfu.movesArr), ["l2", "u", "l", "u", "l'", "u'", "l'", "u'", "l'", "u", "l'", "u2"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgfu.movesArr), ["r2", "u", "r", "u", "r'", "u'", "r'", "u'", "r'", "u", "r'", "u2"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgfu.movesArr), ["b2", "u", "b", "u", "b'", "u'", "b'", "u'", "b'", "u", "b'", "u2"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgfu.movesArr), ["f2", "r", "f", "r", "f'", "r'", "f'", "r'", "f'", "r", "f'", "r2"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgfu.movesArr), ["f2", "l", "f", "l", "f'", "l'", "f'", "l'", "f'", "l", "f'", "l2"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgfu.movesArr), ["f2", "d", "f", "d", "f'", "d'", "f'", "d'", "f'", "d", "f'", "d2"])
	})
	it('rotates b and l moves', () => {
		const testAlglb = new Alg("b2 l b l b' l' b' l' b' l b' l2")
		assert.deepEqual(Alg.rotateMoves("x", testAlglb.movesArr), ["d2", "l", "d", "l", "d'", "l'", "d'", "l'", "d'", "l", "d'", "l2"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlglb.movesArr), ["u2", "l", "u", "l", "u'", "l'", "u'", "l'", "u'", "l", "u'", "l2"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlglb.movesArr), ["f2", "l", "f", "l", "f'", "l'", "f'", "l'", "f'", "l", "f'", "l2"])
		assert.deepEqual(Alg.rotateMoves("y", testAlglb.movesArr), ["r2", "b", "r", "b", "r'", "b'", "r'", "b'", "r'", "b", "r'", "b2"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlglb.movesArr), ["l2", "f", "l", "f", "l'", "f'", "l'", "f'", "l'", "f", "l'", "f2"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlglb.movesArr), ["f2", "r", "f", "r", "f'", "r'", "f'", "r'", "f'", "r", "f'", "r2"])
		assert.deepEqual(Alg.rotateMoves("z", testAlglb.movesArr), ["b2", "u", "b", "u", "b'", "u'", "b'", "u'", "b'", "u", "b'", "u2"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlglb.movesArr), ["b2", "d", "b", "d", "b'", "d'", "b'", "d'", "b'", "d", "b'", "d2"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlglb.movesArr), ["b2", "r", "b", "r", "b'", "r'", "b'", "r'", "b'", "r", "b'", "r2"])
	})
	it('rotates x and d moves', () => {
		const testAlgxd = new Alg("d x d' x' d2 x2")
		assert.deepEqual(Alg.rotateMoves("x", testAlgxd.movesArr), ["f", "x", "f'", "x'", "f2", "x2"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgxd.movesArr), ["b", "x", "b'", "x'", "b2", "x2"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgxd.movesArr), ["u", "x", "u'", "x'", "u2", "x2"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgxd.movesArr), ["d", "z", "d'", "z'", "d2", "z2"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgxd.movesArr), ["d", "z'", "d'", "z", "d2", "z2"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgxd.movesArr), ["d", "x'", "d'", "x", "d2", "x2"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgxd.movesArr), ["l", "y'", "l'", "y", "l2", "y2"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgxd.movesArr), ["r", "y", "r'", "y'", "r2", "y2"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgxd.movesArr), ["u", "x'", "u'", "x", "u2", "x2"])
	})
	it('rotates y moves', () => {
		const testAlgy = new Alg("y F y' F y2")
		assert.deepEqual(Alg.rotateMoves("x", testAlgy.movesArr), ["z'", "U", "z", "U", "z2"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgy.movesArr), ["z", "D", "z'", "D", "z2"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgy.movesArr), ["y'", "B", "y", "B", "y2"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgy.movesArr), ["y", "L", "y'", "L", "y2"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgy.movesArr), ["y", "R", "y'", "R", "y2"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgy.movesArr), ["y", "B", "y'", "B", "y2"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgy.movesArr), ["x", "F", "x'", "F", "x2"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgy.movesArr), ["x'", "F", "x", "F", "x2"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgy.movesArr), ["y'", "F", "y", "F", "y2"])
	})
	it('rotates z moves', () => {
		const testAlgz = new Alg("z U z' U z2")
		assert.deepEqual(Alg.rotateMoves("x", testAlgz.movesArr), ["y", "B", "y'", "B", "y2"])
		assert.deepEqual(Alg.rotateMoves("x'", testAlgz.movesArr), ["y'", "F", "y", "F", "y2"])
		assert.deepEqual(Alg.rotateMoves("x2", testAlgz.movesArr), ["z'", "D", "z", "D", "z2"])
		assert.deepEqual(Alg.rotateMoves("y", testAlgz.movesArr), ["x'", "U", "x", "U", "x2"])
		assert.deepEqual(Alg.rotateMoves("y'", testAlgz.movesArr), ["x", "U", "x'", "U", "x2"])
		assert.deepEqual(Alg.rotateMoves("y2", testAlgz.movesArr), ["z'", "U", "z", "U", "z2"])
		assert.deepEqual(Alg.rotateMoves("z", testAlgz.movesArr), ["z", "R", "z'", "R", "z2"])
		assert.deepEqual(Alg.rotateMoves("z'", testAlgz.movesArr), ["z", "L", "z'", "L", "z2"])
		assert.deepEqual(Alg.rotateMoves("z2", testAlgz.movesArr), ["z", "D", "z'", "D", "z2"])
	})
	it('performs all possible rotations', () => {
		const testAlg = new Alg("U R")
		assert.deepEqual(Alg.getAllRotations(testAlg.movesArr), [
			{ rotation: '', transformedMoves: [ 'U', 'R' ] },
			{ rotation: 'x', transformedMoves: [ 'B', 'R' ] },
			{ rotation: 'x\'', transformedMoves: [ 'F', 'R' ] },
			{ rotation: 'y', transformedMoves: [ 'U', 'F' ] },
			{ rotation: 'y\'', transformedMoves: [ 'U', 'B' ] },
			{ rotation: 'z', transformedMoves: [ 'R', 'D' ] },
			{ rotation: 'z\'', transformedMoves: [ 'L', 'U' ] },
			{ rotation: 'x2', transformedMoves: [ 'D', 'R' ] },
			{ rotation: 'y2', transformedMoves: [ 'U', 'L' ] },
			{ rotation: 'z2', transformedMoves: [ 'D', 'L' ] },
			{ rotation: [ 'y', 'x' ], transformedMoves: [ 'B', 'U' ] },
			{ rotation: [ 'y', 'x\'' ], transformedMoves: [ 'F', 'D' ] },
			{ rotation: [ 'y', 'x2' ], transformedMoves: [ 'D', 'B' ] },
			{ rotation: [ 'y', 'z' ], transformedMoves: [ 'R', 'F' ] },
			{ rotation: [ 'y', 'z\'' ], transformedMoves: [ 'L', 'F' ] },
			{ rotation: [ 'y\'', 'x' ], transformedMoves: [ 'B', 'D' ] },
			{ rotation: [ 'y\'', 'x\'' ], transformedMoves: [ 'F', 'U' ] },
			{ rotation: [ 'y\'', 'x2' ], transformedMoves: [ 'D', 'F' ] },
			{ rotation: [ 'y\'', 'z' ], transformedMoves: [ 'R', 'B' ] },
			{ rotation: [ 'y\'', 'z\'' ], transformedMoves: [ 'L', 'B' ] },
			{ rotation: [ 'y2', 'x' ], transformedMoves: [ 'B', 'L' ] },
			{ rotation: [ 'y2', 'x\'' ], transformedMoves: [ 'F', 'L' ] },
			{ rotation: [ 'y2', 'z' ], transformedMoves: [ 'R', 'U' ] },
			{ rotation: [ 'y2', 'z\'' ], transformedMoves: [ 'L', 'D' ] }
		])
	})
	it('normalizes the execution angle', () => {
		const testAlg = new Alg("x y z2 R U")
		assert.deepEqual(Alg.normalizeAngle(testAlg.movesArr), ["D", "B"])
	})
})

describe('Wide turn translations', () => {
	it (`detects and applies "l" turns`, () => {
		const testWideL = new Alg("R U R' U'")
		assert.deepEqual(Alg.applyWideTurn(testWideL.movesArr), ["l", "F", "R'", "F'"])
	})
	it (`detects and applies "l'" turns`, () => {
		const testWideLPrime = new Alg("R' U R U'")
		assert.deepEqual(Alg.applyWideTurn(testWideLPrime.movesArr), ["l'", "B", "R", "B'"])
	})
	it (`detects and applies "l2" turns`, () => {
		const testWideL2 = new Alg("R2 F R F' R")
		assert.deepEqual(Alg.applyWideTurn(testWideL2.movesArr), ["l2", "B", "R", "B'", "R"])
	})
	it (`detects and applies "r" turns`, () => {
		const testWideR = new Alg("L' U' L U")
		assert.deepEqual(Alg.applyWideTurn(testWideR.movesArr), ["r'", "F'", "L", "F"])
	})
	it (`detects and applies "r'" turns`, () => {
		const testWideRPrime = new Alg("L U' L' U")
		assert.deepEqual(Alg.applyWideTurn(testWideRPrime.movesArr), ["r", "B'", "L'", "B"])
	})
	it (`detects and applies "r2" turns`, () => {
		const testWideR2 = new Alg("L2 F' L' F L'")
		assert.deepEqual(Alg.applyWideTurn(testWideR2.movesArr), ["r2", "B'", "L'", "B", "L'"])
	})
	it (`detects and applies "u" turns`, () => {
		const testWideU = new Alg("D R U' R' D'")
		assert.deepEqual(Alg.applyWideTurn(testWideU.movesArr), ["u", "F", "U'", "F'", "D'"])
	})
	it (`detects and applies "u'" turns`, () => {
		const testWideUPrime = new Alg("D' R U' R' D")
		assert.deepEqual(Alg.applyWideTurn(testWideUPrime.movesArr), ["u'", "B", "U'", "B'", "D"])
	})
	it (`detects and applies "u2" turns`, () => {
		const testWideU2 = new Alg("D2 R U' R' D2")
		assert.deepEqual(Alg.applyWideTurn(testWideU2.movesArr), ["u2", "L", "U'", "L'", "D2"])
	})
	it (`detects and applies "d" turns`, () => {
		const testWideD = new Alg("U R U' R'")
		assert.deepEqual(Alg.applyWideTurn(testWideD.movesArr), ["d","B", "U'", "B'"])
	})
	it (`detects and applies "d'" turns`, () => {
		const testWideDPrime = new Alg("U' R' U R")
		assert.deepEqual(Alg.applyWideTurn(testWideDPrime.movesArr), ["d'", "F'", "U", "F"])
	})
	it (`detects and applies "d2" turns`, () => {
		const testWideD2 = new Alg("U2 R U R'")
		assert.deepEqual(Alg.applyWideTurn(testWideD2.movesArr), ["d2", "L", "U", "L'"])
	})
	it (`detects and applies "f" turns`, () => {
		const testWideF = new Alg("B U B' U'")
		assert.deepEqual(Alg.applyWideTurn(testWideF.movesArr), ["f", "R", "B'", "R'"])
	})
	// TODO: Finish these, and also go from wide turn to face turn
	it (`detects and applies "f'" turns`, () => {

	})
	it (`detects and applies "f2" turns`, () => {
		
	})
	it (`detects and applies "b" turns`, () => {

	})
	it (`detects and applies "b'" turns`, () => {

	})
	it (`detects and applies "b2" turns`, () => {
		
	})
})

describe("Invert Moves", () => {
	it(`inverts moves`, () => {
		const testAlg = new Alg("x")
		const testAlg2 = new Alg("x'")
		const testAlg3 = new Alg("R2")
		assert.equal(Alg.invertMove(testAlg.movesArr[0]), "x'")
		assert.equal(Alg.invertMove(testAlg2.movesArr[0]), "x")		
		assert.equal(Alg.invertMove(testAlg3.movesArr[0]), "R2")
	})
})

describe("Slice translations", () => {
	it (`detects and applies M`, () => {
		const testM = new Alg("L R' F R")
		assert.deepEqual(Alg.applySlice(testM.movesArr), ["M'", "U", "R"])
		const test2M = new Alg("M' U R")
		assert.deepEqual(Alg.applySlice(test2M.movesArr), ["L", "R'", "F", "R"])
	})
	// TODO
	it(`detects and applies M'`, () => {

	})
	it(`detects and applies M2`, () => {
		
	})
	it(`detects and applies S`, () => {
		
	})
	it(`detects and applies S'`, () => {
		
	})
	it(`detects and applies S2`, () => {
		
	})
	it(`detects and applies E`, () => {
		
	})
	it(`detects and applies E'`, () => {
		
	})
	it(`detects and applies E2`, () => {
		
	})
})
