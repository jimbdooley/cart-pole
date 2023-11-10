

arr = []
for (let i = 0; i < 60; i++) arr.push(99999)

let fpsCtr = 0
let prevT = 0
function dofps() {
    const currT = Date.now()
    arr[fpsCtr++] = currT - prevT

    if (fpsCtr == 60) {
        fpsCtr = 0
        let sm = 0
        for (let i = 0; i < arr.length; i++) {
            sm += arr[i]
        }
        sm /= arr.length
        document.getElementById("fps").innerHTML = `${sm}`
    }
    prevT = currT
}
