var Fontmin = require('fontmin');
var fs = require('fs')

var fontmin = new Fontmin()
  .use(
    Fontmin.glyph({
      text: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()_+-=[]{}\\|;:\'",./<>?÷√π',
      hinting: false
    })
  )
  .src('cambria.ttf')

fontmin.run(function (err, files) {
  if (err) {
    throw err;
  }

  fs.writeFileSync('fonts.js', JSON.stringify({
    'Cambria.ttf': files[0]._contents.toString('base64'),
    'TickCross.tff': fs.readFileSync('tick-cross.ttf').toString('base64')
  }));

});
