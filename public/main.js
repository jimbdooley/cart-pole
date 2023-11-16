
const floorDob = DisplayObject([0, -4.5, 0], [20, 1, 20])
const floorDob2 = DisplayObject([0, -24.5, -20], [20, 20, 20], Math.PI *0.5)
const floorDob3 = DisplayObject([-20, -24.5, 0], [20, 20, 20], Math.PI *0.5, -Math.PI *0.5, 0)
const floorDob4 = DisplayObject([20, -24.5, 0], [20, 20, 20], Math.PI *0.5, Math.PI *0.5, 0)

const testDob = DisplayObject([0, 0, 0], [1.5, 1.5, 1.5])


let cObj = null
function loop() {
    requestAnimationFrame(loop)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.clear(gl.DEPTH_BUFFER_BIT)
    World.updatePosition()
    DrawerFloor.draw(floorDob, PosNormIndTexs.square, 1)
    DrawerFloor.draw(floorDob2, PosNormIndTexs.square, 1)
    DrawerFloor.draw(floorDob3, PosNormIndTexs.square, 0)
    DrawerFloor.draw(floorDob4, PosNormIndTexs.square, 0)
    Animations.updateAll()
}

function play(which, dz, frz, n) {
    if (which == 0) {
        const cart = DisplayObject([0, 1.2, 0], [2.5, 1, 1])
        const wheel1 = DisplayObject([0,0,0], [0.8, 0.8, 1.5])
        const wheel2 = DisplayObject([0,0,0], [0.8, 0.8, 1.5])
        const pole = DisplayObject([0,0,0], [0.12, 3, 0.12])
        const weight = DisplayObject([0, 0, 0], [0.6, 0.6, 0.6])
        const cartFollowers = [
            {
                dob: DisplayObject([0, 0, 0], [1, 1, 0.2]),
                dXYZ: [0, 1, -0.5, 0],
                bufs: PosNormIndTexs.cylZ,
                texture: "GgearMetal",
            },
            {
                dob: DisplayObject([0, 0, 0], [1, 1, 0.2]),
                dXYZ: [0, 1, 0.5, 0],
                bufs: PosNormIndTexs.cylZ,
                texture: "GgearMetal",
            },
        ]
        animate(dz, frz, cart, "Gred", PosNormIndTexs.cube, scripts["falling_Pxx/cart.txt"], cartFollowers)
        animate(dz, frz, wheel1, "Gletter", PosNormIndTexs.cylZ, scripts["falling_Pxx/wheel1.txt"])
        animate(dz, frz, wheel2, "Gletter", PosNormIndTexs.cylZ, scripts["falling_Pxx/wheel2.txt"])
        animate(dz, frz, pole, "Gblue", PosNormIndTexs.cylY, scripts["falling_Pxx/pole.txt"])
        animate(dz, frz, weight, "Gblue", PosNormIndTexs.cylY, scripts["falling_Pxx/weight.txt"])
    } 
    if (which == 1) {
        const cart = DisplayObject([0, 1.2, 0], [2.5, 1, 1])
        const wheel1 = DisplayObject([0,0,0], [0.8, 0.8, 1.5])
        const wheel2 = DisplayObject([0,0,0], [0.8, 0.8, 1.5])
        const pole = DisplayObject([0,0,0], [0.12, 3, 0.12])
        const weight = DisplayObject([0, 0, 0], [0.6, 0.6, 0.6])
        const cartFollowers = [
            {
                dob: DisplayObject([0, 0, 0], [1, 1, 0.2]),
                dXYZ: [0, 1, -0.5, 0],
                bufs: PosNormIndTexs.cylZ,
                texture: "gearMetal",
            },
            {
                dob: DisplayObject([0, 0, 0], [1, 1, 0.2]),
                dXYZ: [0, 1, 0.5, 0],
                bufs: PosNormIndTexs.cylZ,
                texture: "gearMetal",
            },
        ]
        animate(dz, frz, cart, "red", PosNormIndTexs.cube, scripts["falling_Pxx/cart.txt"], cartFollowers)
        animate(dz, frz, wheel1, "letter", PosNormIndTexs.cylZ, scripts["falling_Pxx/wheel1.txt"])
        animate(dz, frz, wheel2, "letter", PosNormIndTexs.cylZ, scripts["falling_Pxx/wheel2.txt"])
        animate(dz, frz, pole, "blue", PosNormIndTexs.cylY, scripts["falling_Pxx/pole.txt"])
        animate(dz, frz, weight, "blue", PosNormIndTexs.cylY, scripts["falling_Pxx/weight.txt"])
    }
    if (which == 2) {
        const dir = "cartAI_" + n
        const cart = DisplayObject([0, 1.2, 0], [2.5, 1, 1])
        const wheel1 = DisplayObject([0,0,0], [0.8, 0.8, 1.5])
        const wheel2 = DisplayObject([0,0,0], [0.8, 0.8, 1.5])
        const pole = DisplayObject([0,0,0], [0.12, 3, 0.12])
        const weight = DisplayObject([0, 0, 0], [0.6, 0.6, 0.6])
        const cartFollowers = [
            {
                dob: DisplayObject([0, 0, 0], [1, 1, 0.2]),
                dXYZ: [0, 1, -0.5, 0],
                bufs: PosNormIndTexs.cylZ,
                texture: "gearMetal",
            },
            {
                dob: DisplayObject([0, 0, 0], [1, 1, 0.2]),
                dXYZ: [0, 1, 0.5, 0],
                bufs: PosNormIndTexs.cylZ,
                texture: "gearMetal",
            },
        ]
        animate(dz, frz, cart, "yellow", PosNormIndTexs.cube, scripts[dir + "/cart.txt"], cartFollowers)
        animate(dz, frz, wheel1, "letter", PosNormIndTexs.cylZ, scripts[dir + "/wheel1.txt"])
        animate(dz, frz, wheel2, "letter", PosNormIndTexs.cylZ, scripts[dir + "/wheel2.txt"])
        animate(dz, frz, pole, "blue", PosNormIndTexs.cylY, scripts[dir + "/pole.txt"])
        animate(dz, frz, weight, "blue", PosNormIndTexs.cylY, scripts[dir + "/weight.txt"])
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
    
    for (let i = 0; i < 10; i++) {
        play(2, -16 + 4 * i, -1, i + 80)
    }
    
    loop()
}
init()
