

const Animations = {
    arr: [],
    update(anim) {
        const frame = anim.frz > -1 ? anim.frames[anim.frz] : anim.frames[anim.iter]
        anim.obj.x = frame[0]
        anim.obj.y = frame[1]
        anim.obj.z = frame[2] + anim.dz
        DrawerVanilla.drawQ(anim.obj, frame[3], frame[4], frame[5], frame[6], anim.texture, anim.bufs)
        if (anim.logThZ) {
            console.log(getZRotationFromQuaternion(frame[3], frame[4], frame[5], frame[6]))
        }
        if (frame.length > 7) console.log(frame[7])
        for (const follower of anim.followers) {
            follower.dob.x = anim.obj.x
            follower.dob.y = anim.obj.y
            follower.dob.z = anim.obj.z
            DrawerVanilla.drawQ(follower.dob, frame[3], frame[4], frame[5], frame[6], follower.texture, follower.bufs, follower.dXYZ)
        }
        anim.iter += 1;
        return anim.iter >= anim.frames.length
    },
    toDelete: [],
    updateAll() {
        while (this.toDelete.length > 0) this.toDelete.pop()
        for (let i = 0; i < this.arr.length; i++) {
            const done = this.update(this.arr[i])
            if (done) this.toDelete.push(i)
        }
        for (let i = this.toDelete.length - 1; i >= 0; i--) {
            const toDeleteI = this.toDelete[i]
            for (let j = toDeleteI; j < this.arr.length - 1; j++) {
                this.arr[j] = this.arr[j+1]
            }
            this.arr.pop()
        }
    }
}

const animate = (() => {
    return function(dz, frz, obj, texture, bufs, animStr, followers) {
        const anim = {
            dz: dz,
            frz: frz,
            obj: obj,
            bufs: bufs,
            texture: texture,
            frames: [],
            iter: 0,
            followers: [],
        }
        if (followers != null) {
            for (let i = 0; i < followers.length; i++) {
                followers[i].dXYZ[0] /= followers[i].dob.sx
                followers[i].dXYZ[1] /= followers[i].dob.sy
                followers[i].dXYZ[2] /= followers[i].dob.sz
                anim.followers.push(followers[i])
            }
        }
        while (animStr.indexOf("\r") != -1) animStr = animStr.replace("\r", "\n")
        while (animStr.indexOf("\n\n") != -1) animStr = animStr.replace("\n\n", "\n")
        const lines = animStr.split("\n")
        for (const line of lines) {
            const els = line.split(",")
            if (els.length == 0) continue
            const nextFrame = []
            for (const el of els) {
                nextFrame.push(parseFloat(el))
            }
            anim.frames.push(nextFrame)
        }
        Animations.arr.push(anim)
    }
})();
