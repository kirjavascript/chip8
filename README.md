# chip8 golf

[CHIP-8](https://en.wikipedia.org/wiki/CHIP-8) emulator implementation in the fewest bytes possible

status: pre golfing

## control

the CHIP-8 has a weird 16 key input that is mapped to the keys 1234QWERASDFZXCV here

## roms

to save space, ROMs are specified by passing a base64'd copy of the ROM in the URL querystring. you can use [node romToUrl.js romname.ch8](romToURL.js) to generate these

below are a few examples;

[tetris](http://chip8.kirjava.xyz/?orQj5iK2cAHQETAlEgZx/9ARYBrQEWAlMQASDsRwRHASHMMDYB5hAyJc9RXQFD8BEjzQFHH/0BQjQBIc56EicuihIoTpoSKW4p4SUGYA9hX2BzYAEjzQFHEBEiqixPQeZgBDAWYEQwJmCEMDZgz2HgDu0BRw/yM0PwEA7tAUcAEjNADu0BRwASM0PwEA7tAUcP8jNADu0BRzAUMEYwAiXCM0PwEA7tAUc/9D/2MDIlwjNADugABnBWgGaQRhH2UQYgcA7kDgAABAwEAAAOBAAEBgQABAQGAAIOAAAMBAQAAA4IAAQEDAAADgIABgQEAAgOAAAEDAgADAYAAAQMCAAMBgAACAwEAAAGDAAIDAQAAAYMAAwMAAAMDAAADAwAAAwMAAAEBAQEAA8AAAQEBAQADwAADQFGY1dv82ABM4AO6itIwQPB58ATwefAE8HnwBI15LCiNykcAA7nEBE1BgG2sA0BE/AHsB0BFwATAlE2IA7mAb0BFwATAlE3SOEI3gfv9gG2sA0OE/ABOQ0OETlNDRewFwATAlE4ZLABOmff9+/z0BE4IjwD8BI8B6ASPAgKBtB4DSQAR1/kUCZQQA7qcA8lWoBPoz8mXwKW0ybgDd5X0F8Snd5X0F8ind5acA8mWitADuagBgGQDuNyM=)
