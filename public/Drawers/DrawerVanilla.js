
const DrawerVanilla = {
    posLoc: -1,
    normLoc: -1,
    texLoc: -1,
    samplerLoc: -1,
    lightDirLoc: -1,
    dxyzLoc: -1,
    pvmLoc: -1,
    mLoc: -1,
    bmpInPlace: {
        "gearMetal": Bitmap.createBitmap([[255, 100, 100, 112]], 1, 1, Bitmap.Config.ARGB_8888),
        "letter": Bitmap.createBitmap([
            [255, 55, 55, 55],
            [255, 105, 105, 105],
            [255, 105, 105, 105],
            [255, 55, 55, 55],
        ], 2, 2, Bitmap.Config.ARGB_8888),
        "red": Bitmap.createBitmap([[255, 255, 0, 0]], 1, 1, Bitmap.Config.ARGB_8888),
        "green": Bitmap.createBitmap([[255, 0, 255, 0]], 1, 1, Bitmap.Config.ARGB_8888),
        "blue": Bitmap.createBitmap([[255, 0, 0, 255]], 1, 1, Bitmap.Config.ARGB_8888),
        "yellow": Bitmap.createBitmap([[255, 255, 255, 0]], 1, 1, Bitmap.Config.ARGB_8888),
        "shade": Bitmap.createBitmap([[220, 0, 0, 0]], 1, 1, Bitmap.Config.ARGB_8888),
    },
    bmpDrawables: {
        "crate_hand": "crate_hand.png",
        "tmap": "tmap.png",
        "hand_bgr": "hand_bgr.jpg",
        "intro_3": "intro_3.png",
    },
    strToTexHandleI: {},
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

    setup: function() {
        for (key in this.bmpDrawables) {
            this.strToTexHandleI[key] = this.texHandles.length
            this.texHandles.push(gl.createTexture())
        }
        for (key in this.bmpInPlace) {
            this.strToTexHandleI[key] = this.texHandles.length
            this.texHandles.push(gl.createTexture())
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
        this.dxyzLoc = gl.getUniformLocation(this.shader.full, "u_dxyz")
        console.log("vanilla frag", this.shader.fragCompileLog)
        console.log("vanilla vert", this.shader.vertCompileLog)
        console.log("Drawer Created", "Vanilla Drawer")
    },

    DIRECT_LIGHT: [0, 0.9, -Math.sqrt(1-0.9*0.9)],
    DEFAULT_DXYZ: [0, 0, 0, 0],
    _draw: function(bmpName, bufs, _dxyz) {
        const dxyz = _dxyz == null ? this.DEFAULT_DXYZ : _dxyz

        if (bmpName in this.bmpDrawables) {
            if (!(bmpName in this.drawableStrToLoaded) || !this.drawableStrToLoaded[bmpName]) {
                const bmp = drawable[this.bmpDrawables[bmpName]]
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
        
        gl.uniform4fv(this.dxyzLoc, dxyz)
        gl.uniform3fv(this.lightDirLoc, this.DIRECT_LIGHT)

        gl.drawElements(gl.TRIANGLES, bufs.indArr.length, gl.UNSIGNED_SHORT, 0)


    },
    draw: function(o, bmpName, bufs, dxyz) {
        World.pvm.updateWithDisplayObject(o)
        this._draw(bmpName, bufs, dxyz)
    },
    drawQ: function(o, e0, e1, e2, e3, bmpName, bufs, dxyz) {
        World.pvm.updateWithQuaternions(o, e0, -e1, -e2, -e3)
        this._draw(bmpName, bufs, dxyz)
    }

}