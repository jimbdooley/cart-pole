
function DisplayObject(
        _xyz=[0, 0, 0], 
        _xyzScale=[1, 1, 1], 
        _thTilt=0, 
        _thK=0, 
        _thY=0
) {
    const rtn = {
        _scale: 1,
        get scale() { return this._scale },
        set scale(val) {
            this.sx = val
            this.sy = val
            this.sz = val
            this._scale = val
        },
        _thK,
        get thK() { return this._thK },
        set thK(val) {
            this.k0 = Math.cos(val)
            this.k1 = Math.sin(val)
            this._thK = val
        },
    }
    rtn.copyVals = function(o2) {
        this.x = o2.x
        this.y = o2.y
        this.z = o2.z
        this.scale = o2.scale
        this.thTilt = o2.thTilt
        this.thK = o2.thK
        this.thY = o2.thY
    }
    rtn.x = _xyz[0]
    rtn.y = _xyz[1]
    rtn.z = _xyz[2]
    rtn.thTilt = _thTilt
    rtn.thY = _thY
    rtn.k0 = Math.cos(_thK)
    rtn.k1 = Math.sin(_thK)
    rtn.thK = _thK
    rtn.scale = _xyzScale[0]
    rtn.sx = _xyzScale[0]
    rtn.sy = _xyzScale[1]
    rtn.sz = _xyzScale[2]
    return rtn
}
