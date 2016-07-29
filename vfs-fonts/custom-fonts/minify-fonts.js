var Fontmin = require('fontmin');
var fs = require('fs')

var fontmin = new Fontmin()
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

  let fonts = {
    'TickCross.tff': fs.readFileSync('tick-cross.ttf').toString('base64')
  }

  for (let font of files) {
    fonts[font.history[0].split('/').pop()] = font._contents.toString('base64')
  }

  fs.writeFileSync('fonts.js', JSON.stringify(fonts));

});
