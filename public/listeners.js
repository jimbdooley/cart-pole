

const KeyBoardState  = {
    left: 0,
    right: 0,
    forward: 0,
    backward: 0,
    up: 0,
    down: 0,
    lookDown: 0,
    lookUp:0,
    lookLeft: 0,
    lookRight: 0,
}

const KeysToCommands = {
    "ArrowLeft": "lookLeft",
    "ArrowRight": "lookRight",
    "ArrowUp": "lookUp",
    "ArrowDown": "lookDown",
    "w": "forward",
    "W": "forward",
    "s": "backward",
    "S": "backward",
    "a": "left",
    "A": "left",
    "d": "right",
    "D": "right",
    "r": "up",
    "R": "up",
    "f": "down",
    "F": "down",
}

const KeyboardSpeeds = {
    i: 1,
    rotations: [0.003, 0.01],
    translations: [0.05, 0.15],
}

function updateFromKeyboard(pos) {
    const signThY = KeyBoardState.lookRight - KeyBoardState.lookLeft
    pos.thY = (pos.thY + signThY * KeyboardSpeeds.rotations[KeyboardSpeeds.i]) % (2 * Math.PI)
    const signPitch = KeyBoardState.lookUp - KeyBoardState.lookDown
    pos.pitch = (pos.pitch + signPitch * KeyboardSpeeds.rotations[KeyboardSpeeds.i])
    pos.pitch = Math.max(-0.499*Math.PI, Math.min(0.499*Math.PI, pos.pitch))
    
    const signForward = KeyBoardState.forward - KeyBoardState.backward
    const signRight = KeyBoardState.right - KeyBoardState.left
    const dz = signForward * Math.sin(pos.thY) + signRight * Math.sin(pos.thY + 0.5*Math.PI)
    const dx = signForward * Math.cos(pos.thY) + signRight * Math.cos(pos.thY + 0.5*Math.PI)
    pos.loc[0] += dx * KeyboardSpeeds.translations[KeyboardSpeeds.i]
    pos.loc[2] += dz * KeyboardSpeeds.translations[KeyboardSpeeds.i]
    
    const signUp = KeyBoardState.up - KeyBoardState.down
    pos.loc[1] += signUp * KeyboardSpeeds.translations[KeyboardSpeeds.i]
}

document.addEventListener("keydown", (e) => {
    if (e.key in KeysToCommands) {
        e.preventDefault()
        KeyBoardState[KeysToCommands[e.key]] = 1
    }
    if (e.key == " ") {
        KeyboardSpeeds.i = (KeyboardSpeeds.i + 1) % KeyboardSpeeds.rotations.length
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key in KeysToCommands) {
        e.preventDefault()
        KeyBoardState[KeysToCommands[e.key]] = 0
    }
})
