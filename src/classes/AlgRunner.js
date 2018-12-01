export default class AlgRunner {

	constructor() {

	}

	// returns an array of algs with their scores
	run(alg, candidateExecutions=[], maxAllowedCandidates=10, currentScore=0, hands = new Hands(/*TODO customize turnign preference*/)) {

		// do first move with hands, and get rating for the move
		// add rating to current score
		
		// depth control
		// if currentScore > score of the last candidate
			// return

		// if there are no moves left in the alg
			// insert alg into candidates array in sorted position, maintaining the length of the array
			// return
		
		// run as is
		// run with wide turn as first move (if possible)
		// run with slice applied (if possible)
		// run with rotations (I can see this getting out of hand if rotations pile up, but depth control should help this)


	}
}