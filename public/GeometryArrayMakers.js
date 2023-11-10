
function objProperToPosNormIndTex(fileStr) {
    while (fileStr.indexOf("\n\n") != -1) { fileStr = fileStr.replace("\n\n", "\n") }
    const es = []
    for (el of fileStr.split("\n")) {
        const new_row = []
        for (el2 of el.split(" ")) {
            new_row.push(el2)
        }
        es.push(new_row)
    }
    const posOrig = []
    const texOrig = []
    const normOrig = []
    let triCount = 0
    for (const row of es) {
        if (row.length == 0) continue
        for (let i = 1; i < row.length; i++) {
            if (row[0] == "v") posOrig.push(row[i])
            if (row[0] == "vn") normOrig.push(row[i])
            if (row[0] == "vt" && i < 3) texOrig.push(row[i])
        }
        if (row[0] == "v") posOrig.push(1)
        if (row[0] == "vn") normOrig.push(0)
        if (row[0] == "vt") { for (let j = 0; j < 2; j++) texOrig.push(0) }
        if (row[0] == "f") triCount += row.length - 3
    }
    const pos = []
    const norm = []
    const tex = []
    const inds = []
    for (let i = 0; i < triCount * 12; i++) {
        pos.push(1)
        norm.push(0)
        tex.push(0)
    }
    for (let i = 0; i < triCount * 3; i++) {
        inds.push(0)
    }
    triCount = 0
    for (const row of es) {
        if (row.length == 0) continue
        if (row[0] != "f") continue
        for (let i = 0; i < row.length - 3; i++) {
            for (let tri = 3*triCount; tri < 3*triCount + 3; tri++) {
                inds[tri] = tri
                const objRow = 1 + (tri == 3*triCount ?  0 : i + tri - 3*triCount)
                const origI = row[objRow].split("/")
                for (let j = 0; j < 3; j++) {
                    pos[tri*4+j] = posOrig[(origI[0]-1)*4+j]
                    tex[tri*4+j] = texOrig[(origI[1]-1)*4+j]
                    norm[tri*4+j] = normOrig[(origI[2]-1)*4+j]
                }
            }
            triCount += 1
        }

    }
    return PosNormIndTex(pos, norm, inds, tex)

}

function objToPosNormInd(fileStr) {
    while (fileStr.indexOf("\n\n") != -1) { fileStr = fileStr.replace("\n\n", "\n") }
    const es = []
    for (el of fileStr.split("\n")) {
        const new_row = []
        for (el2 of el.split(" ")) {
            new_row.push(el2)
        }
        es.push(new_row)
    }

    const posMutableList = []
    const normMutableList = []
    const indMutableList = []
    for (const row of es) {
        if (row.length == 0) continue
        for (let i = 0; i < row.length; i++) {
            if (i == 0) continue
            if (row[0] == "v") posMutableList.push(parseFloat(row[i]))
            if (row[0] == "vn") normMutableList.push(parseFloat(row[i]))
            if (row[0] == "f") indMutableList.push(parseInt((row[i] - 1)))
        }
        if (row[0] == "v" && row.length == 4) posMutableList.push(1)
        if (row[0] == "vn" && row.length == 4) normMutableList.push(0)
    }
    return PosNormInd(
        posMutableList,
        normMutableList,
        indMutableList
    )
}

function cartWheel() {
    const pos = []
    const norm = []
    const tex = []
    const ind = []
    const n = 30
    const rSmall = 0.4
    const thickness = 0.2
    for (let i = 0; i < n; i++) {
        const x = Math.cos(2 * Math.PI * i / n)
        const y = Math.sin(2 * Math.PI * i / n)
        pos.push(x, y, thickness, 1)
        pos.push(x*rSmall, y*rSmall, thickness, 1)
        pos.push(x, -y, -thickness, 1)
        pos.push(x*rSmall, -y*rSmall, -thickness, 1)
        pos.push(x, y, thickness, 1)
        pos.push(x, y, -thickness, 1)
        pos.push(x*rSmall, y*rSmall, thickness, 1)
        pos.push(x*rSmall, y*rSmall, -thickness, 1)
        norm.push(0, 0, 0, 0, 0, 0, 0, 0)
        norm.push(0, 0, 0, 0, 0, 0, 0, 0)
        norm.push(0, 0, 0, 0, 0, 0, 0, 0)
        norm.push(0, 0, 0, 0, 0, 0, 0, 0)
        const j = (i + 1) % n
        const m = 8
        ind.push(m*i+1, m*i+0, m*j+0)
        ind.push(m*i+1, m*j+0, m*j+1)
        ind.push(m*i+3, m*i+2, m*j+2)
        ind.push(m*i+3, m*j+2, m*j+3)
        ind.push(m*i+4, m*i+5, m*j+4)
        ind.push(m*j+4, m*i+5, m*j+5)
        ind.push(m*i+7, m*i+6, m*j+6)
        ind.push(m*i+7, m*j+6, m*j+7)
    }

    for (let i = 0; i < ind.length; i+=3) {
        setNaturalNormals(pos, norm, ind, i)
    }
    for (let i = 0; i < pos.length; i += 4) {
        tex.push(0.5 + 0.5 * pos[i])
        tex.push(0.5 - 0.5 * pos[i+1])
        tex.push(0)
        tex.push(0)
        
    }
    return PosNormIndTex(pos, norm, ind, tex)
}

const PosNormIndTexs = {
    square: null,
    cartWheel: cartWheel(),
    setup() {
        this.square = objProperToPosNormIndTex(assets["objs/square.obj"])
    }
}