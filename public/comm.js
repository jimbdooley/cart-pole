
function get(url, time_limit_ms=5000) {
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          resolve(this.responseText);
        }
      };

    xhttp.open("GET", url);
    xhttp.send(); 
    setTimeout(() => {
      reject(`error GETting "${url}" after ${time_limit_ms} ms`);
    }, time_limit_ms);
  });
}

function post(url, dataStr, time_limit_ms=5000) {
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          resolve(this.responseText);
        }
      };

    xhttp.open("POST", url);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(dataStr); 
    setTimeout(() => {
      reject(`error POSTing "${url}" after ${time_limit_ms} ms`);
    }, time_limit_ms);
  });
}

function check_for_drawables_after_delay(delay=100) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      let allDone = true
      for (key in drawable) {
        allDone &= drawable[key].complete && drawable[key].naturalWidth !== 0
      }
      resolve(allDone)
    }, delay)
  })
}

async function get_all_assets() {
  assets = JSON.parse(await get("get_all_assets"))
  scripts = JSON.parse(await get("get_all_scripts"))
  let drawable_files = JSON.parse(await get("get_drawable_filenames"))
  for (let i = 0; i < drawable_files.length; i++) {
      const im = new Image()
      im.src = `drawable/${drawable_files[i]}`
      drawable[drawable_files[i]] = im
  }
  let drawables_done = false
  do {
    drawables_done = await check_for_drawables_after_delay(40)
  } while (!drawables_done)
}
