function PVM(_width, _height, fov, loc, target) {
    rtn = {}
    rtn.p = perspective(null, _width / _height, fov)
    rtn.v = invert4By4(lookAt(loc, target)), null
    rtn.m = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    rtn.pv = mul4By4(rtn.p, rtn.v, null)
    rtn.pvm = new Float32Array(16)
    rtn.updateCamera = function (pos) {
        invert4By4(lookAt(pos.loc, pos.target), rtn.v)
        mul4By4(rtn.p, rtn.v, rtn.pv)
        
    },
    rtn.updateWithDisplayObject = function(o) {
        skewRotRodTrans(this.m, o)
        mul3x3sOf4x4s(o.postRotMat, this.m, this.m)
        mul4By4(this.pv, this.m, this.pvm)

    }
    rtn.updateWithRotMat = function(rot) {
        for (let i = 0; i < 16; i++) this.m[i] = rot[i]
        mul4By4(this.pv, this.m, this.pvm)
    }
    return rtn

}

function Shader(vertCode, fragCode, name=null){
    const rtn = {
        vert : gl.createShader(gl.VERTEX_SHADER),
        frag : gl.createShader(gl.FRAGMENT_SHADER),
        full : gl.createProgram(),
        vertCompileLog : "",
        fragCompileLog : "",
    }
    gl.shaderSource(rtn.vert, vertCode)
    gl.compileShader(rtn.vert)
    rtn.vertCompileLog = gl.getShaderInfoLog(rtn.vert)
    gl.shaderSource(rtn.frag, fragCode)
    gl.compileShader(rtn.frag)
    rtn.fragCompileLog = gl.getShaderInfoLog(rtn.frag)
    if (name != null) {
        console.log(`${name} vertlog`, rtn.vertCompileLog)
        console.log(`${name} fraglog`, rtn.fragCompileLog)
    }
    gl.attachShader(rtn.full, rtn.vert)
    gl.attachShader(rtn.full, rtn.frag)
    gl.linkProgram(rtn.full)
    return rtn
}

function PosNormInd(_pos, _norm, _ind) {
    const rtn = {}
    rtn.posArr = _pos
    rtn.normArr = _norm
    rtn.indArr = _ind
    rtn.pos =  gl.createBuffer()
    rtn.norm = gl.createBuffer()
    rtn.ind = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, rtn.pos)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rtn.posArr), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, rtn.norm)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rtn.normArr), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rtn.ind)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(rtn.indArr), gl.STATIC_DRAW)
    return rtn
}

function PosNormIndTex(_pos, _norm, _ind, _tex) {
    const rtn = {}
    rtn.posArr = _pos
    rtn.normArr = _norm
    rtn.indArr = _ind
    rtn.texArr = _tex
    rtn.pos =  gl.createBuffer()
    rtn.norm = gl.createBuffer()
    rtn.ind = gl.createBuffer()
    rtn.tex = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, rtn.pos)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rtn.posArr), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, rtn.norm)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rtn.normArr), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rtn.ind)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(rtn.indArr), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, rtn.tex)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rtn.texArr), gl.STATIC_DRAW)
    return rtn
}

function initCubeTexture(loc, bmp){
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, loc)
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp)
    //gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
}