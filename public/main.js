
const floorDob = DisplayObject([0, -5, 0], [100, 1, 100])

const testDob = DisplayObject([0, 1.2, 0], [1.5, 1.5, 1.5])

let cObj = null
function loop() {
    requestAnimationFrame(loop)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.clear(gl.DEPTH_BUFFER_BIT)
    World.updatePosition()
    DrawerFloor.draw(floorDob, PosNormIndTexs.square)
    //DrawerVanilla.draw(testDob, "letter", PosNormIndTexs.cube)

    Animations.updateAll()

}

function play(which=0) {
    if (which == 0) {
        animate(testDob, "red", PosNormIndTexs.cube, assets["text/output.txt"])
    }
}

async function init() {
    await get_all_assets()
    DrawerVanilla.setup()
    DrawerFloor.setup()
    PosNormIndTexs.setup()
    World.setup(canvas)

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    play()

    loop()
}
init()
