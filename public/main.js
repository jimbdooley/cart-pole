
const floorDob = DisplayObject([0, 0, 0], [100, 100, 0])

const testDob = DisplayObject([0, 0, 1.2], [1, 1, 1])

let cObj = null
function loop() {
    requestAnimationFrame(loop)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.clear(gl.DEPTH_BUFFER_BIT)
    testDob.thZ += 0.01
    testDob.thTilt += 0.01
    DrawerFloor.draw(floorDob, PosNormIndTexs.square)
    DrawerVanilla.draw(testDob, "red", PosNormIndTexs.cartWheel)

}
async function init() {
    await get_all_assets()
    cObj = objProperToPosNormIndTex(assets["objs/c.obj"])
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
    loop()
}


init()
