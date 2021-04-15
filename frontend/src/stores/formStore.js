import { action, makeObservable, observable } from "mobx";

export class FormStore {
  artist = null;
  song = null;
  bass = false;
  piano = false;
  level = null;
  link = null;
  picurl = null;
  videourl = null;

  constructor() {
    makeObservable(this, {
      artist: observable,
      setArtist: action,
      song: observable,
      setSong: action,
      bass: observable,
      setBass: action,
      piano: observable,
      setPiano: action,
      level: observable,
      setLevel: action,
      link: observable,
      setLink: action,
      picurl: observable,
      setPicurl: action,
      videourl: observable,
      setVideourl: action,
    });
  }

  setArtist = (artist) => {
    this.artist = artist;
  };
  setSong = (song) => {
    this.song = song;
  };
  setBass = (bass) => {
    this.bass = bass;
  };
  setPiano = (piano) => {
    this.piano = piano;
  };
  setLevel = (level) => {
    this.level = level;
  };
  setLink = (link) => {
    this.link = link;
  };

  setPicurl = (picurl) => {
    this.picurl = picurl;
  };

  setVideourl = (videourl) => {
    this.videourl = videourl;
  };
}

export const formStore = new FormStore();
