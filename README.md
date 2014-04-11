# MIDI Converter
### Installing dependencies:
`npm install`

The library [midi-file-parser](https://github.com/NHQ/midi-file-parser) is used for getting JSON from MIDI files.

The library [jsmidgen](https://github.com/dingram/jsmidgen) is used to generate MIDI files.

### Converting from MIDI to JSON:
`node midi-to-json.js [from] [to]`

Where `[from]` is the path to a MIDI file and `[to]` is the path to a JSON file. If omitted, they default to `song.mid` and `song.json`, respectively.

### Converting from JSON to MIDI:
`node json-to-midi.js [from] [to]`

Where `[from]` is the path to a JSON file and `[to]` is the path to a MIDI file. If omitted, they default to `song.json` and `song.midi`, respectively.
