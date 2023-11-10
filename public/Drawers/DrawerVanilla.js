
const DrawerVanilla = {
    posLoc: -1,
    normLoc: -1,
    texLoc: -1,
    samplerLoc: -1,
    lightDirLoc: -1,
    pvmLoc: -1,
    mLoc: -1,
    bmpInPlace: {
        "gearMetal": Bitmap.createBitmap([[255, 100, 100, 112]], 1, 1, Bitmap.Config.ARGB_8888),
        "letter": Bitmap.createBitmap([
            [255, 55, 55, 55],
            [255, 255, 255, 0],
            [255, 0, 0, 0],
            [255, 255, 255, 0],
        ], 2, 2, Bitmap.Config.ARGB_8888),
        "red": Bitmap.createBitmap([[255, 255, 0, 0]], 1, 1, Bitmap.Config.ARGB_8888),
        "green": Bitmap.createBitmap([[255, 0, 255, 0]], 1, 1, Bitmap.Config.ARGB_8888),
        "blue": Bitmap.createBitmap([[255, 0, 0, 255]], 1, 1, Bitmap.Config.ARGB_8888),
        "yellow": Bitmap.createBitmap([[255, 255, 255, 0]], 1, 1, Bitmap.Config.ARGB_8888),
        "counterfeit": Bitmap.createBitmap([[255, 194, 178, 128]], 1, 1, Bitmap.Config.ARGB_8888),
        "shade": Bitmap.createBitmap([[220, 0, 0, 0]], 1, 1, Bitmap.Config.ARGB_8888),
    },
    bmpDrawables: {
        "crate_hand": "crate_hand.png",
        "tmap": "tmap.png",
        "hand_bgr": "hand_bgr.jpg",
        "intro_3": "intro_3.png",
    },
    strToTexHandleI: {},
    strToLastLang: {},
    drawableStrToLoaded: {},
    texHandles: [],
    shader: null,

    setupBmp: function(bmp, handle) {
        gl.bindTexture(gl.TEXTURE_2D, handle)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    },
    langToScoreSize: {},
    langToLevelSize: {},

    setup: function(context) {
        while (this.drawableStrToLoaded.length > 0) this.drawableStrToLoaded.pop()
        const texHandlesMutable = []
        for (key in this.bmpDrawables) {
            this.strToTexHandleI[key] = texHandlesMutable.length
            texHandlesMutable.push(-1)
        }
        for (key in this.bmpInPlace) {
            this.strToTexHandleI[key] = texHandlesMutable.length
            texHandlesMutable.push(-1)
        }
        this.texHandles = texHandlesMutable
        for (let i = 0; i < this.texHandles.length; i++) {
            this.texHandles[i] = gl.createTexture()
        }
        for (key in this.bmpInPlace) {
            this.setupBmp(this.bmpInPlace[key], this.texHandles[this.strToTexHandleI[key]])
        }
        this.shader = Shader(assets["shaders/pos_norm_ind_tex.vert"],
            assets["shaders/pos_norm_ind_tex.frag"])
        this.pvmLoc = gl.getUniformLocation(this.shader.full, "u_pvmMat")
        this.mLoc = gl.getUniformLocation(this.shader.full, "u_mMat")
        this.posLoc = gl.getAttribLocation(this.shader.full, "a_pos")
        this.normLoc = gl.getAttribLocation(this.shader.full, "a_norm")
        this.texLoc = gl.getAttribLocation(this.shader.full, "a_tex")
        this.samplerLoc = gl.getUniformLocation(this.shader.full, "u_sampler")
        this.lightDirLoc = gl.getUniformLocation(this.shader.full, "u_light_dir")
        console.log("vanilla frag", this.shader.fragCompileLog)
        console.log("vanilla vert", this.shader.vertCompileLog)
        console.log("Drawer Created", "Vanilla Drawer")
    },

    DIRECT_LIGHT: [0, 0, 1],
    LIGHT_30_85: [
        0.3,
        0.85 * Math.sqrt(1 - 0.3 * 0.3),
        Math.sqrt(1 - 0.85 * 0.85) * Math.sqrt(1 - 0.3*0.3)
    ],
    LIGHT_RIGHT: [Math.sqrt(2)/2, 0, Math.sqrt(2)/2],
    BTN_NOT_PRESSED: [0.1, 0.3, Math.sqrt(0.9)],
    BTN_PRESSED: [0.65*0.1, 0.65*0.3, 0.65*Math.sqrt(0.9), ],
    draw: function(o, bmpName, bufs, lightArray=this.DIRECT_LIGHT){
        World.pvm.updateWithDisplayObject(o)

        if (bmpName in this.bmpDrawables) {
            if (!(bmpName in this.drawableStrToLoaded) || !this.drawableStrToLoaded[bmpName]) {
                const bmp = drawable[this.bmpDrawables[bmpName]]
                if (bmpName.length >= 2 && bmpName.substring(0, bmpName.length-2) == "level_") {
                    const bmpSize = [bmp.width, bmp.height]
                    const langStr = bmpName.substring(bmpName.length-2, bmpName.length).toString()
                    this.langToLevelSize[langStr] = bmpSize
                }
                if (bmpName.length >= 2 && bmpName.substring(0, bmpName.length-2) == "score_") {
                    const bmpSize = [bmp.width, bmp.height]
                    const langStr = bmpName.substring(bmpName.length-2, bmpName.length).toString()
                    this.langToScoreSize[langStr] = bmpSize
                }
                this.setupBmp(bmp, this.texHandles[this.strToTexHandleI[bmpName]])
                this.drawableStrToLoaded[bmpName] = true
            }
        }
        
        gl.useProgram(this.shader.full)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufs.ind);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, bufs.pos);
        gl.enableVertexAttribArray(this.posLoc)
        gl.vertexAttribPointer( this.posLoc, COORDS_PER_VERTEX, gl.FLOAT, 0, 0, 0)

        gl.bindBuffer(gl.ARRAY_BUFFER, bufs.norm);
        gl.enableVertexAttribArray(this.normLoc)
        gl.vertexAttribPointer(this.normLoc, COORDS_PER_VERTEX, gl.FLOAT, 0, 0, 0)

        gl.bindBuffer(gl.ARRAY_BUFFER, bufs.tex);
        gl.enableVertexAttribArray(this.texLoc)
        gl.vertexAttribPointer(this.texLoc, COORDS_PER_VERTEX, gl.FLOAT, 0, 0, 0)


        gl.uniformMatrix4fv(this.pvmLoc, false, World.pvm.pvm)
        gl.uniformMatrix4fv(this.mLoc, false, World.pvm.m)

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.texHandles[this.strToTexHandleI[bmpName]])
        gl.uniform1i(this.samplerLoc, 0)

        gl.uniform3fv(this.lightDirLoc, lightArray)

        gl.drawElements(gl.TRIANGLES, bufs.indArr.length, gl.UNSIGNED_SHORT, 0)


    },


}