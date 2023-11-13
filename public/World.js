
const WorldPositions = {
    first: {
        thY: 0.5*Math.PI,
        pitch: -Math.PI * 0.25,
        loc: [0, 10, -10],
        target: [0, 0, 0],
        up: [0, 1, 0],
    },
    
    // after finding a desired  camera angle, type JSON.stringify(WorldPositions[World.pos]) in the console, 
    // then put that string into the JSON.parse() below
    // then in the World singleton, put the name of the position in the World.pos field
    youCustomCameraPosition: JSON.parse('{}'),

    angled: JSON.parse('{"thY":1.2007963267948962,"pitch":-0.40539816339744794,"loc":[-12.84703004578927,13.750000000000009,-32.738382152075665],"target":[-12.514725193382526,13.355615317938542,-31.881624188808203],"up":[0,1,0]}'),
    

}

const World = {
    viewWidth: null,
    viewHeight: null,
    pvm: null,
    fov: 0.4668,
    pos: "angled",
    updatePosition() {
        const pos = WorldPositions[this.pos]
        updateFromKeyboard(pos)
        pos.target[0] = pos.loc[0] + Math.cos(pos.pitch) * Math.cos(pos.thY)
        pos.target[1] = pos.loc[1] + Math.sin(pos.pitch)
        pos.target[2] = pos.loc[2] + Math.cos(pos.pitch) * Math.sin(pos.thY)
        this.pvm.updateCamera(pos)
    },
    setup(canvas) {
        const pos = WorldPositions[this.pos]
        pos.target[0] = pos.loc[0] + Math.cos(pos.pitch) * Math.cos(pos.thY)
        pos.target[1] = pos.loc[1] + Math.cos(pos.pitch) * Math.sin(pos.thY)
        pos.target[2] = pos.loc[2] + Math.sin(pos.pitch)
        this.viewWidth = canvas.clientWidth
        this.viewHeight = canvas.clientHeight
        this.pvm = PVM(this.viewWidth, this.viewHeight, this.fov, pos)
    },
}
