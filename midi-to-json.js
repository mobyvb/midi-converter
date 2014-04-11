var from = process.argv[2] || 'song.mid';
var to = process.argv[3] || 'song.json';

var fs = require('fs');
var midiParser = require('midi-file-parser');
var midiFile = fs.readFileSync(from, 'binary');

var json = midiParser(midiFile);

fs.writeFileSync(to, JSON.stringify(json, null, 2));
