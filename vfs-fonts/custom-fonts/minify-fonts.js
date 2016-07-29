var Fontmin = require('fontmin');
var fs = require('fs')

let roboto = new Promise((resolve, reject) => {
  let fontmin = new Fontmin()
  .use(
    Fontmin.glyph({
      text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()_+-=[]{}\\|;:\'",./<>?÷√π',
      hinting: false
    })
  )
  .src('roboto/*.ttf')
  fontmin.run(function (err, files) {
    if (err) {
      throw err;
    }

    let fonts = {}

    for (let font of files) {
      fonts[font.history[0].split('/').pop()] = font._contents.toString('base64')
    }

    resolve(fonts)

  });
})

let fontAwesome = new Promise((resolve, reject) => {
  let fontmin = new Fontmin()
  .use(
    Fontmin.glyph({
      text: '\u{F00C}\u{F00D}',
      hinting: false
    })
  )
  .src('FontAwesome.ttf')
  fontmin.run(function (err, files) {
    if (err) {
      throw err;
    }

    let fonts = {}

    for (let font of files) {
      fonts[font.history[0].split('/').pop()] = font._contents.toString('base64')
    }

    resolve(fonts)

  });
});

Promise.all([roboto, fontAwesome])
  .then((fonts) => {
    fs.writeFileSync('fonts.json', JSON.stringify(fonts.reduce((carry, curr) => (Object.assign(carry, curr), carry), {})));
  })
