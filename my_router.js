var express = require('express');
var fs = require("fs")
var router = express.Router();

router.get('/get_drawable_filenames', async function(req, res) {
  const rtn = []
  const dir = await fs.promises.opendir("public/drawable")
  for await (const dirent of dir) {
    let isImage = false
    if (dirent.name.length >= 5) {
      const last4 = dirent.name.substring(dirent.name.length - 4, dirent.name.length).toLowerCase()
      const last5 = dirent.name.substring(dirent.name.length - 5, dirent.name.length).toLowerCase()
      isImage |= [".png", ".jpg", ".bmp"].indexOf(last4) != -1
      isImage |= [".jpeg", ".webp"].indexOf(last5) != -1
    }
    if (isImage) rtn.push(dirent.name)
  }
  res.send(JSON.stringify(rtn))
})

router.get('/get_all_assets', async function(req, res) {
  const rtn = {}
  const dir = await fs.promises.opendir("public/assets")
  for await (const dirent of dir) {
    const dir2 = await fs.promises.opendir(`public/assets/${dirent.name}`)
    for await (const dirent2 of dir2) {
      const filedir = `public/assets/${dirent.name}/${dirent2.name}`
      rtn[`${dirent.name}/${dirent2.name}`] = fs.readFileSync(filedir, 'utf8')
    }
  }
  rtn.params = JSON.parse(fs.readFileSync(__dirname + "/params.json", "utf8"))
  res.send(JSON.stringify(rtn))
});

router.get('/drawable/:filename', function(req, res) {
  res.sendFile(`${__dirname}/public/drawable/${req.params.filename}`)
})

router.get('/:filename', function(req, res) {
  res.sendFile(__dirname + "/public/" + req.params.filename)
})

router.get('/Drawers/:filename', function(req, res) {
  res.sendFile(__dirname + "/public/Drawers/" + req.params.filename)
})

router.get('/', function(req, res){
   res.sendFile(__dirname + '/public/main.html');
});

module.exports = router;
