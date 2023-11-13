
const DrawerFloor = {
    posLoc: -1,
    normLoc: -1,
    texLoc: -1,
    dataLoc: -1,
    lightDirLoc: -1,
    pvmLoc: -1,
    mLoc: -1,
    shader: null,
    data: [0, 0, 0, 0, 0, 0, 0, 0],

    setup: function() {
        this.data[0] = assets.params.loc_scores[0][0]
        this.data[1] = assets.params.loc_scores[1][0]
        this.data[2] = assets.params.loc_scores[2][0]
        this.data[3] = assets.params.loc_scores[3][0]
        this.shader = Shader(assets["shaders/floor.vert"], assets["shaders/floor.frag"])
        this.pvmLoc = gl.getUniformLocation(this.shader.full, "u_pvmMat")
        this.mLoc = gl.getUniformLocation(this.shader.full, "u_mMat")
        this.posLoc = gl.getAttribLocation(this.shader.full, "a_pos")
        this.normLoc = gl.getAttribLocation(this.shader.full, "a_norm")
        this.texLoc = gl.getAttribLocation(this.shader.full, "a_tex")
        this.dataLoc = gl.getUniformLocation(this.shader.full, "u_data")
        this.lightDirLoc = gl.getUniformLocation(this.shader.full, "u_light_dir")
        console.log("vanilla frag", this.shader.fragCompileLog)
        console.log("vanilla vert", this.shader.vertCompileLog)
        console.log("Drawer Created", "Vanilla Drawer")
    },

    DIRECT_LIGHT: [0, 0.9, -Math.sqrt(1-0.9*0.9)],
    draw: function(o, bufs, drawCenter){
        World.pvm.updateWithDisplayObject(o)
        this.data[4] = o.sx
        this.data[5] = drawCenter
        
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

        gl.uniform4fv(this.dataLoc, this.data)
        gl.uniform3fv(this.lightDirLoc, this.DIRECT_LIGHT)

        gl.drawElements(gl.TRIANGLES, bufs.indArr.length, gl.UNSIGNED_SHORT, 0)


    },


}