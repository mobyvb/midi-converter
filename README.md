# MIDI Converter
### Installing:
`npm install midi-converter`

### Converting from MIDI to JSON:
    var fs = require('fs');
    var midiConverter = require('midi-converter');
    var midiSong = fs.readFileSync('example.mid', 'binary');
    var jsonSong = midiConverter.midiToJson(midiSong);
    fs.writeFileSync('example.json', JSON.stringify(jsonSong));

### Converting from JSON to MIDI:
    var fs = require('fs');
    var midiConverter = require('midi-converter');
    var jsonSong = require('./example.json');
    var midiSong = midiConverter.jsonToMidi(jsonSong);
    fs.writeFileSync('example.mid', midiSong, 'binary');
