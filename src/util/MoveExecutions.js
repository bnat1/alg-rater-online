module.exports = {
	"R": [
		{
			"newPosition": 1,
			"penalty": 1,
			"position": 0,
			"hand": "right"
		},
		{
			"newPosition": 0,
			"penalty": 1,
			"position": -1,
			"hand": "right"
		}
	],
	"R'": [
		{
			"newPosition": -1,
			"penalty": 1,
			"position": 0,
			"hand": "right"
		},
		{
			"newPosition": 0,
			"penalty": 1,
			"position": 1,
			"hand": "right"
		}
	],
	"R2": [
		{
			"newPosition": -1,
			"penalty": 1,
			"description": "Invert double turn",
			"position": 1,
			"hand": "right"
		},
		{
			"newPosition": 1,
			"penalty": 1,
			"position": -1,
			"hand": "right"
		}
	],
	"U": [
		{
			"penalty": 1.5,
			"position": 0,
			"hand": "left",
			"description": "U push"
		},
		{
			"penalty": 1,
			"position": 0,
			"hand": "right"
		}
	],
	"U'": [
		{
			"penalty": 1,
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1.2,
			"position": 0,
			"hand": "right",
			"mustFollow": ["R"],
			"description": "thumb"
		}
	],
	"U2": [
		{
			"penalty": 1.5,
			"description": "Double flick",
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1.1,
			"description": "Double flick"
		}
	],
	"L": [
		{
			"penalty": 1,
			"newPosition": -1,
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1,
			"newPosition": 0,
			"position": 1,
			"hand": "left"
		}
	],
	"L'": [
		{
			"penalty": 1,
			"newPosition": 1,
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1,
			"newPosition": 0,
			"position": -1,
			"hand": "left"
		}
	],
	"L2": [
		{
			"penalty": 1,
			"newPosition": -1,
			"position": 1,
			"hand": "left"
		},
		{
			"penalty": 1,
			"newPosition": 1,
			"description": "Invert",
			"position": -1,
			"hand": "left"
		}
	],
	"D": [
		{
			"penalty": 1,
			"position": 0,
			"hand": "left"
		}
	],
	"D'": [
		{
			"penalty": 1,
			"description": "Ring push",
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1.2,
			"position": 0,
			"hand": "right"
		}
	],
	"D2": [
		{
			"penalty": 1.5,
			"description": "Double flick",
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1.8,
			"description": "Double flick",
			"position": 0,
			"hand": "right"
		}
	],
	"F": [
		{
			"penalty": 1,
			"position": -1,
			"hand": "right"
		},
		{
			"penalty": 1.5,
			"description": "D flick",
			"position": 1,
			"hand": "left"
		}
	],
	"F'": [
		{
			"penalty": 1.6,
			"position": -1,
			"hand": "left"
		},
		{
			"penalty": 1.25,
			"position": -1,
			"hand": "right",
			"description": "thumb"
		},
		{
			"penalty": 1.25,
			"position": 0,
			"hand": "right",
			"description": "thumb",
			"mustFollow": ["R"]
		}
	],
	"F2": [
		{
			"penalty": 1.6,
			"description": "D2 flick",
			"position": 1,
			"hand": "left"
		},
		{
			"penalty": 1.5,
			"description": "Invert",
			"position": -1,
			"hand": "left"
		},
		{
			"penalty": 1.2,
			"description": "Double flick",
			"position": -1,
			"hand": "right"
		},
		{
			"penalty": 1.8,
			"position": 1,
			"description": "D2 flick",
			"hand": "right"
		}
	],
	"B": [
		{
			"penalty": 1,
			"position": -1,
			"hand": "left",
			"description": "D flick"
		},
		{
			"penalty": 1,
			"position": 1,
			"hand": "right"
		}
	],
	"B'": [
		{
			"penalty": 1,
			"position": 1,
			"hand": "left"
		},
		{
			"penalty": 1,
			"position": -1,
			"hand": "right",
			"description": "D flick"
		},
		{
			"penalty": 1.1,
			"position": 1,
			"hand": "right",
			"mustFollow": ["R", "R2"]
		}
	],
	"B2": [
		{
			"penalty": 1.4,
			"description": "Invert",
			"position": 1,
			"hand": "left"
		},
		{
			"penalty": 1.6,
			"position": -1,
			"hand": "left",
		},
		{
			"penalty": 2,
			"position": -1,
			"hand": "right"
		},
		{
			"penalty": 1.2,
			"position": 1,
			"hand": "right"
		}
	],
	"M": [
		{
			"penalty": 1,
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1.2,
			"position": 0,
			"hand": "right"
		}
	],
	"M'": [
		{
			"penalty": 1,
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1.2,
			"position": 0,
			"hand": "right"
		}
	],
	"M2": [
		{
			"penalty": 1.1,
			"description": "Ring middle flick",
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 1.3,
			"description": "Ring middle flick",
			"position": 0,
			"hand": "right"
		}
	],
	"S": [
		{
			"penalty": 2,
			"position": -1,
			"hand": "right"
		},
		{
			"penalty": 2,
			"position": 1,
			"hand": "right"
		}
	],
	"S'": [
		{
			"penalty": 2,
			"position": 1,
			"hand": "right"
		},
		{
			"penalty": 2,
			"position": -1,
			"hand": "right"
		}
	],
	"S2": [
		{
			"penalty": 3,
			"position": -1,
			"hand": "right"
		}
	],
	"E": [
		{
			"penalty": 2,
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 2,
			"position": 0,
			"hand": "right"
		}
	],
	"E'": [
		{
			"penalty": 2,
			"position": 0,
			"hand": "right"
		},
		{
			"penalty": 2,
			"position": 0,
			"hand": "left"
		}		
	],
	"E2": [
		{
			"penalty": 3,
			"position": 0,
			"hand": "left"
		},
		{
			"penalty": 3,
			"position": 0,
			"hand": "right"
		}
	]
}
