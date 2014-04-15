var fs = require('fs')
  , midiParser = require('midi-file-parser')
  , path = require('path')
  , Midi = require('jsmidgen')
  , instruments = require('./instruments.json');

module.exports = {
  midiToJson: function(midi) {
    return midiParser(midi);
  },
  jsonToMidi: function(songJson) {
    var file = new Midi.File();

    songJson.tracks.forEach(function(t) {
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
          var ticksPerBeat = songJson.header.ticksPerBeat;
          var bpm = (ticksPerBeat/128)*microsecondsPerMin/microsecondsPerBeat;
          track.setTempo(bpm, note.deltaTime);
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

    return file.toBytes();

    function noteFromMidiPitch(p) {
      var noteDict = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
      var octave = Math.floor((p-12)/12);
      var note = noteDict[p-octave*12-12];
      return note+octave;
    }
  }
};
