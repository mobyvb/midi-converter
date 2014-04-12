var from = process.argv[2] || 'song.json'
  , to = process.argv[3] || 'song.mid'
  , fs = require('fs')
  , midiConverter = require('../lib/midi-converter.js');

var jsonSong = require('./'+from);
var midiSong = midiConverter.jsonToMidi(jsonSong);

fs.writeFileSync(to, midiSong, 'binary');
