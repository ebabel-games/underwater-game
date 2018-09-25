# Browser support
Based on how [popular browsers](https://caniuse.com/#search=webgl) are in the Netherlands, I would like to support these desktop browsers:

- Chrome 67+
- Firefox 61+
- Safari 11.1+

## Why are some popular browsers and platforms not supported?
- Chrome 69 for Android
- Safari and Chrome for iOS 11.2+
- IE11
- Edge

Despite their impressive popularity, small and large touch devices (smartphones and tablets) are not supported by this game at this time, because the navigation relies on a keyboard and combining keys to move around the world. Moreover, on a smartphone, the virtual keyboard takes too much screen space to keep the game playable.

IE11 is still popular at this time, although much less so than touch device browsers, but it has [serious incompatibilities](https://github.com/mrdoob/three.js/issues/3600) with the main webGL library used by this game, THREE.JS

Edge should work but it still doesn't support all features of WebGL. The jury is out on this one, if Edge works for this game then I will add it to supported browsers.

## Contact
If you can think of a way to tackle these issues and increase the range of browsers and platforms this game supports, I would [love to hear](hello@ebabel.eu) from you :)

Don't hesitate to fork this repository and implement any improvements you would like to see in this game. [Contributions](CONTRIBUTING.md) are most welcome!
