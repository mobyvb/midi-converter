var from = process.argv[2] || 'song.mid'
  , to = process.argv[3] || 'song.json'
  , fs = require('fs')
  , midiConverter = require('../lib/midi-converter.js');

var midiSong = fs.readFileSync(from, 'binary');
var jsonSong = midiConverter.midiToJson(midiSong);

fs.writeFileSync(to, JSON.stringify(jsonSong, null, 2));
