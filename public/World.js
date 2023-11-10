
const WorldPositions = {
    first: {
        loc: [0, -10, 10],
        thZ: 0.5*Math.PI,
        pitch: -Math.PI * 0.25,
        target: [0, 0, 0],
    }
}

const World = {
    viewWidth: null,
    viewHeight: null,
    pvm: null,
    fov: 0.4668,
    pos: "first",
    updatePositions() {
        for (const key in WorldPositions) {
            const pos = WorldPositions[key]
            pos.target[0] = pos.loc[0] + Math.cos(pos.pitch) * Math.cos(pos.thZ)
            pos.target[1] = pos.loc[1] + Math.cos(pos.pitch) * Math.sin(pos.thZ)
            pos.target[2] = pos.loc[2] + Math.sin(pos.pitch)
        }
    },
    setup(canvas) {
        this.updatePositions()
        this.viewWidth = canvas.clientWidth
        this.viewHeight = canvas.clientHeight
        this.pvm = PVM(this.viewWidth, this.viewHeight, this.fov, 
            WorldPositions[this.pos].loc, 
            WorldPositions[this.pos].target)
    },
}