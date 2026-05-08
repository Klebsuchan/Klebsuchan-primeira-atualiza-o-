const { Vibrant } = require('node-vibrant/node');

Vibrant.from('public/regenerated_image_1777470915146.png').getPalette()
  .then((palette) => {
    console.log('Vibrant:', palette.Vibrant ? palette.Vibrant.hex : null);
    console.log('DarkVibrant:', palette.DarkVibrant ? palette.DarkVibrant.hex : null);
    console.log('LightVibrant:', palette.LightVibrant ? palette.LightVibrant.hex : null);
    console.log('Muted:', palette.Muted ? palette.Muted.hex : null);
    console.log('DarkMuted:', palette.DarkMuted ? palette.DarkMuted.hex : null);
    console.log('LightMuted:', palette.LightMuted ? palette.LightMuted.hex : null);
  })
  .catch(err => console.error(err));
