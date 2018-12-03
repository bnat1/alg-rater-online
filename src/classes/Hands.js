export default class Hands {
	constructor(hands, lhPosition=0, rhPosition=0) {
		this.lh = { 
			position: hands ? hands.lh.position : lhPosition, 
			availableMoves: hands ? hands.lh.availableMoves : {
				'-1': new Set(["F'", "B", ]),
				'0': new set(["U'", "D", "L", "L'"]),
				'1': new Set(["B'", "F", "L", "L2"])
			} 
		}
		this.rh = { 
			position: hands ? hands.rh.position : rhPosition,
			availableMoves: hands ? hands.rh.availableMoves : {
				'-1': new Set([]),
				'0': new set(["U'", "D", "L", "L'"]),
				'1': new Set([])
			}
		} 
	}

	// this function does all rotations at the beginning and then the turn following it.
	// Returns a score for the turn it just did and 
	doTurn(moves) {

	}

}