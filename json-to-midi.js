var from = process.argv[2] || 'song.json';
var to = process.argv[3] || 'song.mid';

var fs = require('fs');
var path = require('path');
var Midi = require('jsmidgen');
var instruments = require(path.join(__dirname, 'instruments.json'));
var song = require(path.join(__dirname, from));

var file = new Midi.File();

song.tracks.forEach(function(t) {
  var track = new Midi.Track();
  file.addTrack(track);
  
  t.forEach(function(note) {
    if(note.subtype === 'programChange') {
      var instrument = instruments[note.programNumber].hexcode;
      track.setInstrument(note.channel, instrument);
    }
    else if(note.subtype === 'setTempo') {
      var microsecondsPerBeat = note.microsecondsPerBeat;
      var microsecondsPerMin = 60000000;
      var ticksPerBeat = song.header.ticksPerBeat;
      var bpm = (ticksPerBeat/128)*microsecondsPerMin/microsecondsPerBeat;
      track.setTempo(bpm);
    }
    else if(note.subtype === 'noteOn') {
      var noteStr = noteFromMidiPitch(note.noteNumber);
      track.addNoteOn(note.channel, noteStr, note.deltaTime, note.velocity);
    }
    else if(note.subtype === 'noteOff') {
      var noteStr = noteFromMidiPitch(note.noteNumber);
      track.addNoteOff(note.channel, noteStr, note.deltaTime);
    }
  });
});

fs.writeFileSync(to, file.toBytes(), 'binary');

function noteFromMidiPitch(p) {
  var noteDict = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
  var octave = Math.floor((p-12)/12);
  var note = noteDict[p-octave*12-12];
  return note+octave;
}
